# Banner 通知条

通知条 / 活动条。

> 类型 `BannerData` · 分类：布局 & 导航 · 源码 `packages/blocks/src/components/Banner/`

## 基础用法

```vue
<script setup lang="ts">
import type { BannerData } from '@zeldafox/blocks'

const banner: BannerData = {
  text: '🎉 新产品上线：AI 助手现已支持智能摘要',
  action: { text: '了解更多', link: '#' },
  theme: 'primary',
}
</script>

<template>
  <Banner :data="banner" />
</template>
```

## API

### `data: BannerData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `text` | `string` | 是 | — | 横幅文字 |
| `icon` | `string` | 否 | — | 图标（Emoji） |
| `action` | `[BlockAction](/guide/contracts#blockaction)` | 否 | — | 右侧 CTA 按钮 |
| `theme` | `'primary' \| 'dark' \| 'light'` | 否 | `'primary'` | 主题 |

## 实现要点

- 响应式断点：`lg:`、`sm:`（Tailwind 默认断点）
- 字段缺失时使用内置默认值（如 `theme`），不会渲染空白

## 同类组件

- [Navbar 导航栏](/components/navbar) — 顶部导航（支持二级菜单）
- [Breadcrumb 面包屑](/components/breadcrumb) — 内页面包屑导航
- [Footer 页脚](/components/footer) — 底部版权信息
