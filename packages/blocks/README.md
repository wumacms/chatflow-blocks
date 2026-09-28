# @zeldafox/blocks

> 企业落地页区块组件库 · Vue 3 + TailwindCSS 4 + TypeScript
> **一个组件 = 一个对象 = 一个区块。零配置，五分钟搭好企业落地页。**

## 特性

| 特性          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| **零配置**    | `npx @zeldafox/blocks init` 一条命令写完 Vite 配置与样式引入 |
| **零 import** | 内置 `unplugin-vue-components` 解析器，模板里直接用组件名    |
| **单一对象**  | 每个组件只有 `data` 一个 prop，天然 JSON 驱动，可存库下发    |
| **双主题**    | 30 个组件全部内置 `dark:` 适配，切换 `html.dark` 即生效      |
| **强类型**    | 每个组件对应一个 `XxxData` 接口，单一 `index.d.ts` 全量导出  |
| **按需打包**  | ESM + CJS 双产物，Tree-shaking 友好，样式已预编译            |

## 环境要求

- **Vue >= 3.4**（peerDependency）
- **无需安装 Tailwind**：样式已预编译为 `dist/style.css`，直接引入即可

## 安装

```bash
pnpm add @zeldafox/blocks
npx @zeldafox/blocks init
```

`init` 会检测项目类型（Vite / Nuxt），改写 `vite.config.ts` 并在 `src/main.ts` 顶部引入样式。
命令幂等，重复执行不会重复写入。详见下方 [CLI 初始化](#cli-初始化)。

也可用 npm / yarn / pnpm dlx 调用：

```bash
npm i @zeldafox/blocks && npx @zeldafox/blocks init
pnpm dlx @zeldafox/blocks init
```

## 快速上手

```vue
<script setup lang="ts">
import type { HeroData, FeaturesData } from '@zeldafox/blocks'

const hero: HeroData = {
  title: '让每个想法都发光',
  description: '五分钟搭好企业落地页。',
  actions: [
    { text: '免费开始', link: '/signup' },
    { text: '查看文档', link: '/docs' },
  ],
  image: { src: '/hero.png', alt: '产品截图' },
}

const features: FeaturesData = {
  title: '核心能力',
  columns: 4,
  items: [
    { icon: '⚡', title: '极速', description: '零配置，开箱即用' },
    { icon: '🎨', title: '统一', description: '一致的设计语言' },
  ],
}
</script>

<template>
  <Navbar :data="navbar" />
  <Hero :data="hero" />
  <Features :data="features" />
  <Footer :data="footer" />
</template>
```

组件名即文件名，无需 import；`XxxData` 是类型，需要显式 `import type`。

## 四种接入方式

| 方式            | 写法                                      | 适用场景           |
| --------------- | ----------------------------------------- | ------------------ |
| **CLI（推荐）** | `npx @zeldafox/blocks init`               | 标准 Vite 项目     |
| **自动导入**    | `ChatflowBlocksResolver()`                | 按需打包，推荐     |
| **手动引入**    | `import { Hero } from '@zeldafox/blocks'` | 局部使用、特殊构建 |
| **全量注册**    | `app.use(ChatflowBlocks)`                 | Demo / 快速验证    |

### CLI 初始化

在项目根目录执行，按顺序完成三步：

1. 检测项目类型 —— 查找 `vite.config.ts|js` 或 `nuxt.config.ts|js`
2. 改写 Vite 配置 —— 插入 `Components` 插件与 `ChatflowBlocksResolver`
3. 引入样式 —— 在 `src/main.ts|js` 顶部加入 `import '@zeldafox/blocks/style.css'`

```diff
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
+ import Components from 'unplugin-vue-components/vite'
+ import { ChatflowBlocksResolver } from '@zeldafox/blocks/resolver'

  export default defineConfig({
-   plugins: [vue()],
+   plugins: [
+     vue(),
+     Components({ resolvers: [ChatflowBlocksResolver()] }),
+   ],
  })
```

> CLI 做的是字符串插入，建议执行前先提交一次 Git，方便 diff 与回滚。

### 自动导入

```bash
pnpm add -D unplugin-vue-components
```

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ChatflowBlocksResolver } from '@zeldafox/blocks/resolver'

export default defineConfig({
  plugins: [vue(), Components({ resolvers: [ChatflowBlocksResolver()] })],
})
```

可用选项：

| 选项          | 默认值 | 说明                                                      |
| ------------- | ------ | --------------------------------------------------------- |
| `prefix`      | `''`   | 组件前缀，如 `'Cf'` → `<CfHero>`，避免与自有组件重名      |
| `importStyle` | `true` | 自动附带 `@zeldafox/blocks/style.css`；全局引过样式可关掉 |

resolver 只匹配内置的 30 个组件名，其余名称放行给其他 resolver，可与 Element Plus 等共存。
Webpack 用 `unplugin-vue-components/webpack`，Nuxt 配到 `nuxt.config.ts` 的 `vite.plugins`。

### 手动引入 / 全量注册

```ts
// 手动引入
import { Hero, Features } from '@zeldafox/blocks'
import '@zeldafox/blocks/style.css'

// 全量注册
import { createApp } from 'vue'
import ChatflowBlocks from '@zeldafox/blocks'
import '@zeldafox/blocks/style.css'

createApp(App).use(ChatflowBlocks).mount('#app')
```

## 组件清单（30 个）

### 布局 & 导航

| 组件         | 类型             | 用途                     |
| ------------ | ---------------- | ------------------------ |
| `Navbar`     | `NavbarData`     | 顶部导航（支持二级菜单） |
| `Banner`     | `BannerData`     | 通知条 / 活动条          |
| `Breadcrumb` | `BreadcrumbData` | 内页面包屑导航           |
| `Footer`     | `FooterData`     | 底部版权信息             |

### Hero 类

| 组件             | 类型                 | 用途            |
| ---------------- | -------------------- | --------------- |
| `Hero`           | `HeroData`           | 首页主视觉      |
| `HeroBackground` | `HeroBackgroundData` | 全屏背景图 Hero |
| `PageHeader`     | `PageHeaderData`     | 内页标题区域    |

### 内容区块

| 组件       | 类型           | 用途          |
| ---------- | -------------- | ------------- |
| `Features` | `FeaturesData` | 产品特性网格  |
| `Stats`    | `StatsData`    | 数字统计      |
| `IconWall` | `IconWallData` | 功能图标网格  |
| `Steps`    | `StepsData`    | 三步走 / 流程 |
| `Timeline` | `TimelineData` | 发展历程      |
| `Video`    | `VideoData`    | 视频播放      |

### 团队 & 客户

| 组件           | 类型               | 用途          |
| -------------- | ------------------ | ------------- |
| `Team`         | `TeamData`         | 团队成员      |
| `Testimonials` | `TestimonialsData` | 客户证言      |
| `Partners`     | `PartnersData`     | 合作企业 Logo |
| `LogoBar`      | `LogoBarData`      | 轻量 Logo 墙  |

### 图文组合

| 组件        | 类型            | 用途                |
| ----------- | --------------- | ------------------- |
| `ImageText` | `ImageTextData` | 左图右文 / 左文右图 |
| `TopImage`  | `TopImageData`  | 上文下图            |

### 列表类

| 组件            | 类型                | 用途         |
| --------------- | ------------------- | ------------ |
| `ProductList`   | `ProductListData`   | 产品卡片列表 |
| `ProductDetail` | `ProductDetailData` | 单品深度介绍 |
| `ServiceList`   | `ServiceListData`   | 服务卡片列表 |
| `CourseList`    | `CourseListData`    | 课程卡片列表 |
| `NewsList`      | `NewsListData`      | 资讯卡片列表 |
| `NewsDetail`    | `NewsDetailData`    | 文章详情     |

### 表格 & 定价

| 组件              | 类型                  | 用途         |
| ----------------- | --------------------- | ------------ |
| `Pricing`         | `PricingData`         | 定价方案对比 |
| `ComparisonTable` | `ComparisonTableData` | 竞品对比表格 |

### 表单 & 互动

| 组件          | 类型              | 用途     |
| ------------- | ----------------- | -------- |
| `ContactForm` | `ContactFormData` | 表单收集 |
| `CTA`         | `CTAData`         | 行动号召 |
| `FAQ`         | `FAQData`         | 问答列表 |

典型落地页的区块顺序：

```
Banner → Navbar → Hero → Features → Stats → ImageText
→ Testimonials → Pricing → ComparisonTable → FAQ → CTA → ContactForm → Footer
```

内页推荐：`Navbar → Breadcrumb → PageHeader（或 NewsDetail / ProductDetail）→ Footer`

## 数据契约

五个跨组件复用的类型，学会一次，30 个组件通用：

| 类型          | 字段                                                | 说明                     |
| ------------- | --------------------------------------------------- | ------------------------ |
| `BlockAction` | `text` / `link` / `primary` / `newWindow`           | 按钮，首个按钮默认主按钮 |
| `BlockImage`  | `src` / `alt`                                       | 图片，`alt` 用于无障碍   |
| `BlockTag`    | `text` / `color`                                    | 标签，10 种预设色        |
| `BlockLink`   | `text` / `link` / `icon` / `newWindow` / `children` | 导航与页脚链接           |
| `BlockBase`   | `id` / `class`                                      | 所有 `XxxData` 均继承    |

### 默认值约定

组件内部用 `{ ...默认值, ...props.data }` 合并（即导出的 `useMergedData`），因此**只传要改的字段**即可：

```ts
const hero: HeroData = { title: '你好' } // 其余字段走内置默认值
```

自己封装区块时可直接复用：

```ts
const d = useMergedData(props.data, { variant: 'default', align: 'center' })
```

### 一个完整区块示例

```ts
import type { NavbarData } from '@zeldafox/blocks'

const navbar: NavbarData = {
  brand: 'Acme',
  logo: { src: '/logo.svg', alt: 'Acme' },
  links: [
    { text: '产品', link: '/products' },
    {
      text: '解决方案',
      children: [
        { text: '电商', link: '/solutions/ecommerce' },
        { text: '教育', link: '/solutions/education' },
      ],
      menuWidth: 'w-64',
    },
  ],
  actions: [{ text: '免费试用', link: '/signup' }],
}
```

## 主题定制

视觉变量全部通过 CSS 变量暴露，在组件库样式**之后**覆盖即可：

```css
:root {
  --cf-primary: #0ea5e9;
  --cf-primary-hover: #0284c7;
  --cf-primary-light: #eef2ff;

  --cf-radius: 1rem;
  --cf-radius-sm: 0.5rem;
  --cf-radius-lg: 1.5rem;

  --cf-shadow: 0 10px 40px -10px rgb(0 0 0 / 0.1);
}

.dark {
  --cf-primary-light: #0c2340;
}
```

每个区块的 `data` 还支持 `class` 字段，可追加 Tailwind 类名做局部调整：

```ts
const hero: HeroData = { title: 'Hello', class: 'py-32' }
```

## 深色模式

组件用 TailwindCSS 4 的 `dark:` 前缀配合 class 策略实现，切换 `<html class="dark">` 即全量生效。

```vue
<script setup lang="ts">
import { useTheme } from '@zeldafox/blocks'

const { isDark, toggleDark } = useTheme()
</script>

<template>
  <button @click="toggleDark()">{{ isDark ? '切换浅色' : '切换深色' }}</button>
</template>
```

`useTheme` 基于 `@vueuse/core` 的 `useDark`，状态持久化在 `localStorage`，默认 key 为 `chatflow-theme`，可通过 `useTheme({ storageKey: 'my-theme' })` 修改。

避免首屏闪烁，在 `<head>` 里同步执行：

```html
<script>
  const saved = localStorage.getItem('chatflow-theme')
  const dark =
    saved === 'true' ||
    (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
</script>
```

## 导出

| 子路径                       | 内容                                                                  |
| ---------------------------- | --------------------------------------------------------------------- |
| `@zeldafox/blocks`           | 30 个组件、全部类型、`useTheme` / `useMergedData`、`cn`、默认导出插件 |
| `@zeldafox/blocks/resolver`  | `ChatflowBlocksResolver` 及其选项类型                                 |
| `@zeldafox/blocks/style.css` | 预编译样式（Tailwind 产物，无需额外配置）                             |

```ts
import { Hero, useTheme, cn } from '@zeldafox/blocks'
import type { HeroData, BlockAction } from '@zeldafox/blocks'
import ChatflowBlocks from '@zeldafox/blocks' // 默认导出：Vue 插件
import { ChatflowBlocksResolver } from '@zeldafox/blocks/resolver'
```

## 常见问题

**样式没生效？**
确认 `@zeldafox/blocks/style.css` 已被引入（CLI 会自动写入 `src/main.ts`）。
若 resolver 设为 `importStyle: false`，需要自己全局引入一次。

**模板报 "Failed to resolve component"？**
resolver 只匹配 30 个内置名称，检查是否拼错；若用了 `prefix`，模板里要带前缀（如 `<CfHero>`）。

**Nuxt 项目能用吗？**
能。`init` 检测到 Nuxt 会提示手动配置，把 `Components({ resolvers: [ChatflowBlocksResolver()] })` 配到 `nuxt.config.ts` 的 `vite.plugins` 即可。

**同页能放两个 Hero 吗？**
不建议。`Hero` / `HeroBackground` / `PageHeader` / `NewsDetail` / `ProductDetail` 都会渲染 `<h1>`，一页应只保留一个。

**组件数据能来自后端吗？**
可以。`data` 是纯 JSON 结构，直接把接口返回的对象塞进去即可，配合 `useMergedData` 可合并默认值。

## 相关链接

- npm：[@zeldafox/blocks](https://www.npmjs.com/package/@zeldafox/blocks)
- 文档站：https://wumacms.github.io/chatflow-blocks/
- 仓库：https://github.com/wumacms/chatflow-blocks

## 许可

MIT
