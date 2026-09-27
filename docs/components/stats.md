# Stats 数据统计

数字统计。

> 类型 `StatsData` · 分类：内容区块 · 源码 `packages/blocks/src/components/Stats/`

## 基础用法

```vue
<script setup lang="ts">
import type { StatsData } from '@zeldafox/blocks'

const stats: StatsData = {
  theme: 'primary',
  items: [
    { value: '500+', label: '企业客户' },
    { value: '98%', label: '客户留存率' },
    { value: '20M+', label: '日消息量' },
    { value: '24/7', label: '技术支持' },
  ],
}
</script>

<template>
  <Stats :data="stats" />
</template>
```

## API

### `data: StatsData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `items` | `[StatItem](#statitem)[]` | 是 | — | 统计项列表 |
| `theme` | `'primary' \| 'light'` | 否 | `'primary'` | 主题：primary=品牌色背景，light=浅色背景 |

### `StatItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `value` | `string` | 是 | — | 数值，如 '98%' |
| `label` | `string` | 是 | — | 标签，如 '客户留存率' |

## 实现要点

- 使用语义化标签：`<section>`
- 内置 3 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `theme`），不会渲染空白

## 同类组件

- [Features 特性网格](/components/features) — 产品特性网格
- [IconWall 图标墙](/components/icon-wall) — 功能图标网格
- [Steps 步骤流程](/components/steps) — 三步走 / 流程
- [Timeline 发展历程](/components/timeline) — 发展历程
- [Video 视频区块](/components/video) — 视频播放
