# Features 特性网格

产品特性网格。

> 类型 `FeaturesData` · 分类：内容区块 · 源码 `packages/blocks/src/components/Features/`

## 基础用法

```vue
<script setup lang="ts">
import type { FeaturesData } from '@chatflow/blocks'

const features: FeaturesData = {
  title: '专为商务打造的特性',
  description: '从安全到效率，面面俱到',
  columns: 4,
  items: [
    { icon: '🔒', title: '企业级安全', description: '端到端加密、SSO、DLP 策略。' },
    { icon: '⚡', title: '实时同步', description: '毫秒级延迟，跨设备已读回执。' },
    { icon: '🧩', title: '无限集成', description: '连接 200+ 企业应用。' },
    { icon: '📊', title: '分析洞察', description: '团队活跃度数据可视化。' },
  ],
}
</script>

<template>
  <Features :data="features" />
</template>
```

## API

### `data: FeaturesData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[FeatureItem](#featureitem)[]` | 是 | — | 特性列表 |
| `columns` | `2 \| 3 \| 4` | 否 | `4` | 列数 |
| `bgColor` | `'white' \| 'gray'` | 否 | `'gray'` | 背景色 |

### `FeatureItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `icon` | `string` | 是 | — | 图标（Emoji） |
| `title` | `string` | 是 | — | 标题 |
| `description` | `string` | 是 | — | 描述 |

## 实现要点

- 使用语义化标签：`<section>`
- 内置 10 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `columns`），不会渲染空白

## 同类组件

- [Stats 数据统计](/components/stats) — 数字统计
- [IconWall 图标墙](/components/icon-wall) — 功能图标网格
- [Steps 步骤流程](/components/steps) — 三步走 / 流程
- [Timeline 发展历程](/components/timeline) — 发展历程
- [Video 视频区块](/components/video) — 视频播放
