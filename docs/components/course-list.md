# CourseList 课程列表

课程卡片列表。

> 类型 `CourseListData` · 分类：列表类 · 源码 `packages/blocks/src/components/CourseList/`

## 基础用法

```vue
<script setup lang="ts">
import type { CourseListData } from '@chatflow/blocks'

const courseList: CourseListData = {
  title: '热门课程',
  description: '系统化学习路径，助力团队快速掌握协作技能',
  items: [
    {
      title: 'ChatFlow 从入门到精通',
      description: '全面了解 ChatFlow 核心功能。',
      image: { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=60' },
      tags: [{ text: '入门', color: 'bg-indigo-600' }],
      duration: '2.5 小时',
      chapters: '6',
      instructor: '张伟',
      rating: '★★★★★',
      ratingCount: '86',
      price: '¥199',
      button: { text: '立即学习', link: '#' },
    },
    {
      title: '高效团队协作管理',
      description: '掌握团队沟通、任务分配与进度追踪。',
      image: { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=60' },
      tags: [
        { text: '进阶', color: 'bg-emerald-500' },
        { text: '热门', color: 'bg-orange-500' },
      ],
      duration: '4 小时',
      chapters: '8',
      instructor: '陈敏',
      rating: '★★★★★',
      ratingCount: '124',
      price: '¥299',
      button: { text: '立即学习', link: '#' },
    },
    {
      title: 'AI 助手实战应用',
      description: '利用 AI 自动生成会议纪要、摘要。',
      image: { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=60' },
      tags: [
        { text: '高级', color: 'bg-purple-500' },
        { text: '新品', color: 'bg-rose-500' },
      ],
      duration: '3 小时',
      chapters: '5',
      instructor: '王磊',
      rating: '★★★★☆',
      ratingCount: '53',
      price: '¥249',
      button: { text: '立即学习', link: '#' },
    },
  ],
  more: { text: '查看全部课程', link: '#', primary: true },
}
</script>

<template>
  <CourseList :data="courseList" />
</template>
```

## API

### `data: CourseListData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[CourseItem](#courseitem)[]` | 是 | — | 课程列表 |
| `more` | `[BlockAction](/guide/contracts#blockaction)` | 否 | — | 底部「查看更多」按钮 |

### `CourseTag`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `text` | `string` | 是 | — | 标签文字 |
| `color` | `string` | 否 | — | 标签配色 |

### `CourseItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 课程标题 |
| `description` | `string` | 是 | — | 课程简介 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 封面图 |
| `tags` | `[CourseTag](#coursetag)[]` | 否 | — | 标签组 |
| `duration` | `string` | 否 | — | 课时时长，如 '12 小时' |
| `chapters` | `string` | 否 | — | 章节数，如 '48 节' |
| `instructor` | `string` | 否 | — | 讲师姓名 |
| `rating` | `string` | 否 | — | 评分，如 '4.9' |
| `ratingCount` | `string` | 否 | — | 评分人数，如 '2,341 人评价' |
| `price` | `string` | 否 | — | 价格，如 '¥299' |
| `button` | `[BlockAction](/guide/contracts#blockaction)` | 否 | — | 卡片按钮 |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 10 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ProductList 产品列表](/components/product-list) — 产品卡片列表
- [ProductDetail 产品详情](/components/product-detail) — 单品深度介绍
- [ServiceList 服务列表](/components/service-list) — 服务卡片列表
- [NewsList 资讯列表](/components/news-list) — 资讯卡片列表
- [NewsDetail 文章详情](/components/news-detail) — 文章详情
