```yaml
meta:
  type: 组件
  category: 数据输入
title: 标签输入框 InputTag
description: 用来输入标签。
```

@import ./__demo__/basic.md

@import ./__demo__/status.md

@import ./__demo__/max.md

@import ./__demo__/size.md


### `<input-tag>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`Array<string \| number \| TagData>`|`-`|
|default-value|默认值（非受控状态）|`Array<string \| number \| TagData>`|`[]`|
|input-value **(v-model)**|输入框的值|`string`|`-`|
|default-input-value|输入框的默认值（非受控状态）|`string`|`''`|
|placeholder|占位符|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|error|是否为错误状态|`boolean`|`false`|
|readonly|是否为只读模式|`boolean`|`false`|
|allow-clear|是否允许清空|`boolean`|`false`|
|size|输入框的大小|`Size`|`'medium'`|
|max-tag-count|最多展示的标签个数，`0` 表示不限制|`number`|`0`|
|retain-input-value|创建标签后是否保留输入框的内容|`boolean`|`false`|
|format-tag|格式化标签内容|`(data: TagData) => string`|`-`|
### `<input-tag>` Events

|事件名|描述|参数|
|---|---|---|
|change|值发生改变时触发|value: `Array<string \| number \| TagData>`|
|input-value-change|输入值发生改变时触发|value: `string`|
|press-enter|按下回车键时触发|inputValue: `string`|
|remove|点击标签的删除按钮时触发|value: `string \| number`|
|clear|点击清除按钮时触发|-|
|focus|输入框获取焦点时触发|-|
|blur|输入框失去焦点时触发|-|
### `<input-tag>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|focus|使输入框获取焦点|-|-|
|blur|使输入框失去焦点|-|-|

