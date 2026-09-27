# CTA 行动号召

行动号召。

> 类型 `CTAData` · 分类：表单 & 互动 · 源码 `packages/blocks/src/components/CTA/`

## 基础用法

```vue
<script setup lang="ts">
import type { CTAData } from '@zeldafox/blocks'

const cta: CTAData = {
  title: '立即提升团队协作效率',
  description: '加入数百家信任我们的企业，开启高效沟通之旅。',
  actions: [
    { text: '免费试用 30 天', link: '#', primary: true },
    { text: '预约演示', link: '#', newWindow: true },
  ],
}
</script>

<template>
  <CTA :data="cta" />
</template>
```

## API

### `data: CTAData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 标题 |
| `description` | `string` | 否 | — | 描述 |
| `actions` | `[BlockAction](/guide/contracts#blockaction)[]` | 否 | — | 按钮列表 |
| `theme` | `'primary' \| 'dark'` | 否 | `'primary'` | 主题 |

## 实现要点

- 使用语义化标签：`<section>`
- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `theme`），不会渲染空白

## 同类组件

- [ContactForm 联系表单](/components/contact-form) — 表单收集
- [FAQ 常见问题](/components/faq) — 问答列表
