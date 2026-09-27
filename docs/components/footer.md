# Footer 页脚

底部版权信息。

> 类型 `FooterData` · 分类：布局 & 导航 · 源码 `packages/blocks/src/components/Footer/`

## 基础用法

```vue
<script setup lang="ts">
import type { FooterData } from '@chatflow/blocks'

const footer: FooterData = {
  brand: 'ChatFlow',
  copyright: '© 2025 ChatFlow Technologies · 保留所有权利。',
}
</script>

<template>
  <Footer :data="footer" />
</template>
```

## API

### `data: FooterData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `brand` | `string` | 是 | — | 品牌名称 |
| `logo` | `[BlockImage](/guide/contracts#blockimage)` | 否 | — | Logo |
| `copyright` | `string` | 否 | — | 版权信息 |

## 实现要点

- 使用语义化标签：`<footer>`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Navbar 导航栏](/components/navbar) — 顶部导航（支持二级菜单）
- [Banner 通知条](/components/banner) — 通知条 / 活动条
- [Breadcrumb 面包屑](/components/breadcrumb) — 内页面包屑导航
