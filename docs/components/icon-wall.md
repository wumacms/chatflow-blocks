# IconWall 图标墙

功能图标网格。

> 类型 `IconWallData` · 分类：内容区块 · 源码 `packages/blocks/src/components/IconWall/`

## 基础用法

```vue
<script setup lang="ts">
import type { IconWallData } from '@chatflow/blocks'

const iconWall: IconWallData = {
  title: '一个平台，覆盖全部场景',
  description: '按需组合，灵活扩展',
  items: [
    { icon: '💬', title: '即时通讯', description: '单聊、群聊、频道' },
    { icon: '📹', title: '视频会议', description: '千人在线，屏幕共享' },
    { icon: '📁', title: '云端盘', description: '文件协作与版本管理' },
    { icon: '🤖', title: 'AI 助手', description: '智能摘要与自动待办' },
    { icon: '🔔', title: '消息推送', description: '多端一致，实时触达' },
    { icon: '🛡️', title: '安全管理', description: '审计日志与合规留存' },
  ],
}
</script>

<template>
  <IconWall :data="iconWall" />
</template>
```

## API

### `data: IconWallData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[IconWallItem](#iconwallitem)[]` | 是 | — | 功能图标列表 |

### `IconWallItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `icon` | `string` | 是 | — | 图标（推荐 Emoji，无需引入图标库） |
| `title` | `string` | 是 | — | 功能名称 |
| `description` | `string` | 是 | — | 功能描述 |

## 实现要点

- 使用语义化标签：`<section>`
- 内置 9 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Features 特性网格](/components/features) — 产品特性网格
- [Stats 数据统计](/components/stats) — 数字统计
- [Steps 步骤流程](/components/steps) — 三步走 / 流程
- [Timeline 发展历程](/components/timeline) — 发展历程
- [Video 视频区块](/components/video) — 视频播放
