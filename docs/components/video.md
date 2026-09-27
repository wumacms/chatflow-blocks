# Video 视频区块

视频播放。

> 类型 `VideoData` · 分类：内容区块 · 源码 `packages/blocks/src/components/Video/`

## 基础用法

```vue
<script setup lang="ts">
import type { VideoData } from '@chatflow/blocks'

const video: VideoData = {
  title: '产品演示',
  description: '3 分钟了解 ChatFlow 核心能力',
  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  type: 'video',
}
</script>

<template>
  <Video :data="video" />
</template>
```

## API

### `data: VideoData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `src` | `string` | 是 | — | 视频地址（mp4 或 iframe 嵌入地址） |
| `type` | `'video' \| 'iframe'` | 否 | `'video'` | 视频类型，默认 'video' |
| `poster` | `[BlockImage](/guide/contracts#blockimage)` | 否 | — | 视频封面 |
| `aspectRatio` | `'16/9' \| '4/3' \| '1/1'` | 否 | `'16/9'` | 宽高比 |

## 实现要点

- 使用语义化标签：`<section>`
- 内置 4 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `type`），不会渲染空白

## 同类组件

- [Features 特性网格](/components/features) — 产品特性网格
- [Stats 数据统计](/components/stats) — 数字统计
- [IconWall 图标墙](/components/icon-wall) — 功能图标网格
- [Steps 步骤流程](/components/steps) — 三步走 / 流程
- [Timeline 发展历程](/components/timeline) — 发展历程
