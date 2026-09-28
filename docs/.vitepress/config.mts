import { defineConfig } from 'vitepress'

// GitHub Pages 部署在 /<repo>/ 子路径下，需要设置 base；自定义域名时用 '/'。
// 本地开发与预览保持默认 '/'。
const base = process.env.DOCS_BASE ?? '/'

export default defineConfig({
  base,
  title: 'ChatFlow Blocks',
  description: '企业落地页区块组件库 — Vue 3 + TailwindCSS 4 + TypeScript',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: 'CLI 初始化', link: '/guide/cli' },
            { text: '自动导入', link: '/guide/auto-import' },
          ],
        },
        {
          text: '深入',
          items: [
            { text: '数据契约', link: '/guide/contracts' },
            { text: '区块风格', link: '/guide/tones' },
            { text: '主题定制', link: '/guide/theming' },
            { text: '深色模式', link: '/guide/dark-mode' },
            { text: '无障碍', link: '/guide/accessibility' },
          ],
        },
      ],

      '/components/': [
        {
          text: '总览',
          items: [{ text: '组件总览', link: '/components/' }],
        },
        {
          text: '布局 & 导航',
          collapsed: false,
          items: [
            { text: 'Navbar 导航栏', link: '/components/navbar' },
            { text: 'Banner 通知条', link: '/components/banner' },
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'Footer 页脚', link: '/components/footer' },
          ],
        },
        {
          text: 'Hero 类',
          collapsed: false,
          items: [
            { text: 'Hero 主视觉', link: '/components/hero' },
            { text: 'HeroBackground 背景图', link: '/components/hero-background' },
            { text: 'PageHeader 页头', link: '/components/page-header' },
          ],
        },
        {
          text: '内容区块',
          collapsed: false,
          items: [
            { text: 'Features 特性网格', link: '/components/features' },
            { text: 'Stats 数据统计', link: '/components/stats' },
            { text: 'IconWall 图标墙', link: '/components/icon-wall' },
            { text: 'Steps 步骤流程', link: '/components/steps' },
            { text: 'Timeline 发展历程', link: '/components/timeline' },
            { text: 'Video 视频区块', link: '/components/video' },
          ],
        },
        {
          text: '团队 & 客户',
          collapsed: false,
          items: [
            { text: 'Team 团队展示', link: '/components/team' },
            { text: 'Testimonials 客户证言', link: '/components/testimonials' },
            { text: 'Partners 合作伙伴', link: '/components/partners' },
            { text: 'LogoBar Logo 墙', link: '/components/logo-bar' },
          ],
        },
        {
          text: '图文组合',
          collapsed: false,
          items: [
            { text: 'ImageText 图文组合', link: '/components/image-text' },
            { text: 'TopImage 上文下图', link: '/components/top-image' },
          ],
        },
        {
          text: '列表类',
          collapsed: false,
          items: [
            { text: 'ProductList 产品列表', link: '/components/product-list' },
            { text: 'ProductDetail 产品详情', link: '/components/product-detail' },
            { text: 'ServiceList 服务列表', link: '/components/service-list' },
            { text: 'CourseList 课程列表', link: '/components/course-list' },
            { text: 'NewsList 资讯列表', link: '/components/news-list' },
            { text: 'NewsDetail 文章详情', link: '/components/news-detail' },
          ],
        },
        {
          text: '表格 & 定价',
          collapsed: false,
          items: [
            { text: 'Pricing 定价方案', link: '/components/pricing' },
            { text: 'ComparisonTable 对比表格', link: '/components/comparison-table' },
          ],
        },
        {
          text: '表单 & 互动',
          collapsed: false,
          items: [
            { text: 'ContactForm 联系表单', link: '/components/contact-form' },
            { text: 'CTA 行动号召', link: '/components/cta' },
            { text: 'FAQ 常见问题', link: '/components/faq' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chatflow/blocks' },
    ],

    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright © 2025 ChatFlow Blocks',
    },

    outline: [2, 3],
    search: {
      provider: 'local',
    },
  },
})
