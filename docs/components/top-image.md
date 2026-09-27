# TopImage 上文下图

上文下图。

> 类型 `TopImageData` · 分类：图文组合 · 源码 `packages/blocks/src/components/TopImage/`

## 基础用法

```vue
<script setup lang="ts">
import type { TopImageData } from '@zeldafox/blocks'

const topImage: TopImageData = {
  title: '全平台一致体验',
  description: '无论是在桌面、网页还是移动端，消息实时同步。',
  image: {
    src: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&q=60',
    alt: '多设备',
  },
}
</script>

<template>
  <TopImage :data="topImage" />
</template>
```

## API

### `data: TopImageData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 区块标题，支持 HTML（如 &lt;br&gt;） |
| `description` | `string` | 否 | — | 正文描述 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 标题下方的通栏配图 |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 4 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ImageText 图文组合](/components/image-text) — 左图右文 / 左文右图
