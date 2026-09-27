# ChatFlow Blocks

> 企业落地页区块组件库 — Vue 3 + TailwindCSS 4 + TypeScript
> **一个组件 = 一个对象 = 一个区块。零配置，五分钟搭建企业落地页。**

## 特性

| 特性           | 说明                                            |
| -------------- | ----------------------------------------------- |
| **零配置**     | `npx @chatflow/blocks init` 一条命令完成所有配置 |
| **零 import**  | 提供 `unplugin-vue-components` 解析器，自动导入 |
| **零前缀**     | 直接用 `<Hero>`，而不是 `<CfHero>`              |
| **单一对象**   | 每个组件只有 `data` 一个 prop，天然 JSON 驱动   |
| **双主题**     | 30 个组件全部自动适配浅色 / 深色模式            |
| **强类型**     | 每个组件对应一个 `XxxData` 接口                 |

## 安装

```bash
pnpm add @chatflow/blocks
npx @chatflow/blocks init
```

## 使用

```vue
<script setup lang="ts">
import type { HeroData } from '@chatflow/blocks'

const hero: HeroData = {
  title: '让每个想法都发光',
  description: '五分钟搭好企业落地页。',
  actions: [{ text: '免费开始', link: '/signup' }],
}
</script>

<template>
  <Navbar :data="navbar" />
  <Hero :data="hero" />
  <Features :data="features" />
  <Footer :data="footer" />
</template>
```

## 组件清单（30 个）

| 分类            | 组件                                                                       |
| --------------- | -------------------------------------------------------------------------- |
| **布局 & 导航** | `Navbar` `Banner` `Breadcrumb` `Footer`                                    |
| **Hero 类**     | `Hero` `HeroBackground` `PageHeader`                                       |
| **内容区块**    | `Features` `Stats` `IconWall` `Steps` `Timeline` `Video`                   |
| **团队 & 客户** | `Team` `Testimonials` `Partners` `LogoBar`                                 |
| **图文组合**    | `ImageText` `TopImage`                                                     |
| **列表类**      | `ProductList` `ProductDetail` `ServiceList` `CourseList` `NewsList` `NewsDetail` |
| **表格 & 定价** | `Pricing` `ComparisonTable`                                                |
| **表单 & 互动** | `ContactForm` `CTA` `FAQ`                                                  |

## 目录结构

```
chatflow-blocks/
├── packages/blocks/     # 组件库主包 @chatflow/blocks
│   ├── src/components/  # 30 个区块组件
│   ├── src/composables/ # useTheme、useMergedData
│   ├── src/utils/       # cn、normalize
│   ├── src/types/       # 通用类型契约
│   ├── src/styles/      # Tailwind 4 入口 + 主题变量
│   └── bin/init.js      # CLI 初始化工具
├── docs/                # VitePress 文档站点
└── playground/          # 开发调试环境
```

## 开发

```bash
pnpm install
pnpm dev        # 启动 playground
pnpm build      # 构建组件库
pnpm test       # 单元测试
pnpm typecheck  # 类型检查
pnpm lint       # ESLint
pnpm docs:dev   # 本地文档
pnpm docs:gen   # 从源码重新生成组件文档页
```

## 发布

### 发布到 npm

一次性准备：

1. 在 npmjs.com 创建 **Automation / Granular Access Token**（只需 `Read and write` 范围的 publish 权限）
2. 在仓库 Settings → Secrets and variables → Actions 添加 `NPM_TOKEN`

每次发布：

```bash
git switch main && git pull
pnpm install --frozen-lockfile
pnpm --filter @chatflow/blocks test      # 确保通过
```

升版本并打 tag（`--no-git-tag-version` 只改 `version` 字段，tag 由我们显式创建，避免 pnpm/npm 生成的 tag 名不确定）：

```bash
VERSION=$(node -p "require('./packages/blocks/package.json').version")
# 或升版本：pnpm --filter @chatflow/blocks version patch --no-git-tag-version
git add -A && git commit -m "chore: release v$VERSION"
git tag "v$VERSION"
git push && git push --tags              # 推送 tag 触发 .github/workflows/publish.yml
```

工作流会完成：校验 tag 与 `version` 一致 → typecheck → test → build → `npm pack` 预演 → `pnpm publish --access public --provenance`。

带 `--provenance` 的包在 npm 上会显示来源构建信息，需要仓库具备 `id-token: write` 权限（已在 workflow 中配置）。

本地验证将要发布的文件清单：

```bash
pnpm --filter @chatflow/blocks pack --pack-destination /tmp   # 产出 tgz，可解压检查
```

> `@chatflow/blocks` 是 scope 包，`--access public` 必需，否则发布后只有自己可见。

### 文档发布到 GitHub Pages

首次配置：

1. 仓库 Settings → Pages → Source 选 **GitHub Actions**（不启用会导致 `deploy-pages` 报 "Get Pages site failed"）
2. 推送 main 分支即触发 `.github/workflows/deploy-docs.yml`；也可手动 Run workflow
3. 若使用自定义域名：仓库变量 `CUSTOM_DOMAIN` 填入域名，并添加一条 CNAME 记录指向 `<user>.github.io`

关键约定：文档部署在 `https://<user>.github.io/<repo>/` 子路径下，VitePress 的 `base` 由环境变量注入 ——

```
docs/.vitepress/config.mts  →  const base = process.env.DOCS_BASE ?? '/'
```

工作流按 `vars.CUSTOM_DOMAIN` 是否有值决定注入 `/<repo>/` 还是 `/`。本地复现 Pages 构建：

```bash
DOCS_BASE=/chatflow-blocks/ pnpm docs:build
```

## 许可

MIT
