# ProductDetail 产品详情

单品深度介绍。

> 类型 `ProductDetailData` · 分类：列表类 · 源码 `packages/blocks/src/components/ProductDetail/`

## 基础用法

```vue
<script setup lang="ts">
import type { ProductDetailData } from '@zeldafox/blocks'

const productDetail: ProductDetailData = {
  name: 'AI 智能助手',
  tagline: '让 AI 成为团队的生产力伙伴',
  description: '基于大语言模型，自动生成会议纪要、消息摘要、待办事项，提升团队效率。',
  image: {
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=60',
    alt: 'AI 助手界面',
  },
  tags: [
    { text: '新品', color: 'emerald' },
    { text: '热门', color: 'orange' },
  ],
  actions: [
    { text: '免费试用', link: '#', primary: true },
    { text: '观看演示', link: '#' },
  ],
  features: [
    { icon: '📝', title: '智能摘要', description: '自动生成会议纪要与消息摘要。' },
    { icon: '✅', title: '待办提取', description: '从对话中自动提取待办事项。' },
    { icon: '🌐', title: '多语言', description: '支持中英日韩等 10+ 语言。' },
  ],
}
</script>

<template>
  <ProductDetail :data="productDetail" />
</template>
```

## API

### `data: ProductDetailData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | `string` | 是 | — | 产品名称 |
| `tagline` | `string` | 否 | — | 产品标语 |
| `description` | `string` | 否 | — | 产品描述 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 产品主图 |
| `tags` | `[BlockTag](/guide/contracts#blocktag)[]` | 否 | — | 标签 |
| `actions` | `[BlockAction](/guide/contracts#blockaction)[]` | 否 | — | CTA 按钮 |
| `features` | `[ProductDetailFeature](#productdetailfeature)[]` | 否 | — | 核心特性 |

### `ProductDetailFeature`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `icon` | `string` | 是 | — | 特性图标（Emoji） |
| `title` | `string` | 是 | — | 特性标题 |
| `description` | `string` | 是 | — | 特性描述 |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 14 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ProductList 产品列表](/components/product-list) — 产品卡片列表
- [ServiceList 服务列表](/components/service-list) — 服务卡片列表
- [CourseList 课程列表](/components/course-list) — 课程卡片列表
- [NewsList 资讯列表](/components/news-list) — 资讯卡片列表
- [NewsDetail 文章详情](/components/news-detail) — 文章详情
