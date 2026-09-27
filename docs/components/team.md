# Team 团队展示

团队成员。

> 类型 `TeamData` · 分类：团队 & 客户 · 源码 `packages/blocks/src/components/Team/`

## 基础用法

```vue
<script setup lang="ts">
import type { TeamData } from '@chatflow/blocks'

const team: TeamData = {
  title: '核心团队',
  description: '来自全球顶尖企业的协作专家',
  members: [
    { name: '张伟', role: 'CEO & 创始人', avatar: { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop' } },
    { name: '陈敏', role: 'CTO', avatar: { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' } },
    { name: '王磊', role: '产品总监', avatar: { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' } },
    { name: '李莉', role: '设计负责人', avatar: { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop' } },
  ],
}
</script>

<template>
  <Team :data="team" />
</template>
```

## API

### `data: TeamData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `members` | `[TeamMember](#teammember)[]` | 是 | — | 团队成员列表 |

### `TeamMember`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | `string` | 是 | — | 成员姓名 |
| `role` | `string` | 是 | — | 职位 / 角色 |
| `avatar` | `[BlockImage](/guide/contracts#blockimage)` | 是 | — | 头像 |

## 实现要点

- 使用语义化标签：`<section>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 6 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Testimonials 客户证言](/components/testimonials) — 客户证言
- [Partners 合作伙伴](/components/partners) — 合作企业 Logo
- [LogoBar Logo 墙](/components/logo-bar) — 轻量 Logo 墙
