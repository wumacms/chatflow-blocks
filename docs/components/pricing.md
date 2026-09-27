# Pricing 定价方案

定价方案对比。

> 类型 `PricingData` · 分类：表格 & 定价 · 源码 `packages/blocks/src/components/Pricing/`

## 基础用法

```vue
<script setup lang="ts">
import type { PricingData } from '@zeldafox/blocks'

const pricing: PricingData = {
  title: '灵活定价',
  description: '按需选择，无隐藏费用',
  plans: [
    {
      name: '基础版',
      price: '¥49',
      unit: '/月/人',
      features: '✓ 消息历史 1 年\n✓ 10GB 文件存储\n✓ 基础集成',
      button: { text: '选择基础版', link: '#' },
    },
    {
      name: '商业版',
      price: '¥99',
      unit: '/月/人',
      badge: '最受欢迎',
      primary: true,
      features: '✓ 无限历史\n✓ 100GB 存储\n✓ 所有集成 + API\n✓ 高级支持',
      button: { text: '选择商业版', link: '#', primary: true },
    },
    {
      name: '企业版',
      price: '定制',
      features: '✓ 本地部署选项\n✓ 无限存储\n✓ 专属客户成功\n✓ SSO/合规',
      button: { text: '联系销售', link: '#' },
    },
  ],
}
</script>

<template>
  <Pricing :data="pricing" />
</template>
```

## API

### `data: PricingData`

继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 否 | — | 区块标题 |
| `description` | `string` | 否 | — | 区块描述 |
| `plans` | `[PricingPlan](#pricingplan)[]` | 是 | — | 定价方案列表 |

### `PricingPlan`

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | `string` | 是 | — | 方案名称，如 '专业版' |
| `price` | `string` | 是 | — | 价格，如 '¥99' |
| `unit` | `string` | 否 | — | 价格单位，如 '/月' |
| `features` | `string` | 是 | — | 权益清单，每行一条，换行分隔 |
| `button` | `[BlockAction](/guide/contracts#blockaction)` | 是 | — | 方案按钮 |
| `badge` | `string` | 否 | — | 卡片角标文字，如 '最受欢迎' |
| `primary` | `boolean` | 否 | — | 是否高亮为主推方案 |

## 实现要点

- 使用语义化标签：`<section>`
- 内置 12 处 `dark:` 适配，无需额外配置即可跟随深色模式
- 响应式断点：`lg:`、`md:`、`sm:`（Tailwind 默认断点）

## 同类组件

- [ComparisonTable 对比表格](/components/comparison-table) — 竞品对比表格
