# 组件总览

ChatFlow Blocks 提供 **30 个**企业落地页区块组件。所有组件统一接收一个 `data` prop，类型名为 `组件名 + Data`。

::: tip 统一约定
每个区块的数据结构都遵循同一套[数据契约](/guide/contracts)：按钮是 `BlockAction`、图片是 `BlockImage`、链接是 `BlockLink`。学会一次，30 个组件通用。
:::

## 布局 & 导航

| 组件                            | 类型              | 用途                     |
| ------------------------------- | ----------------- | ------------------------ |
| [`Navbar`](/components/navbar)  | `NavbarData`      | 顶部导航（支持二级菜单） |
| [`Banner`](/components/banner)  | `BannerData`      | 通知条 / 活动条          |
| [`Breadcrumb`](/components/breadcrumb) | `BreadcrumbData` | 内页面包屑导航  |
| [`Footer`](/components/footer)  | `FooterData`      | 底部版权信息             |

## Hero 类

| 组件                                          | 类型                  | 用途             |
| --------------------------------------------- | --------------------- | ---------------- |
| [`Hero`](/components/hero)                    | `HeroData`            | 首页主视觉       |
| [`HeroBackground`](/components/hero-background) | `HeroBackgroundData` | 全屏背景图 Hero |
| [`PageHeader`](/components/page-header)       | `PageHeaderData`      | 内页标题区域     |

> 同页只能出现一个 `<h1>`，`Hero` / `HeroBackground` / `PageHeader` / `NewsDetail` / `ProductDetail` 会渲染 `<h1>`，不要同时使用两个。

## 内容区块

| 组件                                | 类型            | 用途          |
| ----------------------------------- | --------------- | ------------- |
| [`Features`](/components/features)  | `FeaturesData`  | 产品特性网格  |
| [`Stats`](/components/stats)        | `StatsData`     | 数字统计      |
| [`IconWall`](/components/icon-wall) | `IconWallData`  | 功能图标网格  |
| [`Steps`](/components/steps)        | `StepsData`     | 三步走 / 流程 |
| [`Timeline`](/components/timeline)  | `TimelineData`  | 发展历程      |
| [`Video`](/components/video)        | `VideoData`     | 视频播放      |

## 团队 & 客户

| 组件                                          | 类型                 | 用途            |
| --------------------------------------------- | -------------------- | --------------- |
| [`Team`](/components/team)                    | `TeamData`           | 团队成员        |
| [`Testimonials`](/components/testimonials)    | `TestimonialsData`   | 客户证言        |
| [`Partners`](/components/partners)            | `PartnersData`       | 合作企业 Logo   |
| [`LogoBar`](/components/logo-bar)             | `LogoBarData`        | 轻量 Logo 墙    |

## 图文组合

| 组件                                | 类型             | 用途               |
| ----------------------------------- | ---------------- | ------------------ |
| [`ImageText`](/components/image-text) | `ImageTextData` | 左图右文 / 左文右图 |
| [`TopImage`](/components/top-image) | `TopImageData`   | 上文下图           |

## 列表类

| 组件                                            | 类型                 | 用途         |
| ----------------------------------------------- | -------------------- | ------------ |
| [`ProductList`](/components/product-list)       | `ProductListData`    | 产品卡片列表 |
| [`ProductDetail`](/components/product-detail)   | `ProductDetailData`  | 单品深度介绍 |
| [`ServiceList`](/components/service-list)       | `ServiceListData`    | 服务卡片列表 |
| [`CourseList`](/components/course-list)         | `CourseListData`     | 课程卡片列表 |
| [`NewsList`](/components/news-list)             | `NewsListData`       | 资讯卡片列表 |
| [`NewsDetail`](/components/news-detail)         | `NewsDetailData`     | 文章详情     |

## 表格 & 定价

| 组件                                            | 类型                   | 用途         |
| ----------------------------------------------- | ---------------------- | ------------ |
| [`Pricing`](/components/pricing)                | `PricingData`          | 定价方案对比 |
| [`ComparisonTable`](/components/comparison-table) | `ComparisonTableData` | 竞品对比表格 |

## 表单 & 互动

| 组件                                      | 类型                | 用途     |
| ----------------------------------------- | ------------------- | -------- |
| [`ContactForm`](/components/contact-form) | `ContactFormData`   | 表单收集 |
| [`CTA`](/components/cta)                  | `CTAData`           | 行动号召 |
| [`FAQ`](/components/faq)                  | `FAQData`           | 问答列表 |

## 通用类型契约

五个跨组件复用的类型，详见[数据契约](/guide/contracts)：

| 类型          | 说明                                              |
| ------------- | ------------------------------------------------- |
| `BlockAction` | 按钮（text / link / primary / newWindow）         |
| `BlockImage`  | 图片（src / alt）                                 |
| `BlockTag`    | 标签（text / color）                              |
| `BlockLink`   | 链接（text / link / icon / newWindow / children） |
| `BlockBase`   | 区块基类（id / class），所有 `XxxData` 均继承     |

## 组合建议

典型落地页的区块顺序：

```
Banner → Navbar → Hero → Features → Stats → ImageText
→ Testimonials → Pricing → ComparisonTable → FAQ → CTA → ContactForm → Footer
```

内页（如文章、产品详情）推荐：

```
Navbar → Breadcrumb → PageHeader（或 NewsDetail / ProductDetail）→ Footer
```
