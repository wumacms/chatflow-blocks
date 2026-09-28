# 更新日志

本项目遵循 [Semantic Versioning](https://semver.org/)。

## 1.1.0

### 新增

- **区块多风格（variant × tone）**：数据结构不变，靠参数切换外观
  - `HeroData` 新增 `variant`（结构：`centered` / `split` / `background`）与
    `tone`（皮肤：`classic` / `brutal` / `amber`）两个字面量联合字段，旧值 `'default'` 继续可用
  - 新增 `--cf-hero-*` 语义变量（`src/styles/tones/hero.css`），新增一种皮肤只需加一段变量块，
    改 `.vue` 文件数为 0；各变体除判空外零 `v-if`
  - 三种结构变体：`HeroCentered`（居中大图）、`HeroSplit`（左右分栏）、`HeroBackground`（背景图 + 遮罩）
  - 三种皮肤：`classic`（白底渐变 + 品牌色）、`brutal`（新粗野主义）、`amber`（锌灰渐变 + 琥珀强调）
  - 标题局部高亮使用语义化 `<mark>`，外观由 tone 决定（classic 无感 / brutal 色块 / amber 强调色文字）
  - 新增 `heroRegistry` / `resolveHeroComponent` / `useHeroData` / `normalizeVariant` / `normalizeTone` 导出
- **文档**：新增《区块风格》指南页，说明 variant 与 tone 的职责划分与自定义方式

### 变更

- Hero 拆分为调度器 + `variants/HeroCentered.vue` + `variants/HeroBackground.vue`，
  归一化逻辑统一收口到 `useHeroData`（原先是组件内各写一个 `computed`）
- Hero 主按钮改为消费 `var(--cf-primary)`，此前硬编码 `indigo-600`，
  导致《主题定制》承诺的「覆盖变量即生效」实际不生效

### 视觉校准（会影响存量页面）

- Hero 间距 `py-16 md:py-24` → `pt-16 pb-20`
- `bg-gradient-to-b` → `bg-linear-to-b`（Tailwind 4 新写法，旧写法已废弃）
- Hero 主按钮补齐 `dark:bg-indigo-500 dark:hover:bg-indigo-600`
- Hero 描述深色值 `dark:text-gray-300` → `dark:text-gray-400`，section 补 `antialiased` 与前景色

## 1.0.1

### 文档

- 重写 `packages/blocks/README.md`：补齐安装、四种接入方式、30 个组件清单（含类型名与用途）、
  数据契约、主题定制、深色模式、导出子路径与常见问题
- 修正示例字段与源码不一致处（`NavbarData.brand` 为字符串，`BlockTag` 预设色为 10 种）

## 1.0.0

### 新增

- **30 个区块组件**：Navbar、Banner、Breadcrumb、Footer、Hero、HeroBackground、PageHeader、Features、Stats、IconWall、Steps、Timeline、Video、Team、Testimonials、Partners、LogoBar、ImageText、TopImage、ProductList、ProductDetail、ServiceList、CourseList、NewsList、NewsDetail、Pricing、ComparisonTable、ContactForm、CTA、FAQ
- **类型系统**：每个组件对应一个 `XxxData` 接口，全部继承 `BlockBase`，统一生成单一 `dist/index.d.ts`
- **双主题**：基于 TailwindCSS 4 的 `dark:` 前缀 + class 策略，提供 `useTheme` composable
- **自动导入**：`ChatflowBlocksResolver`（`unplugin-vue-components` 解析器），支持前缀与样式按需引入
- **CLI 工具**：`npx @zeldafox/blocks init` 自动写入 Vite 配置并引入样式，幂等可重复执行
- **预编译样式**：`dist/style.css`，用户无需配置 Tailwind
- **Vue 插件**：`app.use(ChatflowBlocks)` 全量注册
- **VitePress 文档**与 playground 演示环境

### 构建产物

| 产物               | 说明           |
| ------------------ | -------------- |
| `dist/index.js`    | ESM 入口       |
| `dist/index.cjs`   | CJS 入口       |
| `dist/index.d.ts`  | 类型声明       |
| `dist/resolver.js` | 自动导入解析器 |
| `dist/style.css`   | 预编译样式     |
