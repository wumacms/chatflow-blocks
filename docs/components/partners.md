# Partners 合作伙伴

合作企业 Logo。

> 类型 `PartnersData` · 分类：团队 & 客户 · 源码 `packages/blocks/src/components/Partners/`

## 基础用法

```vue
<script setup lang="ts">
import type { PartnersData } from '@chatflow/blocks'

const partners: PartnersData = {
  title: '我们的合作伙伴',
  description: '全球领先的创新企业信赖之选',
  items: [
    { name: 'Airbnb', logo: { src: 'https://picsum.photos/seed/airbnb/120/40' } },
    { name: 'Notion', logo: { src: 'https://picsum.photos/seed/notion/120/40' } },
    { name: 'Loom', logo: { src: 'https://picsum.photos/seed/loom/120/40' } },
    { name: 'Figma', logo: { src: 'https://picsum.photos/seed/figma/120/40' } },
    { name: 'Vercel', logo: { src: 'https://picsum.photos/seed/vercel/120/40' } },
    { name: 'Linear', logo: { src: 'https://picsum.photos/seed/linear/120/40' } },
  ],
}
</script>

<template>
  <Partners :data="partners" />
</template>
```

## API

### `data: PartnersData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[PartnerItem](#partneritem)[]` | 是 | — | 合作方列表 |

### `PartnerItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | `string` | 是 | — | 合作方名称（作为 Logo 的 alt 文本） |
| `logo` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | Logo 图片 |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 5 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Team 团队展示](/components/team) — 团队成员
- [Testimonials 客户证言](/components/testimonials) — 客户证言
- [LogoBar Logo 墙](/components/logo-bar) — 轻量 Logo 墙
