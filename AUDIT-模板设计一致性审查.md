# 组件库 vs《网页区块模板设计》一致性审查

审查对象：`packages/blocks/src/components/*`（30 个组件）
参照文档：`网页区块模板设计.md`（23 个区块，含 实例 HTML / Handlebars 模板 / Schema）

---

## 一、结论

| 项             | 结论                                                          |
| -------------- | ------------------------------------------------------------- |
| **缺失组件**   | **无**。设计文档 23 个区块全部有对应组件                       |
| **外观一致性** | 23 个区块中 **20 个完全一致**，3 个存在细节差异（见第三节）    |
| **数据结构**   | **可对上**，但字段命名采用组件库统一契约（`BlockAction` / `BlockLink` / `BlockImage`），与 Handlebars Schema 的原始命名不同，属于有意设计 |
| **能力缺口**   | 发现 5 处，本次已全部修复（见第四节）                          |

---

## 二、区块 → 组件映射（23/23 覆盖）

| # | 设计文档区块 | 组件             | 数据结构                | 外观 |
| - | ------------ | ---------------- | ----------------------- | ---- |
| 1 | 导航栏       | `Navbar`         | ✅                      | ✅   |
| 2 | Hero         | `Hero`           | ✅                      | ⚠️ 留白/阴影 |
| 3 | Hero 2       | `HeroBackground` | ✅                      | ⚠️ 按钮阴影 |
| 4 | 左图右文     | `ImageText`      | ✅ `imagePosition:left` | ⚠️ 标签样式 |
| 5 | 左文右图     | `ImageText`      | ✅ `imagePosition:right`| ⚠️ 标签样式 |
| 6 | 上文下图     | `TopImage`       | ✅                      | ✅   |
| 7 | 特性区块     | `Features`       | ✅                      | ✅   |
| 8 | 团队区块     | `Team`           | ✅                      | ✅   |
| 9 | 统计区块     | `Stats`          | ✅                      | ✅   |
| 10 | 图标墙区块   | `IconWall`       | ✅                      | ✅   |
| 11 | 对比表格区块 | `ComparisonTable`| ✅                      | ✅   |
| 12 | 价格区块     | `Pricing`        | ✅                      | ✅（已修） |
| 13 | 新闻列表区块 | `NewsList`       | ✅                      | ✅   |
| 14 | 新闻详情区块 | `NewsDetail`     | ✅                      | ✅   |
| 15 | 产品列表区块 | `ProductList`    | ✅                      | ✅   |
| 16 | 服务列表区块 | `ServiceList`    | ✅                      | ✅   |
| 17 | 课程列表区块 | `CourseList`     | ✅                      | ✅   |
| 18 | 客户评价区块 | `Testimonials`   | ✅                      | ✅   |
| 19 | 合作伙伴区块 | `Partners`       | ✅                      | ✅   |
| 20 | 常见问题区块 | `FAQ`            | ✅                      | ✅   |
| 21 | 号召区块     | `CTA`            | ✅                      | ✅   |
| 22 | 联系表单区块 | `ContactForm`    | ✅（已修）              | ✅（已修） |
| 23 | 页脚区块     | `Footer`         | ✅                      | ✅   |

> 左图右文 / 左文右图 在设计文档里是两个区块，组件库用 `ImageText` 的 `imagePosition` 一个组件覆盖，这是有意的合并。

**组件库比设计文档多 8 个组件**（设计文档无对应区块，非缺失）：
`Banner`、`Breadcrumb`、`PageHeader`、`LogoBar`、`Steps`、`Timeline`、`Video`、`ProductDetail`。

---

## 三、外观差异明细

| 区块 | 设计文档 | 组件库现状 | 影响 |
| ---- | -------- | ---------- | ---- |
| Hero | `pt-16 pb-20` | `py-16 md:py-24` | 桌面端上下留白多 16px |
| Hero / HeroBackground | 主按钮 `shadow-md` | 统一 `shadow-sm` | 阴影偏弱 |
| 左图右文 | 标签为纯文本 `text-indigo-600`（含 ✓） | 胶囊 `bg-indigo-50 text-indigo-700` | 与左文右图样式趋同 |
| 价格区块 | 实例 HTML 中「企业版」按钮为灰色描边 `border-gray-300` | 非主按钮为 indigo 描边 | 设计文档自身的 Handlebars 只有 2 态，组件跟随 Handlebars |
| 全站 | 无深色模式 | 全部组件带 `dark:` 变体 | PRD 要求，属增强 |

---

## 四、本次修复的能力缺口

| # | 问题 | 修复 |
| - | ---- | ---- |
| 1 | `ContactForm` 无法表达「整行字段」——设计里 姓名+公司 并排、邮箱/主题/留言 各占整行，组件把所有 text/email 都塞进两列栅格 | `FormField` 新增 `width?: 'half' \| 'full'`；`text`/`email` 且非 `full` 的字段并排，其余字段独占一行 |
| 2 | `NewsItem` / `ProductItem` / `ServiceItem` 的链接不支持 `newWindow`（Schema 里有） | 三个类型新增 `newWindow?: boolean`，模板补 `target` / `rel` |
| 3 | 底部 CTA（`more`）忽略了 `newWindow` | `NewsList` / `ServiceList` / `CourseList` 的 `more` 按钮补 `target` / `rel` |
| 4 | `Pricing` 特性列表容器缺少 `space-y-3`（设计里行间距） | 已补上 `space-y-3` |
| 5 | `Navbar` 二级菜单宽度固定 `w-56`，设计里「解决方案」用了 `w-64` | `BlockLink` 新增 `menuWidth?: string`（传 Tailwind 类名，默认 `w-56`） |

---

## 五、数据结构命名对照（有意差异，不建议改）

| 语义 | 设计文档 Schema | 组件库契约 |
| ---- | --------------- | ---------- |
| 按钮 | `btnText` / `btnLink` / `isPrimary` / `newWindow` | `BlockAction { text, link, primary, newWindow }` |
| 导航项 | `brandName` / `navLinks` / `buttons` | `NavbarData { brand, links, actions }` |
| 列表数据 | `news` / `products` / `services` / `courses` | 统一 `items`（符合 PRD「单一对象」约定） |
| 底部按钮 | `moreText` / `moreLink` / `moreNewWindow` | `more: BlockAction` |
| 标签 | `repeater [{ text }]` | `string[]`（更简洁，JSON 友好） |
| 图片 | `image` + `imageAlt` 两个字段 | `BlockImage { src, alt }` |
| 表头/单元格颜色 | 直接传 `text-indigo-700` | 语义 token `'primary' \| 'green' \| 'red' \| 'yellow'`（badge/课程标签仍保留类名直传） |

---

## 六、回归验证

修改后全部通过：

- `vue-tsc --noEmit`：0 错误
- `pnpm test`：37 个测试全通过
- `pnpm --filter @chatflow/blocks build`：`index.js` gzip 15.4 kB、`style.css` gzip 6.8 kB、单一 `index.d.ts`
- `pnpm --filter chatflow-blocks-playground build`：通过（30 个组件全部渲染）
- `pnpm lint`：0 error
