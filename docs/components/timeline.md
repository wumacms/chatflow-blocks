# Timeline 发展历程

发展历程。

> 类型 `TimelineData` · 分类：内容区块 · 源码 `packages/blocks/src/components/Timeline/`

## 基础用法

```vue
<script setup lang="ts">
import type { TimelineData } from '@chatflow/blocks'

const timeline: TimelineData = {
  title: '发展历程',
  description: '从 2020 到 2025，一路走来',
  items: [
    { time: '2020', title: '公司成立', description: '创始团队成立，开始研发。' },
    { time: '2022', title: '产品上线', description: 'ChatFlow 1.0 正式发布。' },
    { time: '2024', title: 'AI 助手', description: '集成大语言模型能力。' },
    { time: '2025', title: '全球化', description: '服务覆盖 30+ 国家。' },
  ],
}
</script>

<template>
  <Timeline :data="timeline" />
</template>
```

## API

### `data: TimelineData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[TimelineItem](#timelineitem)[]` | 是 | — | 时间节点列表 |

### `TimelineItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `time` | `string` | 是 | — | 时间（如 2020、Q1 2024） |
| `title` | `string` | 是 | — | 标题 |
| `description` | `string` | 否 | — | 描述 |
| `icon` | `string` | 否 | — | 图标（Emoji，可选） |

## 实现要点

- 使用语义化标签：`<section>`
- 已标注无障碍属性：`aria-hidden`
- 内置 11 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Features 特性网格](/components/features) — 产品特性网格
- [Stats 数据统计](/components/stats) — 数字统计
- [IconWall 图标墙](/components/icon-wall) — 功能图标网格
- [Steps 步骤流程](/components/steps) — 三步走 / 流程
- [Video 视频区块](/components/video) — 视频播放
