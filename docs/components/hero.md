# Hero 主视觉

首页主视觉。

> 类型 `HeroData` · 分类：Hero 类 · 源码 `packages/blocks/src/components/Hero/`

## 基础用法

```vue
<script setup lang="ts">
import type { HeroData } from '@zeldafox/blocks'

const hero: HeroData = {
  title: '企业级即时通讯<br>让协作更快一步',
  description: '安全、高效、可定制——专为现代企业打造的智能聊天平台。',
  actions: [
    { text: '开始免费试用', link: '#', primary: true },
    { text: '联系销售', link: '#' },
  ],
  image: {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=60',
    alt: '界面截图',
  },
}
</script>

<template>
  <Hero :data="hero" />
</template>
```

## API

### `data: HeroData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 主标题，支持 HTML（如 &lt;br&gt;） |
| `description` | `string` | 否 | — | 副标题/描述 |
| `actions` | `[BlockAction](/guide/contracts#blockaction)[]` | 否 | — | 按钮列表 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 否 | — | 展示图 |
| `variant` | `'default' \| 'background'` | 否 | `'default'` | 变体：default=白底大图，background=背景图 + 遮罩 |
| `align` | `'center' \| 'left'` | 否 | `'center'` | 内容对齐方式 |
| `bgImage` | `[BlockImage](/guide/contracts#blockimage)` | 否 | — | variant='background' 时的背景图 |
| `overlayOpacity` | `number` | 否 | `50` | 遮罩透明度 0-100，仅 variant='background' 有效 |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 8 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `variant`），不会渲染空白

## 同类组件

- [HeroBackground 背景图主视觉](/components/hero-background) — 全屏背景图 Hero
- [PageHeader 页头](/components/page-header) — 内页标题区域
