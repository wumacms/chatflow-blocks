# 更新日志

本项目遵循 [Semantic Versioning](https://semver.org/)。

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
