# NewsList 资讯列表

资讯卡片列表。

> 类型 `NewsListData` · 分类：列表类 · 源码 `packages/blocks/src/components/NewsList/`

## 基础用法

```vue
<script setup lang="ts">
import type { NewsListData } from '@chatflow/blocks'

const newsList: NewsListData = {
  title: '最新动态',
  description: '产品更新 · 行业洞察 · 客户故事',
  items: [
    {
      title: '全新 AI 助手正式上线，支持智能摘要',
      summary: '通过大语言模型自动生成会议纪要、消息摘要。',
      image: { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=40' },
      category: '产品更新',
      date: '2026-08-20',
      link: '#',
    },
    {
      title: '2026 年企业协作趋势：AI 原生与安全合规',
      summary: '超过 70% 的企业计划引入 AI 驱动的协作工具。',
      image: { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=40' },
      category: '行业洞察',
      date: '2026-08-18',
      link: '#',
    },
    {
      title: '某全球零售品牌借助 ChatFlow 提升效率',
      summary: '通过集成库存系统，将补货响应时间缩短了 40%。',
      image: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=40' },
      category: '客户故事',
      date: '2026-08-15',
      link: '#',
    },
  ],
  more: { text: '查看全部新闻', link: '#', primary: true },
}
</script>

<template>
  <NewsList :data="newsList" />
</template>
```

## API

### `data: NewsListData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[NewsItem](#newsitem)[]` | 是 | — | 资讯列表 |
| `more` | `[BlockAction](/guide/contracts#blockaction)` | 否 | — | 底部「查看更多」按钮 |

### `NewsItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 资讯标题 |
| `summary` | `string` | 是 | — | 摘要 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 封面图 |
| `category` | `string` | 否 | — | 分类 |
| `date` | `string` | 否 | — | 发布日期 |
| `link` | `string` | 否 | — | 详情页链接 |
| `newWindow` | `boolean` | 否 | — | 阅读更多链接是否新窗口打开 |

## 实现要点

- 使用语义化标签：`<section>`、`<article>`
- 已标注无障碍属性：`aria-hidden`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 11 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ProductList 产品列表](/components/product-list) — 产品卡片列表
- [ProductDetail 产品详情](/components/product-detail) — 单品深度介绍
- [ServiceList 服务列表](/components/service-list) — 服务卡片列表
- [CourseList 课程列表](/components/course-list) — 课程卡片列表
- [NewsDetail 文章详情](/components/news-detail) — 文章详情
