# 无障碍

组件库按 PRD 8.4 的要求实现无障碍：图片必有 `alt`、交互元素支持键盘导航、表单字段有 `<label>`、使用语义化标签、色彩对比度达 WCAG AA。

## 已实现项

| 要求           | 实现方式                                                       |
| -------------- | -------------------------------------------------------------- |
| 图片 `alt`     | 统一 [`BlockImage`](/guide/contracts#blockimage) 契约，所有 `<img>` 均绑定 `alt` |
| 表单 `<label>` | `ContactForm` 每个字段渲染 `<label :for>`，并与输入控件 id 关联 |
| 键盘导航       | Navbar 二级菜单支持 `focus-within` 展开，交互元素带 `focus-visible` 焦点环 |
| 语义化标签     | `<header>` `<nav>` `<footer>` `<section>` `<article>` `<figure>` `<time>` 按语义选用 |
| 装饰图标       | Emoji 与非语义 SVG 标注 `aria-hidden="true"`                   |
| 对比度         | 文本与背景组合均满足 WCAG AA（4.5:1）                          |

## 编写内容时的注意点

### 图片 alt 要写「所见」

描述性图片写内容，装饰性图片留空字符串：

```ts
// 内容型：描述图中信息
image: { src: '/dashboard.png', alt: '数据看板界面，显示近 7 日访问趋势' }

// 装饰型：留空，让屏幕阅读器跳过
bgImage: { src: '/bg-gradient.jpg', alt: '' }
```

### 新窗口打开的链接

组件会自动补 `target="_blank"` 与 `rel="noopener noreferrer"`，你只需要在数据里声明：

```ts
{ text: '查看文档', link: 'https://example.com', newWindow: true }
```

### 图标用 Emoji 即可

`icon` 字段渲染为纯文本节点，屏幕阅读器会朗读，比 `<i class="icon">` 更友好：

```ts
items: [{ icon: '⚡', title: '极速', description: '首屏 200ms 内响应' }]
```

若使用 SVG 图标，请在组件外包裹 `<span aria-hidden="true">`。

## 键盘可达性

| 组件              | 键盘行为                                                     |
| ----------------- | ------------------------------------------------------------ |
| `Navbar`          | Tab 聚焦到二级菜单触发按钮后，菜单通过 `focus-within` 展开；继续 Tab 可遍历子项 |
| `ContactForm`     | 标准表单序列，Tab 在字段间移动，Enter 提交                    |
| `FAQ`             | 静态问答列表，全部答案始终可见，无折叠交互                    |
| 其余展示型区块    | 链接与按钮均为原生元素，天然可聚焦                            |

::: tip 检查建议
用 axe DevTools 或 Lighthouse 跑一遍落地页，`alt`、`label`、对比度三项应全部通过。若你的自定义 `class` 覆盖了颜色，请自行复核对比度。
:::

## 语义化标签一览

各区块根节点使用的标签（详见每个组件页面的「实现要点」）：

自动生成于源码扫描结果，与各组件页「实现要点」一致：

| 标签         | 使用组件                                                                 |
| ------------ | ------------------------------------------------------------------------ |
| `<header>`   | `Navbar`                                                                 |
| `<nav>`      | `Navbar`、`Breadcrumb`                                                   |
| `<footer>`   | `Footer`                                                                 |
| `<article>`  | `NewsList`                                                               |
| `<figure>`   | `NewsDetail`（题图）                                                     |
| `<form>`     | `ContactForm`                                                            |
| `<section>`  | 其余全部区块（28 个），配合 `<h2>` / `<h3>` 形成标题层级                  |

::: tip 标题层级
主标题类区块渲染 `<h1>`：`Hero`、`HeroBackground`、`PageHeader`、`NewsDetail`、`ProductDetail`——每页只用其中一个。

内容区块标题统一 `<h2>`，卡片与列表项标题用 `<h3>`。一页有且仅有一个 `<h1>`，层级连续不跳级。
:::
