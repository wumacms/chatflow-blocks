# ServiceList 服务列表

服务卡片列表。

> 类型 `ServiceListData` · 分类：列表类 · 源码 `packages/blocks/src/components/ServiceList/`

## 基础用法

```vue
<script setup lang="ts">
import type { ServiceListData } from '@chatflow/blocks'

const serviceList: ServiceListData = {
  title: '我们的服务',
  description: '从咨询到落地，全链路助力企业数字化升级',
  items: [
    {
      icon: '📋',
      title: '咨询与规划',
      description: '深入了解业务需求，制定个性化解决方案。',
      points: ['需求分析', '方案设计', '路线图规划'],
      link: '#',
    },
    {
      icon: '🚀',
      title: '部署与实施',
      description: '快速部署平台，支持云端、私有云及本地部署。',
      points: ['云端部署', '私有化适配', '数据迁移'],
      link: '#',
    },
    {
      icon: '🎓',
      title: '培训与赋能',
      description: '提供系统化的培训课程和操作指南。',
      points: ['管理员培训', '员工手册', '视频教程'],
      link: '#',
    },
  ],
  more: { text: '查看全部服务', link: '#', primary: true },
}
</script>

<template>
  <ServiceList :data="serviceList" />
</template>
```

## API

### `data: ServiceListData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[ServiceItem](#serviceitem)[]` | 是 | — | 服务列表 |
| `more` | `[BlockAction](/guide/contracts#blockaction)` | 否 | — | 底部「查看更多」按钮 |

### `ServiceItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `icon` | `string` | 是 | — | 图标（推荐 Emoji） |
| `title` | `string` | 是 | — | 服务名称 |
| `description` | `string` | 是 | — | 服务描述 |
| `points` | `string[]` | 否 | — | 服务要点列表 |
| `link` | `string` | 否 | — | 详情页链接 |
| `newWindow` | `boolean` | 否 | — | 详情链接是否新窗口打开 |

## 实现要点

- 使用语义化标签：`<section>`
- 已标注无障碍属性：`aria-hidden`
- 内置 12 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ProductList 产品列表](/components/product-list) — 产品卡片列表
- [ProductDetail 产品详情](/components/product-detail) — 单品深度介绍
- [CourseList 课程列表](/components/course-list) — 课程卡片列表
- [NewsList 资讯列表](/components/news-list) — 资讯卡片列表
- [NewsDetail 文章详情](/components/news-detail) — 文章详情
