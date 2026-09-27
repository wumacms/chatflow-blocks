# LogoBar Logo 墙

轻量 Logo 墙。

> 类型 `LogoBarData` · 分类：团队 & 客户 · 源码 `packages/blocks/src/components/LogoBar/`

## 基础用法

```vue
<script setup lang="ts">
import type { LogoBarData } from '@chatflow/blocks'

const logoBar: LogoBarData = {
  items: [
    { name: 'Google', logo: { src: 'https://picsum.photos/seed/google/120/40' } },
    { name: 'Microsoft', logo: { src: 'https://picsum.photos/seed/ms/120/40' } },
    { name: 'Amazon', logo: { src: 'https://picsum.photos/seed/amazon/120/40' } },
    { name: 'Meta', logo: { src: 'https://picsum.photos/seed/meta/120/40' } },
  ],
}
</script>

<template>
  <LogoBar :data="logoBar" />
</template>
```

## API

### `data: LogoBarData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `items` | `[LogoBarItem](#logobaritem)[]` | 是 | — | Logo 列表 |
| `grayscale` | `boolean` | 否 | `true` | 是否显示灰度效果，默认 true |

### `LogoBarItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | `string` | 是 | — | 品牌名称（作为 Logo 的 alt 文本） |
| `logo` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | Logo 图片 |
| `link` | `string` | 否 | — | 点击跳转链接 |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 2 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `grayscale`），不会渲染空白

## 同类组件

- [Team 团队展示](/components/team) — 团队成员
- [Testimonials 客户证言](/components/testimonials) — 客户证言
- [Partners 合作伙伴](/components/partners) — 合作企业 Logo
