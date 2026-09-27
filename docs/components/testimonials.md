# Testimonials 客户证言

客户证言。

> 类型 `TestimonialsData` · 分类：团队 & 客户 · 源码 `packages/blocks/src/components/Testimonials/`

## 基础用法

```vue
<script setup lang="ts">
import type { TestimonialsData } from '@zeldafox/blocks'

const testimonials: TestimonialsData = {
  title: '客户心声',
  description: '来自全球团队的信任与反馈',
  items: [
    {
      quote: 'ChatFlow 彻底改变了我们团队的沟通方式。',
      name: '赵明远',
      position: '技术总监',
      company: '云创科技',
      avatar: { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    },
    {
      quote: '安全性和集成能力是我们选择 ChatFlow 的关键。',
      name: '陈雅文',
      position: '运营副总裁',
      company: '海纳集团',
      avatar: { src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop' },
    },
    {
      quote: '非常直观的界面，员工上手几乎没有学习成本。',
      name: '王景行',
      position: '产品负责人',
      company: '极客工坊',
      avatar: { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    },
  ],
}
</script>

<template>
  <Testimonials :data="testimonials" />
</template>
```

## API

### `data: TestimonialsData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[TestimonialItem](#testimonialitem)[]` | 是 | — | 客户证言列表 |

### `TestimonialItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `quote` | `string` | 是 | — | 客户评价正文 |
| `name` | `string` | 是 | — | 客户姓名 |
| `position` | `string` | 是 | — | 客户职位 |
| `company` | `string` | 是 | — | 所属公司 |
| `avatar` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 客户头像 |
| `rating` | `number` | 否 | — | 星级评分 1-5 |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 9 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Team 团队展示](/components/team) — 团队成员
- [Partners 合作伙伴](/components/partners) — 合作企业 Logo
- [LogoBar Logo 墙](/components/logo-bar) — 轻量 Logo 墙
