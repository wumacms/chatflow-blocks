# Hero 主视觉

首页主视觉。

> 类型 `HeroData` · 分类：Hero 类 · 源码 `packages/blocks/src/components/Hero/`

## 基础用法

```vue
<script setup lang="ts">
import type { HeroData } from '@zeldafox/blocks'

const hero: HeroData = {
  variant: 'centered',
  tone: 'classic',
  title: '<mark>企业级即时通讯</mark><br>让协作更快一步',
  description:
    '安全、高效、可定制——专为现代企业打造的智能聊天平台，集成工作流与数据洞察。',
  actions: [
    { text: '开始免费使用', link: '#', primary: true },
    { text: '联系销售', link: '#' },
  ],
  image: {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
    alt: '团队协作界面',
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
| `title` | `string` | 是 | — | 主标题，支持 HTML（如 `&lt;br&gt;`；需要局部高亮时用 `&lt;mark&gt;` 包裹） |
| `description` | `string` | 否 | — | 副标题/描述 |
| `actions` | `[BlockAction](/guide/contracts#blockaction)[]` | 否 | — | 按钮列表 |
| `image` | `[BlockImage](/guide/contracts#blockimage)` | 否 | — | 展示图 |
| `variant` | `HeroVariantInput` | 否 | — | 结构变体，默认 `centered`。 旧值 `'default'` 仍可用，运行时归一为 `'centered'`；非法值静默回退。 |
| `tone` | `HeroTone` | 否 | — | 皮肤色调，默认 `classic`。 同一份数据只改这个字段即可切换外观；非法值静默回退。 |
| `align` | `'center' \| 'left'` | 否 | — | 内容对齐方式 |
| `bgImage` | `[BlockImage](/guide/contracts#blockimage)` | 否 | — | variant='background' 时的背景图 |
| `overlayOpacity` | `number` | 否 | — | 遮罩透明度 0-100，仅 variant='background' 有效 |

## 同类组件

- [HeroBackground 背景图主视觉](/components/hero-background) — 全屏背景图 Hero
- [PageHeader 页头](/components/page-header) — 内页标题区域
