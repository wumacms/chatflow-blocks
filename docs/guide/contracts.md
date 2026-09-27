# 数据契约

ChatFlow Blocks 遵循 PRD 的**契约式设计**：Schema = TypeScript 类型 = 文档，三者严格一致。

所有组件统一接收**一个** `data` prop，类型名为 `组件名 + Data`。重复出现的概念（按钮、图片、标签、链接）收敛到 5 个通用契约类型，避免每个组件各自定义一套。

## 为什么是单一 data prop

| 场景         | 传统多 props              | 单一 data                     |
| ------------ | ------------------------- | ----------------------------- |
| JSON / 低代码 | 需要 flatten 转换         | 一个 JSON 对象直接驱动        |
| 类型提示     | 逐 prop 查看              | 一个接口即可了解全貌          |
| 文档         | 每个 prop 单独说明        | 一个 Schema 对应一个类型      |
| 版本演进     | 新增 prop 破坏签名        | 新增可选字段，向后兼容        |

```vue
<!-- 所有组件的写法完全一致 -->
<Hero :data="hero" />
<Features :data="features" />
<FAQ :data="faq" />
```

## BlockBase

所有 `XxxData` 都继承它，因此每个组件都支持这两个字段。

| 字段    | 类型     | 必填 | 说明                                          |
| ------- | -------- | ---- | --------------------------------------------- |
| `id`    | `string` | 否   | 区块 id，用于锚点跳转（如 `#pricing`）        |
| `class` | `string` | 否   | 附加 Tailwind 类名，追加在区块根节点 class 上 |

```ts
const hero: HeroData = {
  id: 'hero',
  class: 'py-32',   // 覆盖默认留白
  title: 'Hello',
}
```

## BlockAction

通用按钮，用于 Hero / CTA / Pricing / 列表类的 `more` 等。

| 字段        | 类型      | 必填 | 默认值 | 说明                             |
| ----------- | --------- | ---- | ------ | -------------------------------- |
| `text`      | `string`  | 是   | —      | 按钮文字                         |
| `link`      | `string`  | 否   | `'#'`  | 链接地址                         |
| `primary`   | `boolean` | 否   | —      | 是否主按钮（首个按钮默认为 true）|
| `newWindow` | `boolean` | 否   | `false`| 是否新窗口打开（渲染 `target="_blank"` 与 `rel="noopener"`） |

```ts
actions: [
  { text: '免费开始', link: '/signup' },
  { text: '查看文档', link: '/docs', primary: false, newWindow: true },
]
```

## BlockImage

统一图片契约，确保无障碍要求里的 `alt` 不被遗漏。

| 字段  | 类型     | 必填 | 说明                       |
| ----- | -------- | ---- | -------------------------- |
| `src` | `string` | 是   | 图片地址                   |
| `alt` | `string` | 否   | 替代文本，SEO 与无障碍必填 |

```ts
image: { src: '/hero.png', alt: '产品界面截图' }
```

## BlockTag

彩色标签，用于 ProductList / ProductDetail / CourseList / NewsDetail。

| 字段    | 类型     | 必填 | 说明                                                                       |
| ------- | -------- | ---- | -------------------------------------------------------------------------- |
| `text`  | `string` | 是   | 标签文字                                                                   |
| `color` | 枚举     | 否   | `primary` `gray` `green` `red` `yellow` `emerald` `orange` `rose` `purple` `cyan` |

```ts
tags: [
  { text: '热门', color: 'red' },
  { text: '新上线', color: 'emerald' },
]
```

## BlockLink

导航与页脚链接，支持二级菜单。

| 字段        | 类型          | 必填 | 说明                                              |
| ----------- | ------------- | ---- | ------------------------------------------------- |
| `text`      | `string`      | 是   | 显示文字                                          |
| `link`      | `string`      | 否   | 链接地址                                          |
| `icon`      | `string`      | 否   | 图标（推荐 Emoji，无需引入图标库）                |
| `newWindow` | `boolean`     | 否   | 是否新窗口打开                                    |
| `children`  | `BlockLink[]` | 否   | 二级菜单                                          |
| `menuWidth` | `string`      | 否   | 二级菜单面板宽度（Tailwind 类名），默认 `w-56`    |

```ts
links: [
  {
    text: '解决方案',
    menuWidth: 'w-64',
    children: [
      { text: '营销自动化', link: '/solution/marketing', icon: '📈' },
      { text: '客户运营', link: '/solution/crm', icon: '🤝' },
    ],
  },
  { text: '定价', link: '/pricing', newWindow: false },
]
```

## 命名对照表

若你的原始数据来自 Handlebars 模板或其他 Schema，可按此表映射。

| 语义     | 设计文档 Schema              | 组件库契约                    |
| -------- | ---------------------------- | ----------------------------- |
| 按钮     | `btnText` / `btnLink` / `isPrimary` | `BlockAction{text,link,primary}` |
| 导航     | `brandName` / `navLinks` / `buttons` | `brand` / `links` / `actions` |
| 列表     | `news` / `products` / `services` | 统一 `items`                  |
| 底部按钮 | `moreText` / `moreLink` / `moreNewWindow` | `more: BlockAction`   |
| 图片     | `image` + `imageAlt`         | `BlockImage{src, alt}`        |

```ts
// 旧 Schema → 组件库契约
const hero: HeroData = {
  title: tpl.title,
  description: tpl.subtitle,
  actions: tpl.btnText ? [{ text: tpl.btnText, link: tpl.btnLink, primary: tpl.isPrimary }] : [],
  image: { src: tpl.image, alt: tpl.imageAlt ?? '' },
}
```

## 默认值约定

组件内部通过 `{ ...默认值, ...props.data }` 合并，因此：

- 可选字段传 `undefined` 与不传等价，都会回落到默认值
- 不需要为了省事填空字符串，省略即可
- 数组类字段没有默认值，为空时区块整体不渲染该部分
