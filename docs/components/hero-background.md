# HeroBackground 背景图主视觉

全屏背景图 Hero。

> 类型 `HeroBackgroundData` · 分类：Hero 类 · 源码 `packages/blocks/src/components/HeroBackground/`

## 基础用法

```vue
<script setup lang="ts">
import type { HeroBackgroundData } from '@zeldafox/blocks'

const heroBg: HeroBackgroundData = {
  title: '企业级即时通讯<br>让协作更快一步',
  description: '安全、高效、可定制。',
  actions: [
    { text: '开始免费试用', link: '#', primary: true },
    { text: '联系销售', link: '#' },
  ],
  bgImage: {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80',
    alt: '团队协作',
  },
  overlayOpacity: 50,
}
</script>

<template>
  <HeroBackground :data="heroBg" />
</template>
```

## API

### `data: HeroBackgroundData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 主标题，支持 HTML（如 &lt;br&gt;） |
| `description` | `string` | 否 | — | 副标题/描述 |
| `actions` | `[BlockAction](/guide/contracts#blockaction)[]` | 否 | — | 按钮列表 |
| `bgImage` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 背景图片 |
| `overlayOpacity` | `number` | 否 | `50` | 遮罩透明度 0-100，默认 50 |
| `textWhite` | `boolean` | 否 | `true` | 文字是否使用白色，默认 true |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `overlayOpacity`），不会渲染空白

## 同类组件

- [Hero 主视觉](/components/hero) — 首页主视觉
- [PageHeader 页头](/components/page-header) — 内页标题区域
