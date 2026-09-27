# ComparisonTable 对比表格

竞品对比表格。

> 类型 `ComparisonTableData` · 分类：表格 & 定价 · 源码 `packages/blocks/src/components/ComparisonTable/`

## 基础用法

```vue
<script setup lang="ts">
import type { ComparisonTableData } from '@zeldafox/blocks'

const comparisonTable: ComparisonTableData = {
  title: '为什么选择 ChatFlow',
  description: '与主流竞品对比，优势一目了然',
  firstColHeader: '功能',
  headers: [
    { text: 'ChatFlow', color: 'primary' },
    { text: '竞品 A', color: 'gray' },
    { text: '竞品 B', color: 'gray' },
  ],
  rows: [
    {
      feature: '端到端加密',
      columns: [
        { value: '✓', color: 'green' },
        { value: '✗', color: 'red' },
        { value: '✓', color: 'green' },
      ],
    },
    {
      feature: '无限消息历史',
      columns: [
        { value: '✓', color: 'green' },
        { value: '✓', color: 'green' },
        { value: '✗', color: 'red' },
      ],
    },
    {
      feature: 'AI 助手',
      columns: [
        { value: '✓', color: 'green' },
        { value: '✗', color: 'red' },
        { value: 'Beta', color: 'yellow' },
      ],
    },
  ],
}
</script>

<template>
  <ComparisonTable :data="comparisonTable" />
</template>
```

## API

### `data: ComparisonTableData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `firstColHeader` | `string` | 否 | `'功能'` | 首列表头文字，默认 '功能' |
| `headers` | `[ComparisonHeader](#comparisonheader)[]` | 是 | — | 对比列的表头（竞品 / 方案） |
| `rows` | `[ComparisonRow](#comparisonrow)[]` | 是 | — | 对比数据行 |

### `ComparisonHeader`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `text` | `string` | 是 | — | 表头文字 |
| `color` | `'primary' \| 'gray'` | 否 | — | 表头配色，用于突出自家产品 |

### `ComparisonCell`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `value` | `string` | 是 | — | 单元格内容，常用 ✓ / ✗ / 文字 |
| `color` | `'green' \| 'red' \| 'yellow' \| 'gray'` | 否 | — | 单元格配色 |

### `ComparisonRow`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `feature` | `string` | 是 | — | 行首的能力/功能名称 |
| `columns` | `[ComparisonCell](#comparisoncell)[]` | 是 | — | 各列的对比结果，顺序需与 `headers` 对应 |

## 实现要点

- 使用语义化标签：`<section>`
- 内置 10 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `firstColHeader`），不会渲染空白

## 同类组件

- [Pricing 定价方案](/components/pricing) — 定价方案对比
