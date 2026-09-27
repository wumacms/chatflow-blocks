# ProductList 产品列表

产品卡片列表。

> 类型 `ProductListData` · 分类：列表类 · 源码 `packages/blocks/src/components/ProductList/`

## 基础用法

```vue
<script setup lang="ts">
import type { ProductListData } from '@chatflow/blocks'

const productList: ProductListData = {
  title: '我们的产品',
  description: '为企业打造的智能协作工具矩阵',
  items: [
    {
      title: '即时通讯',
      description: '企业级实时消息系统，消息历史永久保存。',
      image: { src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=60' },
      tags: ['端到端加密', '已读回执'],
      badge: '热门',
      link: '#',
    },
    {
      title: '视频会议',
      description: '高清音视频通话，最多容纳 500 人。',
      image: { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=60' },
      tags: ['1080p', 'AI 降噪'],
      link: '#',
    },
    {
      title: 'AI 智能助手',
      description: '自动生成会议纪要、消息摘要。',
      image: { src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=60' },
      tags: ['智能摘要', '多语言'],
      badge: '新品',
      badgeColor: 'bg-emerald-500',
      link: '#',
    },
  ],
}
</script>

<template>
  <ProductList :data="productList" />
</template>
```

## API

### `data: ProductListData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[ProductItem](#productitem)[]` | 是 | — | 产品列表 |

### `ProductItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 产品名称 |
| `description` | `string` | 是 | — | 产品简介 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 产品图 |
| `tags` | `string[]` | 否 | — | 标签组 |
| `badge` | `string` | 否 | — | 卡片角标文字 |
| `badgeColor` | `string` | 否 | — | 角标背景色（Tailwind 类名，如 `bg-emerald-500`） |
| `link` | `string` | 否 | — | 详情页链接 |
| `newWindow` | `boolean` | 否 | — | 详情链接是否新窗口打开 |

## 实现要点

- 使用语义化标签：`<section>`
- 已标注无障碍属性：`aria-hidden`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 10 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ProductDetail 产品详情](/components/product-detail) — 单品深度介绍
- [ServiceList 服务列表](/components/service-list) — 服务卡片列表
- [CourseList 课程列表](/components/course-list) — 课程卡片列表
- [NewsList 资讯列表](/components/news-list) — 资讯卡片列表
- [NewsDetail 文章详情](/components/news-detail) — 文章详情
