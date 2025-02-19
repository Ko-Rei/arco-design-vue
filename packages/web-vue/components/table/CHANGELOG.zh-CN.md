```yaml
changelog: true
```

## 2.14.2

`2022-01-10`

### 🐛 问题修复

- 修复 table 内容超出容器，导致某些情况下边框不显示的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.14.0

`2022-01-07`

### 🆕 新增功能

- 增加 hideExpandButtonOnEmpty 属性 ([#520](https://github.com/arco-design/arco-design-vue/pull/520))

### 🐛 问题修复

- 修复 x 轴 resize 问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- 修复存在固定列时，展开行宽度设置错误的问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- 修复存在子树时，复选框全选设置错误的问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))


## 2.13.0

`2021-12-31`

### 🆕 新增功能

- 增加 `loadMore` 属性，支持子树懒加载 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- 增加 `filterIconAlignLeft` 属性 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- 增加 `change` 事件，可获取处理后数据 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))

### 🐛 问题修复

- 修复 `sortOrder ` 置空失效的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- 修复 `expand-icon` 插槽在子树中不生效的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- 修复固定列在表格尺寸动态变化时阴影不显示的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))


## 2.12.0

`2021-12-24`

### 💅 样式更新

- 修复 table 滚动模式下最后一行多余边框的问题 ([#456](https://github.com/arco-design/arco-design-vue/pull/456))


## 2.11.0

`2021-12-17`

### 🆕 新增功能

- `columns` 新增 cellStyle 属性 ([#411](https://github.com/arco-design/arco-design-vue/pull/411))

### 🐛 问题修复

- 修复固定列模式下，表格尺寸变化导致表头和主体宽度不一致问题 ([#410](https://github.com/arco-design/arco-design-vue/pull/410))


## 2.10.0

`2021-12-10`

### 🆕 新增功能

- 增加 span-method 属性 ([#360](https://github.com/arco-design/arco-design-vue/pull/360))


## 2.9.0

`2021-12-03`

### 🐛 问题修复

- 修复树形展开按钮触发表单提交的问题 ([#321](https://github.com/arco-design/arco-design-vue/pull/321))


## 2.7.0

`2021-11-26`

### 🆕 新增功能

- 增加 `footer` 插槽 ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- 常规模式下表格宽度大于容器时会开启滚动条 ([#266](https://github.com/arco-design/arco-design-vue/pull/266))


## 2.6.1

`2021-11-24`

### 💎 功能优化

- 数据为空时不展示滚动 ([#245](https://github.com/arco-design/arco-design-vue/pull/245))

### 🐛 问题修复

- 修复展开行按钮触发表单提交的问题 ([#210](https://github.com/arco-design/arco-design-vue/pull/210))


## 2.3.0

`2021-11-12`

### 🐛 问题修复

- 修复 `<table-column>` 在分组表头错误的问题 ([#151](https://github.com/arco-design/arco-design-vue/pull/151))


## 2.2.0

`2021-11-10`

### 🆕 新增功能

- 增加 `row-key` 属性 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- 增加 `expandable` 中的 `expandedRowRender ` 和 `icon` 属性 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- 增加 `expand-icon` 和 `expand-row` 插槽 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))

### 🐛 问题修复

- 修复表头分组中表格操作项占位错误的问题 ([#127](https://github.com/arco-design/arco-design-vue/pull/127))


## 2.1.0

`2021-11-05`

### 🆕 新增功能

- 添加 `table-column` 中的 `#title` 插槽 ([#95](https://github.com/arco-design/arco-design-vue/pull/95))

### 🐛 问题修复

- 修复 `#column` 插槽不能支持Fragment的问题 ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- 修复 `scroll.x` 单独使用不生效的问题 ([#83](https://github.com/arco-design/arco-design-vue/pull/83))


## 2.0.3

`2021-10-29`

### 🐛 问题修复

- 修复 `scroll` 模式下，滚动条的显隐导致单元格错位 ([#29](https://github.com/arco-design/arco-design-vue/pull/29))

