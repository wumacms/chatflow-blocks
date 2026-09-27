# NewsDetail 文章详情

文章详情。

> 类型 `NewsDetailData` · 分类：列表类 · 源码 `packages/blocks/src/components/NewsDetail/`

## 基础用法

```vue
<script setup lang="ts">
import type { NewsDetailData } from '@chatflow/blocks'

const newsDetail: NewsDetailData = {
  category: '产品更新',
  date: '2026-08-20',
  title: '全新 AI 助手正式上线，支持智能摘要',
  image: {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=60',
    alt: 'AI 助手界面',
  },
  body: '<p>我们很高兴地宣布，ChatFlow 全新 AI 助手功能已正式上线。</p><p><strong>核心能力：</strong>智能摘要、会议纪要、待办提取、多语言支持。</p>',
  tags: ['AI', '产品更新', '效率工具'],
}
</script>

<template>
  <NewsDetail :data="newsDetail" />
</template>
```

## API

### `data: NewsDetailData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `category` | `string` | 否 | — | 文章分类 |
| `date` | `string` | 否 | — | 发布日期 |
| `title` | `string` | 是 | — | 文章标题 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 否 | — | 题图 |
| `body` | `string` | 是 | — | 正文，支持 HTML |
| `tags` | `string[]` | 否 | — | 文章标签 |

## 实现要点

- 使用语义化标签：`<section>`、`<figure>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 10 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ProductList 产品列表](/components/product-list) — 产品卡片列表
- [ProductDetail 产品详情](/components/product-detail) — 单品深度介绍
- [ServiceList 服务列表](/components/service-list) — 服务卡片列表
- [CourseList 课程列表](/components/course-list) — 课程卡片列表
- [NewsList 资讯列表](/components/news-list) — 资讯卡片列表
