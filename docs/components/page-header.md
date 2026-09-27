# PageHeader 页头

内页标题区域。

> 类型 `PageHeaderData` · 分类：Hero 类 · 源码 `packages/blocks/src/components/PageHeader/`

## 基础用法

```vue
<script setup lang="ts">
import type { PageHeaderData } from '@chatflow/blocks'

const pageHeader: PageHeaderData = {
  title: '帮助文档',
  description: '快速了解 ChatFlow 的使用方法',
  align: 'center',
  bgColor: 'gray',
}
</script>

<template>
  <PageHeader :data="pageHeader" />
</template>
```

## API

### `data: PageHeaderData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | — | 页面标题，支持 HTML（如 &lt;br&gt;） |
| `description` | `string` | 否 | — | 页面描述 |
| `align` | `'center' \| 'left'` | 否 | `'center'` | 对齐方式，默认 'center' |
| `bgColor` | `'white' \| 'gray' \| 'primary'` | 否 | `'gray'` | 背景色 |

## 实现要点

- 使用语义化标签：`<section>`
- 内置 2 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `align`），不会渲染空白

## 同类组件

- [Hero 主视觉](/components/hero) — 首页主视觉
- [HeroBackground 背景图主视觉](/components/hero-background) — 全屏背景图 Hero
