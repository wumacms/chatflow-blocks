# ImageText 图文组合

左图右文 / 左文右图。

> 类型 `ImageTextData` · 分类：图文组合 · 源码 `packages/blocks/src/components/ImageText/`

## 基础用法

```vue
<script setup lang="ts">
import type { ImageTextData } from '@zeldafox/blocks'

const imageText: ImageTextData = {
  title: '无缝沟通，跨越部门',
  description: '打破信息孤岛，通过话题群组、私聊和富媒体分享，让每个人都能快速找到所需信息。',
  image: {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=60',
    alt: '团队沟通',
  },
  tags: ['✓ 端到端加密', '✓ 无限历史记录'],
  imagePosition: 'left',
}
</script>

<template>
  <ImageText :data="imageText" />
</template>
```

## API

### `data: ImageTextData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 区块标题，支持 HTML（如 &lt;br&gt;） |
| `description` | `string` | 否 | — | 正文描述 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 配图 |
| `tags` | `string[]` | 否 | — | 标签组（渲染为胶囊） |
| `imagePosition` | `'left' \| 'right'` | 否 | `'left'` | 图片位置，left = 左图右文，right = 左文右图，默认 'left' |
| `bgColor` | `'white' \| 'gray'` | 否 | `'white'` | 背景色，默认 'white' |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 7 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `imagePosition`），不会渲染空白

## 同类组件

- [TopImage 上文下图](/components/top-image) — 上文下图
