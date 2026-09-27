<script setup lang="ts">
import { useTheme } from '@chatflow/blocks'
import type {
  NavbarData,
  BannerData,
  HeroData,
  HeroBackgroundData,
  FeaturesData,
  IconWallData,
  StatsData,
  StepsData,
  TimelineData,
  VideoData,
  TeamData,
  TestimonialsData,
  PartnersData,
  PricingData,
  ComparisonTableData,
  FAQData,
  ImageTextData,
  TopImageData,
  ProductListData,
  ProductDetailData,
  ServiceListData,
  CourseListData,
  NewsListData,
  NewsDetailData,
  ContactFormData,
  CTAData,
  LogoBarData,
  PageHeaderData,
  BreadcrumbData,
  FooterData,
} from '@chatflow/blocks'

const { isDark, toggleDark } = useTheme()

/* ============ Banner ============ */
const banner: BannerData = {
  text: '🎉 新产品上线：AI 助手现已支持智能摘要',
  action: { text: '了解更多', link: '#' },
  theme: 'primary',
}

/* ============ Navbar ============ */
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

/* ============ Hero ============ */
const hero: HeroData = {
  title: '企业级即时通讯<br>让协作更快一步',
  description: '安全、高效、可定制——专为现代企业打造的智能聊天平台。',
  actions: [
    { text: '开始免费试用', link: '#', primary: true },
    { text: '联系销售', link: '#' },
  ],
  image: {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=60',
    alt: '界面截图',
  },
}

/* ============ HeroBackground ============ */
const heroBg: HeroBackgroundData = {
  title: '企业级即时通讯<br>让协作更快一步',
  description: '安全、高效、可定制。',
  actions: [
    { text: '开始免费试用', link: '#', primary: true },
    { text: '联系销售', link: '#' },
  ],
  bgImage: {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80',
    alt: '团队协作',
  },
  overlayOpacity: 50,
}

/* ============ Features ============ */
const features: FeaturesData = {
  title: '专为商务打造的特性',
  description: '从安全到效率，面面俱到',
  columns: 4,
  items: [
    { icon: '🔒', title: '企业级安全', description: '端到端加密、SSO、DLP 策略。' },
    { icon: '⚡', title: '实时同步', description: '毫秒级延迟，跨设备已读回执。' },
    { icon: '🧩', title: '无限集成', description: '连接 200+ 企业应用。' },
    { icon: '📊', title: '分析洞察', description: '团队活跃度数据可视化。' },
  ],
}

/* ============ IconWall ============ */
const iconWall: IconWallData = {
  title: '一个平台，覆盖全部场景',
  description: '按需组合，灵活扩展',
  items: [
    { icon: '💬', title: '即时通讯', description: '单聊、群聊、频道' },
    { icon: '📹', title: '视频会议', description: '千人在线，屏幕共享' },
    { icon: '📁', title: '云端盘', description: '文件协作与版本管理' },
    { icon: '🤖', title: 'AI 助手', description: '智能摘要与自动待办' },
    { icon: '🔔', title: '消息推送', description: '多端一致，实时触达' },
    { icon: '🛡️', title: '安全管理', description: '审计日志与合规留存' },
  ],
}

/* ============ Stats ============ */
const stats: StatsData = {
  theme: 'primary',
  items: [
    { value: '500+', label: '企业客户' },
    { value: '98%', label: '客户留存率' },
    { value: '20M+', label: '日消息量' },
    { value: '24/7', label: '技术支持' },
  ],
}

/* ============ Steps ============ */
const steps: StepsData = {
  title: '三步开启高效协作',
  description: '简单快捷，即刻上手',
  items: [
    { number: '1', title: '注册账号', description: '30 秒完成注册，无需信用卡。' },
    { number: '2', title: '邀请团队', description: '一键邀请成员，自动同步企业目录。' },
    { number: '3', title: '开始协作', description: '创建频道、发起会议，即刻开始。' },
  ],
}

/* ============ Timeline ============ */
const timeline: TimelineData = {
  title: '发展历程',
  description: '从 2020 到 2025，一路走来',
  items: [
    { time: '2020', title: '公司成立', description: '创始团队成立，开始研发。' },
    { time: '2022', title: '产品上线', description: 'ChatFlow 1.0 正式发布。' },
    { time: '2024', title: 'AI 助手', description: '集成大语言模型能力。' },
    { time: '2025', title: '全球化', description: '服务覆盖 30+ 国家。' },
  ],
}

/* ============ Video ============ */
const video: VideoData = {
  title: '产品演示',
  description: '3 分钟了解 ChatFlow 核心能力',
  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  type: 'video',
}

/* ============ Team ============ */
const team: TeamData = {
  title: '核心团队',
  description: '来自全球顶尖企业的协作专家',
  members: [
    { name: '张伟', role: 'CEO & 创始人', avatar: { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop' } },
    { name: '陈敏', role: 'CTO', avatar: { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' } },
    { name: '王磊', role: '产品总监', avatar: { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' } },
    { name: '李莉', role: '设计负责人', avatar: { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop' } },
  ],
}

/* ============ Testimonials ============ */
const testimonials: TestimonialsData = {
  title: '客户心声',
  description: '来自全球团队的信任与反馈',
  items: [
    {
      quote: 'ChatFlow 彻底改变了我们团队的沟通方式。',
      name: '赵明远',
      position: '技术总监',
      company: '云创科技',
      avatar: { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    },
    {
      quote: '安全性和集成能力是我们选择 ChatFlow 的关键。',
      name: '陈雅文',
      position: '运营副总裁',
      company: '海纳集团',
      avatar: { src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop' },
    },
    {
      quote: '非常直观的界面，员工上手几乎没有学习成本。',
      name: '王景行',
      position: '产品负责人',
      company: '极客工坊',
      avatar: { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    },
  ],
}

/* ============ Partners ============ */
const partners: PartnersData = {
  title: '我们的合作伙伴',
  description: '全球领先的创新企业信赖之选',
  items: [
    { name: 'Airbnb', logo: { src: 'https://picsum.photos/seed/airbnb/120/40' } },
    { name: 'Notion', logo: { src: 'https://picsum.photos/seed/notion/120/40' } },
    { name: 'Loom', logo: { src: 'https://picsum.photos/seed/loom/120/40' } },
    { name: 'Figma', logo: { src: 'https://picsum.photos/seed/figma/120/40' } },
    { name: 'Vercel', logo: { src: 'https://picsum.photos/seed/vercel/120/40' } },
    { name: 'Linear', logo: { src: 'https://picsum.photos/seed/linear/120/40' } },
  ],
}

/* ============ LogoBar ============ */
const logoBar: LogoBarData = {
  items: [
    { name: 'Google', logo: { src: 'https://picsum.photos/seed/google/120/40' } },
    { name: 'Microsoft', logo: { src: 'https://picsum.photos/seed/ms/120/40' } },
    { name: 'Amazon', logo: { src: 'https://picsum.photos/seed/amazon/120/40' } },
    { name: 'Meta', logo: { src: 'https://picsum.photos/seed/meta/120/40' } },
  ],
}

/* ============ ImageText ============ */
const imageText: ImageTextData = {
  title: '无缝沟通，跨越部门',
  description: '打破信息孤岛，通过话题群组、私聊和富媒体分享，让每个人都能快速找到所需信息。',
  image: {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=60',
    alt: '团队沟通',
  },
  tags: ['✓ 端到端加密', '✓ 无限历史记录'],
  imagePosition: 'left',
}

/* ============ TopImage ============ */
const topImage: TopImageData = {
  title: '全平台一致体验',
  description: '无论是在桌面、网页还是移动端，消息实时同步。',
  image: {
    src: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&q=60',
    alt: '多设备',
  },
}

/* ============ ProductList ============ */
const productList: ProductListData = {
  title: '我们的产品',
  description: '为企业打造的智能协作工具矩阵',
  items: [
    {
      title: '即时通讯',
      description: '企业级实时消息系统，消息历史永久保存。',
      image: { src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=60' },
      tags: ['端到端加密', '已读回执'],
      badge: '热门',
      link: '#',
    },
    {
      title: '视频会议',
      description: '高清音视频通话，最多容纳 500 人。',
      image: { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=60' },
      tags: ['1080p', 'AI 降噪'],
      link: '#',
    },
    {
      title: 'AI 智能助手',
      description: '自动生成会议纪要、消息摘要。',
      image: { src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=60' },
      tags: ['智能摘要', '多语言'],
      badge: '新品',
      badgeColor: 'bg-emerald-500',
      link: '#',
    },
  ],
}

/* ============ ProductDetail ============ */
const productDetail: ProductDetailData = {
  name: 'AI 智能助手',
  tagline: '让 AI 成为团队的生产力伙伴',
  description: '基于大语言模型，自动生成会议纪要、消息摘要、待办事项，提升团队效率。',
  image: {
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=60',
    alt: 'AI 助手界面',
  },
  tags: [
    { text: '新品', color: 'emerald' },
    { text: '热门', color: 'orange' },
  ],
  actions: [
    { text: '免费试用', link: '#', primary: true },
    { text: '观看演示', link: '#' },
  ],
  features: [
    { icon: '📝', title: '智能摘要', description: '自动生成会议纪要与消息摘要。' },
    { icon: '✅', title: '待办提取', description: '从对话中自动提取待办事项。' },
    { icon: '🌐', title: '多语言', description: '支持中英日韩等 10+ 语言。' },
  ],
}

/* ============ ServiceList ============ */
const serviceList: ServiceListData = {
  title: '我们的服务',
  description: '从咨询到落地，全链路助力企业数字化升级',
  items: [
    {
      icon: '📋',
      title: '咨询与规划',
      description: '深入了解业务需求，制定个性化解决方案。',
      points: ['需求分析', '方案设计', '路线图规划'],
      link: '#',
    },
    {
      icon: '🚀',
      title: '部署与实施',
      description: '快速部署平台，支持云端、私有云及本地部署。',
      points: ['云端部署', '私有化适配', '数据迁移'],
      link: '#',
    },
    {
      icon: '🎓',
      title: '培训与赋能',
      description: '提供系统化的培训课程和操作指南。',
      points: ['管理员培训', '员工手册', '视频教程'],
      link: '#',
    },
  ],
  more: { text: '查看全部服务', link: '#', primary: true },
}

/* ============ CourseList ============ */
const courseList: CourseListData = {
  title: '热门课程',
  description: '系统化学习路径，助力团队快速掌握协作技能',
  items: [
    {
      title: 'ChatFlow 从入门到精通',
      description: '全面了解 ChatFlow 核心功能。',
      image: { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=60' },
      tags: [{ text: '入门', color: 'bg-indigo-600' }],
      duration: '2.5 小时',
      chapters: '6',
      instructor: '张伟',
      rating: '★★★★★',
      ratingCount: '86',
      price: '¥199',
      button: { text: '立即学习', link: '#' },
    },
    {
      title: '高效团队协作管理',
      description: '掌握团队沟通、任务分配与进度追踪。',
      image: { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=60' },
      tags: [
        { text: '进阶', color: 'bg-emerald-500' },
        { text: '热门', color: 'bg-orange-500' },
      ],
      duration: '4 小时',
      chapters: '8',
      instructor: '陈敏',
      rating: '★★★★★',
      ratingCount: '124',
      price: '¥299',
      button: { text: '立即学习', link: '#' },
    },
    {
      title: 'AI 助手实战应用',
      description: '利用 AI 自动生成会议纪要、摘要。',
      image: { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=60' },
      tags: [
        { text: '高级', color: 'bg-purple-500' },
        { text: '新品', color: 'bg-rose-500' },
      ],
      duration: '3 小时',
      chapters: '5',
      instructor: '王磊',
      rating: '★★★★☆',
      ratingCount: '53',
      price: '¥249',
      button: { text: '立即学习', link: '#' },
    },
  ],
  more: { text: '查看全部课程', link: '#', primary: true },
}

/* ============ NewsList ============ */
const newsList: NewsListData = {
  title: '最新动态',
  description: '产品更新 · 行业洞察 · 客户故事',
  items: [
    {
      title: '全新 AI 助手正式上线，支持智能摘要',
      summary: '通过大语言模型自动生成会议纪要、消息摘要。',
      image: { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=40' },
      category: '产品更新',
      date: '2026-08-20',
      link: '#',
    },
    {
      title: '2026 年企业协作趋势：AI 原生与安全合规',
      summary: '超过 70% 的企业计划引入 AI 驱动的协作工具。',
      image: { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=40' },
      category: '行业洞察',
      date: '2026-08-18',
      link: '#',
    },
    {
      title: '某全球零售品牌借助 ChatFlow 提升效率',
      summary: '通过集成库存系统，将补货响应时间缩短了 40%。',
      image: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=40' },
      category: '客户故事',
      date: '2026-08-15',
      link: '#',
    },
  ],
  more: { text: '查看全部新闻', link: '#', primary: true },
}

/* ============ NewsDetail ============ */
const newsDetail: NewsDetailData = {
  category: '产品更新',
  date: '2026-08-20',
  title: '全新 AI 助手正式上线，支持智能摘要',
  image: {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=60',
    alt: 'AI 助手界面',
  },
  body: '<p>我们很高兴地宣布，ChatFlow 全新 AI 助手功能已正式上线。</p><p><strong>核心能力：</strong>智能摘要、会议纪要、待办提取、多语言支持。</p>',
  tags: ['AI', '产品更新', '效率工具'],
}

/* ============ Pricing ============ */
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

/* ============ ComparisonTable ============ */
const comparisonTable: ComparisonTableData = {
  title: '为什么选择 ChatFlow',
  description: '与主流竞品对比，优势一目了然',
  firstColHeader: '功能',
  headers: [
    { text: 'ChatFlow', color: 'primary' },
    { text: '竞品 A', color: 'gray' },
    { text: '竞品 B', color: 'gray' },
  ],
  rows: [
    {
      feature: '端到端加密',
      columns: [
        { value: '✓', color: 'green' },
        { value: '✗', color: 'red' },
        { value: '✓', color: 'green' },
      ],
    },
    {
      feature: '无限消息历史',
      columns: [
        { value: '✓', color: 'green' },
        { value: '✓', color: 'green' },
        { value: '✗', color: 'red' },
      ],
    },
    {
      feature: 'AI 助手',
      columns: [
        { value: '✓', color: 'green' },
        { value: '✗', color: 'red' },
        { value: 'Beta', color: 'yellow' },
      ],
    },
  ],
}

/* ============ FAQ ============ */
const faq: FAQData = {
  title: '常见问题',
  items: [
    { question: '支持本地部署吗？', answer: '是的，企业版支持私有云或本地服务器部署。' },
    { question: '可以试用多久？', answer: '所有新用户均可享受 30 天全功能免费试用。' },
    { question: '数据存储在哪里？', answer: '数据存储在云端的独立数据库。' },
    { question: '如何迁移现有聊天记录？', answer: '我们提供专业迁移工具，支持从 Slack、Teams 等导入。' },
  ],
}

/* ============ ContactForm ============ */
const contactForm: ContactFormData = {
  title: '联系我们',
  description: '有疑问或需求？我们的团队随时准备为您提供帮助',
  fields: [
    { name: 'name', label: '姓名', type: 'text', placeholder: '请输入您的姓名', required: true },
    { name: 'company', label: '公司名称', type: 'text', placeholder: '请输入公司名称' },
    { name: 'email', label: '邮箱地址', type: 'email', placeholder: '请输入您的邮箱', required: true, width: 'full' },
    {
      name: 'subject',
      label: '主题',
      type: 'select',
      required: true,
      placeholder: '请选择咨询主题',
      options: [
        { label: '产品咨询', value: 'product' },
        { label: '价格方案', value: 'pricing' },
        { label: '预约演示', value: 'demo' },
        { label: '技术支持', value: 'support' },
      ],
    },
    { name: 'message', label: '留言内容', type: 'textarea', placeholder: '请详细描述您的需求...', required: true },
  ],
  submitText: '发送消息',
  footerNote: '提交即表示您同意我们的隐私政策。',
}

/* ============ CTA ============ */
const cta: CTAData = {
  title: '立即提升团队协作效率',
  description: '加入数百家信任我们的企业，开启高效沟通之旅。',
  actions: [
    { text: '免费试用 30 天', link: '#', primary: true },
    { text: '预约演示', link: '#', newWindow: true },
  ],
}

/* ============ PageHeader ============ */
const pageHeader: PageHeaderData = {
  title: '帮助文档',
  description: '快速了解 ChatFlow 的使用方法',
  align: 'center',
  bgColor: 'gray',
}

/* ============ Breadcrumb ============ */
const breadcrumb: BreadcrumbData = {
  items: [
    { text: '首页', link: '/' },
    { text: '帮助文档', link: '/docs' },
    { text: '快速开始' },
  ],
}

/* ============ Footer ============ */
const footer: FooterData = {
  brand: 'ChatFlow',
  copyright: '© 2025 ChatFlow Technologies · 保留所有权利。',
}
</script>

<template>
  <!-- 主题切换按钮 -->
  <button
    class="fixed bottom-6 right-6 z-50 rounded-full bg-gray-900 p-3 text-white shadow-lg dark:bg-white dark:text-gray-900"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="toggleDark()"
  >
    {{ isDark ? '☀️' : '🌙' }}
  </button>

  <!-- 顶部 -->
  <Banner :data="banner" />
  <Navbar :data="navbar" />

  <!-- Hero -->
  <Hero :data="hero" />

  <!-- 特性 -->
  <Features :data="features" />

  <!-- 图标墙 -->
  <IconWall :data="iconWall" />

  <!-- 统计 -->
  <Stats :data="stats" />

  <!-- 步骤 -->
  <Steps :data="steps" />

  <!-- 图文 -->
  <ImageText :data="imageText" />

  <!-- 上图下文 -->
  <TopImage :data="topImage" />

  <!-- 视频 -->
  <Video :data="video" />

  <!-- 时间线 -->
  <Timeline :data="timeline" />

  <!-- 团队 -->
  <Team :data="team" />

  <!-- 客户评价 -->
  <Testimonials :data="testimonials" />

  <!-- 合作伙伴 -->
  <Partners :data="partners" />
  <LogoBar :data="logoBar" />

  <!-- 产品 -->
  <ProductList :data="productList" />
  <ProductDetail :data="productDetail" />

  <!-- 服务 -->
  <ServiceList :data="serviceList" />

  <!-- 课程 -->
  <CourseList :data="courseList" />

  <!-- 新闻 -->
  <NewsList :data="newsList" />
  <NewsDetail :data="newsDetail" />

  <!-- 定价 -->
  <Pricing :data="pricing" />

  <!-- 对比表格 -->
  <ComparisonTable :data="comparisonTable" />

  <!-- FAQ -->
  <FAQ :data="faq" />

  <!-- 联系表单 -->
  <ContactForm :data="contactForm" />

  <!-- 号召 -->
  <CTA :data="cta" />

  <!-- 背景图 Hero -->
  <HeroBackground :data="heroBg" />

  <!-- 页面标题 & 面包屑 -->
  <PageHeader :data="pageHeader" />
  <Breadcrumb :data="breadcrumb" />

  <!-- 页脚 -->
  <Footer :data="footer" />
</template>
