# Navbar 导航栏

顶部导航（支持二级菜单）。

> 类型 `NavbarData` · 分类：布局 & 导航 · 源码 `packages/blocks/src/components/Navbar/`

## 基础用法

```vue
<script setup lang="ts">
import type { NavbarData } from '@zeldafox/blocks'

const navbar: NavbarData = {
  brand: 'ChatFlow',
  links: [
    {
      text: '产品',
      children: [
        { text: '即时通讯', link: '#', icon: '💬' },
        { text: '视频会议', link: '#', icon: '📹' },
        { text: 'AI 助手', link: '#', icon: '🤖' },
      ],
    },
    {
      text: '解决方案',
      children: [
        { text: '大型企业', link: '#', icon: '🏢' },
        { text: '初创团队', link: '#', icon: '🚀' },
      ],
    },
    { text: '价格', link: '#' },
  ],
  actions: [{ text: '开始免费试用', link: '#', primary: true }],
}
</script>

<template>
  <Navbar :data="navbar" />
</template>
```

## API

### `data: NavbarData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `brand` | `string` | 是 | — | 品牌名称 |
| `logo` | `[BlockImage](/guide/contracts#blockimage)` | 否 | — | Logo 图片 |
| `links` | `[BlockLink](/guide/contracts#blocklink)[]` | 否 | — | 导航链接（支持二级菜单） |
| `actions` | `[BlockAction](/guide/contracts#blockaction)[]` | 否 | — | 右侧 CTA 按钮 |

## 实现要点

- 使用语义化标签：`<header>`、`<nav>`
- 已标注无障碍属性：`aria-hidden`、`aria-label`
- 图片渲染 `alt`，符合 PRD 无障碍要求
- 内置 19 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [Banner 通知条](/components/banner) — 通知条 / 活动条
- [Breadcrumb 面包屑](/components/breadcrumb) — 内页面包屑导航
- [Footer 页脚](/components/footer) — 底部版权信息
