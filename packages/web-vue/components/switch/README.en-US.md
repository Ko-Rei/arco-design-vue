```yaml
meta:
  type: Component
  category: Data Entry
title: Switch
description: Mutually exclusive operation controls, users can turn on or turn off a certain function.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/size.md

@import ./__demo__/disabled.md

@import ./__demo__/loading.md

@import ./__demo__/text.md

@import ./__demo__/icon.md


### `<switch>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`boolean`|`-`|
|default-checked|Default selected state (uncontrolled state)|`boolean`|`false`|
|disabled|Whether to disable|`boolean`|`false`|
|loading|Whether it is loading state|`boolean`|`false`|
|type|Type of switch|`'circle' \| 'round' \| 'line'`|`'circle'`|
|size|Size of switch|`'small' \| 'medium'`|`'medium'`|
### `<switch>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|checked: `boolean`|
### `<switch>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|checked-icon|The icon on the button when opened|-|
|unchecked-icon|The icon on the button when closed|-|
|checked|Copywriting when opened (not effective when `type='line'` and `size='small'`)|-|
|unchecked|Copywriting when closed (not effective when `type='line'` and `size='small'`)|-|

