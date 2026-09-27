# ContactForm 联系表单

表单收集。

> 类型 `ContactFormData` · 分类：表单 & 互动 · 源码 `packages/blocks/src/components/ContactForm/`

## 基础用法

```vue
<script setup lang="ts">
import type { ContactFormData } from '@zeldafox/blocks'

const contactForm: ContactFormData = {
  title: '联系我们',
  description: '有疑问或需求？我们的团队随时准备为您提供帮助',
  fields: [
    { name: 'name', label: '姓名', type: 'text', placeholder: '请输入您的姓名', required: true },
    { name: 'company', label: '公司名称', type: 'text', placeholder: '请输入公司名称' },
    { name: 'email', label: '邮箱地址', type: 'email', placeholder: '请输入您的邮箱', required: true, width: 'full' },
    {
      name: 'subject',
      label: '主题',
      type: 'select',
      required: true,
      placeholder: '请选择咨询主题',
      options: [
        { label: '产品咨询', value: 'product' },
        { label: '价格方案', value: 'pricing' },
        { label: '预约演示', value: 'demo' },
        { label: '技术支持', value: 'support' },
      ],
    },
    { name: 'message', label: '留言内容', type: 'textarea', placeholder: '请详细描述您的需求...', required: true },
  ],
  submitText: '发送消息',
  footerNote: '提交即表示您同意我们的隐私政策。',
}
</script>

<template>
  <ContactForm :data="contactForm" />
</template>
```

## 事件

| 事件 | 参数 | 参数类型 | 说明 |
| --- | --- | --- | --- |
| `submit` | `values` | `Record<string, string>` | 表单提交，参数为所有字段的键值对（`field.name` → 用户输入） |

```vue
<ContactForm :data="contactForm" @submit="onSubmit" />
```

## API

### `data: ContactFormData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `fields` | `[FormField](#formfield)[]` | 是 | — | 表单字段列表 |
| `submitText` | `string` | 否 | `'发送消息'` | 提交按钮文案，默认 '发送消息' |
| `footerNote` | `string` | 否 | — | 表单底部说明（隐私条款等） |

### `FormField`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | `string` | 是 | — | 字段名，作为提交数据的 key |
| `label` | `string` | 是 | — | 表单标签文案 |
| `type` | `'text' \| 'email' \| 'textarea' \| 'select'` | 是 | — | 控件类型 |
| `placeholder` | `string` | 否 | — | 占位提示 |
| `required` | `boolean` | 否 | — | 是否必填 |
| `options` | `{ label: string; value: string }[]` | 否 | — | `type: 'select'` 时的下拉选项 |
| `width` | `'half' \| 'full'` | 否 | — | 字段宽度： - `half`：与相邻 half 字段并排（sm 断点以上两列） - `full`：独占一行 仅对 `text` / `email` 生效，其余类型恒为 full。 |

## 实现要点

- 使用语义化标签：`<section>`、`<form>`
- 内置 18 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `submitText`），不会渲染空白

## 同类组件

- [CTA 行动号召](/components/cta) — 行动号召
- [FAQ 常见问题](/components/faq) — 问答列表
