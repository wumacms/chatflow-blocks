# 自动导入

30 个组件逐个 `import` 很繁琐。`@zeldafox/blocks` 内置 `ChatflowBlocksResolver`，配合 `unplugin-vue-components` 可按需引入——只打包你用到的组件，样式同步带入。

## 配置

安装插件：

```bash
pnpm add -D unplugin-vue-components
```

在 Vite 中加入 resolver：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ChatflowBlocksResolver } from '@zeldafox/blocks/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ChatflowBlocksResolver()],
    }),
  ],
})
```

之后模板里直接用组件名，**无需 import**：

```vue
<script setup lang="ts">
import type { HeroData } from '@zeldafox/blocks'  // 类型仍需显式引入

const hero: HeroData = { title: '你好' }
</script>

<template>
  <Navbar :data="navbar" />
  <Hero :data="hero" />
  <Footer :data="footer" />
</template>
```

::: tip 为什么类型还要引入
resolver 解决的是**运行时**组件的引入，`XxxData` 这类**类型**由 TypeScript 处理，必须显式 `import type`。
:::

## 选项

```ts
ChatflowBlocksResolver({
  prefix: 'Cf',        // 组件前缀，默认无前缀
  importStyle: true,   // 是否自动引入样式，默认 true
})
```

### prefix

给组件名加前缀，避免与你自己的同名组件冲突：

```vue
<template>
  <CfHero :data="hero" />
</template>
```

### importStyle

- `true`（默认）：每个被引入的组件自动附带 `@zeldafox/blocks/style.css`，无需手动引入
- `false`：关闭自动引入样式，适用于你已经全局引入过样式的情况

```ts
// main.ts（importStyle: false 时的替代做法）
import '@zeldafox/blocks/style.css'
```

## 匹配规则

resolver 只认 `COMPONENT_NAMES` 白名单里的 30 个名称（含 `prefix`），其余组件名一律放行给其他 resolver。这意味着：

- 误写组件名（如 `<Hreo>`）不会被静默处理，会按 Vue 原生的未知组件警告提示
- 与 Element Plus、Naive UI 等其他 resolver 可以共存

```ts
Components({
  resolvers: [
    ChatflowBlocksResolver({ prefix: 'Cf' }),
    ElementPlusResolver(),
  ],
})
```

## Webpack

`unplugin` 系插件支持多构建工具：

```js
// webpack.config.js
const Components = require('unplugin-vue-components/webpack')
const { ChatflowBlocksResolver } = require('@zeldafox/blocks/resolver')

module.exports = {
  plugins: [
    Components({ resolvers: [ChatflowBlocksResolver()] }),
  ],
}
```

> Nuxt 模块尚未内置，`npx @zeldafox/blocks init` 检测到 Nuxt 项目会提示手动配置，按本页配置 Nuxt 的 `vite.plugins` 即可。

## 其他接入方式

| 方式         | 写法                                            | 适用场景              |
| ------------ | ----------------------------------------------- | --------------------- |
| 自动导入     | `ChatflowBlocksResolver()`                      | 推荐，按需打包        |
| 手动引入     | `import { Hero } from '@zeldafox/blocks'`       | 局部使用              |
| 全量注册     | `app.use(ChatflowBlocks)`                       | Demo / 快速验证       |

```ts
// 全量注册
import { createApp } from 'vue'
import ChatflowBlocks from '@zeldafox/blocks'
import '@zeldafox/blocks/style.css'

createApp(App).use(ChatflowBlocks).mount('#app')
```
