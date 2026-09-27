# FAQ 常见问题

问答列表。

> 类型 `FAQData` · 分类：表单 & 互动 · 源码 `packages/blocks/src/components/FAQ/`

## 基础用法

```vue
<script setup lang="ts">
import type { FAQData } from '@chatflow/blocks'

const faq: FAQData = {
  title: '常见问题',
  items: [
    { question: '支持本地部署吗？', answer: '是的，企业版支持私有云或本地服务器部署。' },
    { question: '可以试用多久？', answer: '所有新用户均可享受 30 天全功能免费试用。' },
    { question: '数据存储在哪里？', answer: '数据存储在云端的独立数据库。' },
    { question: '如何迁移现有聊天记录？', answer: '我们提供专业迁移工具，支持从 Slack、Teams 等导入。' },
  ],
}
</script>

<template>
  <FAQ :data="faq" />
</template>
```

## API

### `data: FAQData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `items` | `[FAQItem](#faqitem)[]` | 是 | — | FAQ 列表 |

### `FAQItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `question` | `string` | 是 | — | 问题 |
| `answer` | `string` | 是 | — | 回答 |

## 实现要点

- 使用语义化标签：`<section>`
- 内置 5 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ContactForm 联系表单](/components/contact-form) — 表单收集
- [CTA 行动号召](/components/cta) — 行动号召
