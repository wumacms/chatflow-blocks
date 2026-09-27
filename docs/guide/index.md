# 快速开始

## 安装

```bash
pnpm add @zeldafox/blocks
npx @zeldafox/blocks init
```

`init` 会自动检测项目类型（Vite / Nuxt / Vue CLI），写入 `vite.config.ts` 配置，并在入口文件引入样式。命令是幂等的，重复执行不会报错。详见 [CLI 初始化](./cli)。

## 使用

```vue
<script setup lang="ts">
import type { HeroData, FeaturesData } from '@zeldafox/blocks'

const hero: HeroData = {
  title: '让每个想法都发光',
  description: 'ChatFlow Blocks 帮你五分钟搭好企业落地页。',
  actions: [
    { text: '免费开始', link: '/signup' },
    { text: '查看文档', link: '/docs' },
  ],
  image: { src: '/hero.png', alt: '产品截图' },
}

const features: FeaturesData = {
  title: '核心能力',
  items: [
    { icon: '⚡', title: '极速', description: '零配置，开箱即用' },
    { icon: '🎨', title: '统一', description: '一致的设计语言' },
  ],
  columns: 4,
}
</script>

<template>
  <Navbar :data="navbar" />
  <Hero :data="hero" />
  <Features :data="features" />
  <Footer :data="footer" />
</template>
```

## 三种接入方式

| 方式            | 适用场景            | 复杂度 |
| --------------- | ------------------- | ------ |
| **CLI（推荐）** | 标准 Vite 项目      | 最简单 |
| **自动导入**    | 手动配 resolver     | 简单   |
| **手动引入**    | 局部使用 / 特殊项目 | 稍复杂 |

### 自动导入

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ChatflowBlocksResolver } from '@zeldafox/blocks/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [ChatflowBlocksResolver()] }),
  ],
})
```

更多选项（组件前缀、样式按需）见 [自动导入](./auto-import)。

### 手动引入

```vue
<script setup lang="ts">
import { Hero } from '@zeldafox/blocks'
</script>
```

### 全量注册

```ts
import { createApp } from 'vue'
import ChatflowBlocks from '@zeldafox/blocks'
import '@zeldafox/blocks/style.css'

createApp(App).use(ChatflowBlocks).mount('#app')
```

## 下一步

| 页面                        | 你会学到                                              |
| --------------------------- | ----------------------------------------------------- |
| [CLI 初始化](./cli)         | `init` 具体改了哪些文件、幂等规则、不支持时的兜底方案 |
| [自动导入](./auto-import)   | resolver 的 `prefix` / `importStyle` 选项、Webpack 配置 |
| [数据契约](./contracts)     | `BlockAction` 等 5 个通用类型，以及旧 Schema 的映射表  |
| [主题定制](./theming)       | CSS 变量覆盖品牌色、圆角、阴影                         |
| [深色模式](./dark-mode)     | `useTheme()` 与 `dark` class 的接入方式                |
| [无障碍](./accessibility)   | 组件已实现的无障碍能力与编写内容时的注意点             |
| [组件总览](../components/)  | 30 个区块的分类清单与组合建议                          |
