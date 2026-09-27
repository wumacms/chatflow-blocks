# Steps 步骤流程

三步走 / 流程。

> 类型 `StepsData` · 分类：内容区块 · 源码 `packages/blocks/src/components/Steps/`

## 基础用法

```vue
<script setup lang="ts">
import type { StepsData } from '@chatflow/blocks'

const steps: StepsData = {
  title: '三步开启高效协作',
  description: '简单快捷，即刻上手',
  items: [
    { number: '1', title: '注册账号', description: '30 秒完成注册，无需信用卡。' },
    { number: '2', title: '邀请团队', description: '一键邀请成员，自动同步企业目录。' },
    { number: '3', title: '开始协作', description: '创建频道、发起会议，即刻开始。' },
  ],
}
</script>

<template>
  <Steps :data="steps" />
</template>
```

## API

### `data: StepsData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `items` | `[StepItem](#stepitem)[]` | 是 | — | 步骤列表 |

### `StepItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `number` | `string` | 是 | — | 步骤编号（如 1、2、3） |
| `title` | `string` | 是 | — | 步骤标题 |
| `description` | `string` | 是 | — | 步骤描述 |
| `icon` | `string` | 否 | — | 图标（Emoji，可选） |

## 实现要点

- 使用语义化标签：`<section>`
- 已标注无障碍属性：`aria-hidden`
- 内置 7 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Features 特性网格](/components/features) — 产品特性网格
- [Stats 数据统计](/components/stats) — 数字统计
- [IconWall 图标墙](/components/icon-wall) — 功能图标网格
- [Timeline 发展历程](/components/timeline) — 发展历程
- [Video 视频区块](/components/video) — 视频播放
