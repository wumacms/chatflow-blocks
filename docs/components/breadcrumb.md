# Breadcrumb 面包屑

内页面包屑导航。

> 类型 `BreadcrumbData` · 分类：布局 & 导航 · 源码 `packages/blocks/src/components/Breadcrumb/`

## 基础用法

```vue
<script setup lang="ts">
import type { BreadcrumbData } from '@chatflow/blocks'

const breadcrumb: BreadcrumbData = {
  items: [
    { text: '首页', link: '/' },
    { text: '帮助文档', link: '/docs' },
    { text: '快速开始' },
  ],
}
</script>

<template>
  <Breadcrumb :data="breadcrumb" />
</template>
```

## API

### `data: BreadcrumbData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `items` | `[BreadcrumbItem](#breadcrumbitem)[]` | 是 | — | 层级列表，按从外到内排列 |

### `BreadcrumbItem`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `text` | `string` | 是 | — | 显示文字 |
| `link` | `string` | 否 | — | 链接地址（最后一项通常无链接） |

## 实现要点

- 使用语义化标签：`<nav>`
- 已标注无障碍属性：`aria-hidden`、`aria-label`
- 内置 6 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Navbar 导航栏](/components/navbar) — 顶部导航（支持二级菜单）
- [Banner 通知条](/components/banner) — 通知条 / 活动条
- [Footer 页脚](/components/footer) — 底部版权信息
