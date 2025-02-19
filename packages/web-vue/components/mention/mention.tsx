import {
  computed,
  defineComponent,
  PropType,
  ref,
  toRefs,
  ComponentPublicInstance,
  onMounted,
  watch,
  nextTick,
} from 'vue';
import ArcoTextarea from '../textarea';
import ArcoInput from '../input';
import Trigger from '../trigger';
import { DropdownPanel, DropDownOption } from '../_components/dropdown';
import { useOptions } from '../_hooks/use-options';
import { MeasureInfo } from './interface';
import {
  getLastMeasureIndex,
  getTextBeforeSelection,
  isValidSearch,
} from './utils';
import { Option, OptionNode } from '../select/interface';
import { CODE, getKeyDownHandler } from '../_utils/keyboard';
import { EmitType } from '../_utils/types';
import { getPrefixCls } from '../_utils/global-config';
import { getSizeStyles } from '../textarea/utils';
import ResizeObserver from '../_components/resize-observer';
import { isFunction } from '../_utils/is';

export default defineComponent({
  name: 'Mention',
  inheritAttrs: false,
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: String,
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: String,
      default: '',
    },
    /**
     * @zh 用于自动补全的数据
     * @en Data for automatic completion
     */
    data: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
    /**
     * @zh 触发自动补全的关键字
     * @en Keywords that trigger auto-completion
     */
    prefix: {
      type: [String, Array] as PropType<string | string[]>,
      default: '@',
    },
    /**
     * @zh 选中项的前后分隔符
     * @en Before and after the selected item separator
     */
    split: {
      type: String,
      default: ' ',
    },
    /**
     * @zh 输入框或文本域
     * @en default input or textarea
     */
    type: {
      type: String as PropType<'input' | 'textarea'>,
      default: 'input',
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<EmitType<(value: string) => void>>,
    },
    onSelect: {
      type: [Function, Array] as PropType<EmitType<(value: string) => void>>,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @property {string} value
     */
    'change',
    /**
     * @zh 动态搜索时触发
     * @en Trigger on dynamic search prefix
     * @property {string} value
     */
    'search',
    /**
     * @zh 选择下拉选项时触发
     * @en Triggered when the drop-down option is selected
     * @property {string} value
     */
    'select',
  ],
  /**
   * @zh 选项内容
   * @en Display content of options
   * @slot option
   * @binding {OptionInfo} data
   * @version 2.13.0
   */
  setup(props, { emit, attrs, slots }) {
    const prefixCls = getPrefixCls('mention');

    let styleDeclaration: CSSStyleDeclaration;

    const { data } = toRefs(props);
    const dropdownRef = ref();
    const optionRefs = ref<Record<string, HTMLElement>>({});
    const _value = ref(props.defaultValue);
    const computeValue = computed(() => props.modelValue ?? _value.value);
    const measureInfo = ref<MeasureInfo>({
      measuring: false,
      location: -1,
      prefix: '',
      text: '',
    });

    const resetMeasureInfo = () => {
      measureInfo.value = {
        measuring: false,
        location: -1,
        prefix: '',
        text: '',
      };
    };

    const inputRef = ref<HTMLElement>();

    const measureText = computed(() => measureInfo.value.text);
    const filterOption = ref(true);

    const handleInput = (value: string, e: Event) => {
      const text = getTextBeforeSelection(e.target as HTMLInputElement);
      const lastMeasure = getLastMeasureIndex(text, props.prefix);
      if (lastMeasure.location > -1) {
        const measureText = text.slice(
          lastMeasure.location + lastMeasure.prefix.length
        );
        if (isValidSearch(measureText, props.split)) {
          _popupVisible.value = true;
          measureInfo.value = {
            measuring: true,
            text: measureText,
            ...lastMeasure,
          };
          emit('search', measureText);
        } else if (measureInfo.value.location > -1) {
          resetMeasureInfo();
        }
      } else if (measureInfo.value.location > -1) {
        resetMeasureInfo();
      }
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value);
    };

    const _popupVisible = ref(false);
    const computedPopupVisible = computed(
      () =>
        _popupVisible.value &&
        measureInfo.value.measuring &&
        nodes.value.length > 0
    );

    const handleResize = () => {
      mirrorStyle.value = getSizeStyles(styleDeclaration);
    };

    const handlePopupVisibleChange = (popupVisible: boolean) => {
      _popupVisible.value = popupVisible;
    };
    const extraOptions = ref([]);

    const {
      nodes,
      activeOption,
      getNextActiveOption,
      scrollIntoView,
      enabledOptionSet,
      optionInfoMap,
    } = useOptions({
      options: data,
      extraOptions,
      inputValue: measureText,
      filterOption,
      dropdownRef,
      optionRefs,
    });

    const handleSelect = (value: string, e: Event) => {
      const measureStart = measureInfo.value.location;
      const measureEnd =
        measureInfo.value.location + measureInfo.value.text.length;
      let head = _value.value.slice(0, measureStart);
      let tail = _value.value.slice(measureEnd + 1);
      // 如过匹配内容之前或者之后已经存在内容，需要添加分割字符
      head +=
        !head || head.endsWith(props.split) || head.endsWith('\n')
          ? ''
          : props.split;
      tail =
        (!tail || tail.startsWith(props.split) || tail.startsWith('\n')
          ? ''
          : props.split) + tail;

      const match = `${measureInfo.value.prefix}${value}`;
      const nextValue = `${head}${match}${tail}`;

      _value.value = nextValue;
      emit('select', value);
      emit('update:modelValue', value);
      emit('change', nextValue);
      resetMeasureInfo();
    };

    const handleMouseEnter = (value: string | number, e: Event) => {
      const optionInfo = optionInfoMap.get(value);
      if (optionInfo) {
        activeOption.value = optionInfo;
      }
    };

    const handleMouseLeave = (e: Event) => {
      activeOption.value = undefined;
    };

    const mirrorStyle = ref();

    onMounted(() => {
      // @ts-ignore
      if (props.type === 'textarea' && inputRef.value?.textareaRef) {
        // @ts-ignore
        styleDeclaration = window.getComputedStyle(inputRef.value.textareaRef);
        mirrorStyle.value = getSizeStyles(styleDeclaration);
      }
    });

    const handleKeyDown = getKeyDownHandler(
      new Map([
        [
          CODE.ENTER,
          (e: Event) => {
            if (computedPopupVisible.value) {
              if (activeOption.value) {
                handleSelect(activeOption.value.value as string, e);
              }
              e.preventDefault();
            }
          },
        ],
        [
          CODE.ESC,
          (e: Event) => {
            handlePopupVisibleChange(false);
            e.preventDefault();
          },
        ],
        [
          CODE.ARROW_DOWN,
          (e: Event) => {
            if (computedPopupVisible.value) {
              const next = getNextActiveOption('down');
              if (next) {
                activeOption.value = next;
                scrollIntoView(next.value);
              }
              e.preventDefault();
            }
          },
        ],
        [
          CODE.ARROW_UP,
          (e: Event) => {
            if (computedPopupVisible.value) {
              const next = getNextActiveOption('up');
              if (next) {
                activeOption.value = next;
                scrollIntoView(next.value);
              }
              e.preventDefault();
            }
          },
        ],
      ])
    );

    const getOptionContentFunc = (item: OptionNode) => {
      if (isFunction(slots.option) && item.value) {
        const optionInfo = optionInfoMap.get(item.value);
        const optionSlot = slots.option;
        return () => optionSlot({ data: optionInfo });
      }
      return () => item.label;
    };

    const renderOption = (item: OptionNode) => {
      const { value = '' } = item;
      return (
        <DropDownOption
          ref={(ref: ComponentPublicInstance) => {
            if (ref?.$el) {
              optionRefs.value[value] = ref.$el;
            }
          }}
          v-slots={{ default: getOptionContentFunc(item) }}
          key={item.key}
          value={value}
          disabled={item.disabled}
          isActive={activeOption.value && value === activeOption.value.value}
          onClick={handleSelect}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        />
      );
    };

    const renderDropdown = () => {
      if (!measureInfo.value.measuring || nodes.value.length === 0) {
        return null;
      }

      const _children = nodes.value.map((node) => renderOption(node));

      return <DropdownPanel ref={dropdownRef}>{_children}</DropdownPanel>;
    };

    const mirrorRef = ref<HTMLElement>();

    watch(computedPopupVisible, (visible) => {
      if (props.type === 'textarea' && visible) {
        nextTick(() => {
          if (
            // @ts-ignore
            inputRef.value?.textareaRef &&
            // @ts-ignore
            inputRef.value.textareaRef.scrollTop > 0
          ) {
            // @ts-ignore
            mirrorRef.value?.scrollTo(0, inputRef.value.textareaRef.scrollTop);
          }
        });
      }
    });

    const render = () => {
      if (props.type === 'textarea') {
        return (
          <div class={prefixCls}>
            <ResizeObserver onResize={handleResize}>
              <ArcoTextarea
                {...attrs}
                ref={inputRef}
                modelValue={computeValue.value}
                onInput={handleInput}
                onKeydown={handleKeyDown}
              />
            </ResizeObserver>
            {measureInfo.value.measuring && nodes.value.length > 0 && (
              <div
                ref={mirrorRef}
                style={mirrorStyle.value}
                class={`${prefixCls}-measure`}
              >
                {computeValue.value?.slice(0, measureInfo.value.location)}
                <Trigger
                  v-slots={{ content: renderDropdown }}
                  trigger="focus"
                  position="bl"
                  popupOffset={4}
                  preventFocus={true}
                  popupVisible={computedPopupVisible.value}
                  clickToClose={false}
                  onPopupVisibleChange={handlePopupVisibleChange}
                >
                  <span>@</span>
                </Trigger>
              </div>
            )}
          </div>
        );
      }

      return (
        <Trigger
          v-slots={{ content: renderDropdown }}
          trigger="focus"
          position="bl"
          popupOffset={4}
          preventFocus={true}
          popupVisible={computedPopupVisible.value}
          clickToClose={false}
          autoFitPopupWidth
          onPopupVisibleChange={handlePopupVisibleChange}
        >
          <ArcoInput
            v-slots={slots}
            {...attrs}
            ref={inputRef}
            modelValue={computeValue.value}
            onInput={handleInput}
            onKeydown={handleKeyDown}
          />
        </Trigger>
      );
    };

    return render;
  },
});
