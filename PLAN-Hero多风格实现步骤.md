# Hero 多风格实现步骤

> 以「区块 1（classic）」和「区块 2（brutal）」两个 HTML 样本为验收基准。
> 目标：同一份 `HeroData`，只改一个字段即可在两种外观间切换，且 DOM 骨架零分支。
>
> **状态：P1 已实现。** 之后又追加了第三个样本（左右分栏 + 琥珀色），落地为
> `variant: 'split'` + `tone: 'amber'`。本文的变量清单以 classic / brutal 为例，
> 实际代码另含 `amber` 皮肤与 `--cf-hero-btn-size`、`*-text-hover` 等后补变量，
> 以 `src/styles/tones/hero.css` 与 `docs/guide/tones.md` 为准。

---

## Step 0. 拆解两个样本：哪些是 variant，哪些是 tone

这是动手前必做的一步。把两个样本逐节点对比后，差异清单如下：

| 部位 | 区块 1（classic） | 区块 2（brutal） | 归类 | 落地方式 |
| --- | --- | --- | --- | --- |
| section 背景 | 白 → 灰 50 渐变 | 纯色 `#e9e2ff` | tone | 变量 |
| section 底边框 | 无 | `border-b-4 #ffb347` | tone | 变量（宽度 + 颜色） |
| section 前景色 | gray-800 / gray-200 | `#120b48` / white | tone | 变量 |
| h1 字号 | `text-4xl md:text-5xl` | 同 | **相同** | 固定类名 |
| h1 字重 | `font-extrabold`(800) | `font-black`(900) | tone | 变量 |
| h1 行高 | 默认(1) | `leading-[1.1]` | tone | 变量 |
| h1 颜色 | gray-900 / white | `#120b48` / white | tone | 变量 |
| 标题局部高亮 | 无 | `<span>` 黄底 + rotate(-1deg) | tone | **`<mark>` + tone CSS** |
| p 颜色 | gray-600 / gray-400 | `#2c1b6b` / `#c4b5fd` | tone | 变量 |
| p 字重 | 400 | `font-medium`(500) | tone | 变量 |
| 按钮内边距 | `px-6 py-3` | `px-8 py-4` | tone | 变量 |
| 按钮字重 | medium(500) | bold(700) | tone | 变量 |
| 按钮圆角 | `rounded-full` | `rounded-full` | **相同** | 固定类名 |
| 按钮描边 | 无 / 1px | 4px，各色 | tone | 变量（宽度 + 颜色） |
| 按钮阴影 | `shadow-md` / `shadow-sm` | `6px 6px 0 #ff5c8a` | tone | 变量 |
| 按钮 hover | 换背景色 / 换边框色 | 阴影收缩 6px→2px | tone | 变量 |
| 图片外层框 | 无（img 直接圆角 + shadow-2xl） | `h-80 md:h-96` + border-4 + 硬阴影 | tone | **容器常驻**，样式全变量 |
| 图片本身 | `h-auto` | `h-full opacity-90` | tone | 变量 |
| 容器 / 栅格 / 间距 | `max-w-7xl` `max-w-3xl` `mt-16` `gap-4` | 完全一致 | **相同** | 固定类名 |

**结论（决定架构的判断）：**

两个样本的 DOM 骨架**完全一致**（`section > container > text-center > h1 > p > 按钮组 > 图片框 > img`），差异 100% 落在「颜色 / 字重 / 边框量 / 阴影 / 圆角 / 装饰」上。

所以它们**不是两个 variant，而是同一个 variant（`centered`）下的两个 tone**。这意味着：

- `HeroCentered.vue` 可以写成**零 `v-if`** 的单一模板；
- 整套切换只靠 CSS 变量，运行时开销为零；
- 后续加第 3、4 种风格，只需加一段 CSS，不改任何 `.vue`。

> 反例警示：如果把这两个做成 `v-if="tone === 'brutal'"` 的两段模板，`HeroCentered.vue` 会立刻翻倍，且第三、四种风格继续线性膨胀。样本 diff 已经证明了不值得。

---

## Step 1. 定义语义变量槽

新建 `packages/blocks/src/styles/tones/hero.css`。变量命名统一 `--cf-hero-*`，避免 30 个组件互相污染。

**消费侧的书写规则（重要，决定能否通过 Tailwind 扫描）：**

| 属性类型 | 写法 | 示例 |
| --- | --- | --- |
| 颜色 | `bg-[var(--x)]` / `text-[color:var(--x)]` / `border-[color:var(--x)]` | `bg-[var(--cf-hero-bg)]` |
| 阴影 | `shadow-[var(--x)]` | `shadow-[var(--cf-hero-btn-primary-shadow)]` |
| 圆角 | `rounded-[var(--x)]` | `rounded-[var(--cf-hero-media-radius)]` |
| 边框宽度 | `border-[length:var(--x)]` | `border-[length:var(--cf-hero-btn-primary-bw)]` |
| 渐变 | `bg-[image:var(--x)]` | `bg-[image:var(--cf-hero-bg-image)]` |
| 字重 / 行高 / 旋转 / 高度 | **不进 Tailwind**，写在 tone 的原生 CSS 规则里 | 见 Step 4 |

原因：Tailwind 4 按需扫描源码中的**静态类名**，`bg-${tone}-600` 这类拼接会被 purge 掉。上面的写法类名全是字面量，安全。字重/行高这类"量"用 Tailwind 任意值语法类型提示不稳定，交给原生 CSS 更省事。

### 变量清单

```
/* 区块层 */
--cf-hero-bg                区块背景色
--cf-hero-bg-image          背景渐变，无则 none
--cf-hero-text              区块前景色
--cf-hero-border-w          底边框宽度
--cf-hero-border-c          底边框颜色

/* 标题 */
--cf-hero-title-c
--cf-hero-title-weight
--cf-hero-title-leading

/* 标题高亮 <mark> */
--cf-hero-mark-bg
--cf-hero-mark-c
--cf-hero-mark-px
--cf-hero-mark-rotate

/* 描述 */
--cf-hero-desc-c
--cf-hero-desc-weight

/* 按钮：共用尺寸 */
--cf-hero-btn-px
--cf-hero-btn-py
--cf-hero-btn-weight

/* 按钮：主按钮 */
--cf-hero-btn-primary-bg        --cf-hero-btn-primary-bg-hover
--cf-hero-btn-primary-text
--cf-hero-btn-primary-bc        --cf-hero-btn-primary-bw
--cf-hero-btn-primary-shadow    --cf-hero-btn-primary-shadow-hover

/* 按钮：次按钮 */
--cf-hero-btn-secondary-bg      --cf-hero-btn-secondary-bg-hover
--cf-hero-btn-secondary-text
--cf-hero-btn-secondary-bc      --cf-hero-btn-secondary-bc-hover
--cf-hero-btn-secondary-bw
--cf-hero-btn-secondary-shadow  --cf-hero-btn-secondary-shadow-hover

/* 图片框 */
--cf-hero-media-bg
--cf-hero-media-radius
--cf-hero-media-bw
--cf-hero-media-bc
--cf-hero-media-shadow
--cf-hero-media-h              --cf-hero-media-h-md
--cf-hero-media-opacity
```

### classic / brutal 取值对照

| 变量 | classic（浅 / 深） | brutal（浅 / 深） |
| --- | --- | --- |
| `-bg` | `#ffffff` / `#111827` | `#e9e2ff` / `#1a103d` |
| `-bg-image` | `linear-gradient(to bottom,#fff,#f9fafb)` / `linear-gradient(to bottom,#111827,#030712)` | `none` / `none` |
| `-text` | `#1f2937` / `#e5e7eb` | `#120b48` / `#ffffff` |
| `-border-w` | `0` / `0` | `4px` / `4px` |
| `-border-c` | `transparent` / `transparent` | `#ffb347` / `#ffb347` |
| `-title-c` | `#111827` / `#ffffff` | `#120b48` / `#ffffff` |
| `-title-weight` | `800` / `800` | `900` / `900` |
| `-title-leading` | `1` / `1` | `1.1` / `1.1` |
| `-mark-bg` | `transparent` / `transparent` | `#ffed99` / `#ffb347` |
| `-mark-c` | `inherit` / `inherit` | `#120b48` / `#120b48` |
| `-mark-px` | `0` / `0` | `0.75rem` / `0.75rem` |
| `-mark-rotate` | `0deg` / `0deg` | `-1deg` / `-1deg` |
| `-desc-c` | `#4b5563` / `#9ca3af` | `#2c1b6b` / `#c4b5fd` |
| `-desc-weight` | `400` / `400` | `500` / `500` |
| `-btn-px` | `1.5rem` / `1.5rem` | `2rem` / `2rem` |
| `-btn-py` | `0.75rem` / `0.75rem` | `1rem` / `1rem` |
| `-btn-weight` | `500` / `500` | `700` / `700` |
| `primary-bg` | `var(--cf-primary)` / `#6366f1` | `#120b48` / `#ffb347` |
| `primary-bg-hover` | `#4338ca` / `#4f46e5` | 同 bg / 同 bg |
| `primary-text` | `#ffffff` / `#ffffff` | `#ffffff` / `#120b48` |
| `primary-bc` / `-bw` | `transparent` / `0` | `#ffb347` / `4px` → dark `#ff5c8a` / `4px` |
| `primary-shadow` | `0 4px 6px -1px rgb(0 0 0/.1),0 2px 4px -2px rgb(0 0 0/.1)` | `6px 6px 0 #ff5c8a` / `6px 6px 0 #b47aff` |
| `primary-shadow-hover` | 同上 | `2px 2px 0 #ff5c8a` / `2px 2px 0 #b47aff` |
| `secondary-bg` | `#ffffff` / `#1f2937` | `#ffffff` / `#2c1b6b` |
| `secondary-text` | `#374151` / `#d1d5db` | `#120b48` / `#ffffff` |
| `secondary-bc` | `#d1d5db` / `#4b5563` | `#ff5c8a` / `#ffb347` |
| `secondary-bc-hover` | `#9ca3af` / `#6b7280` | 同 bc |
| `secondary-bw` | `1px` / `1px` | `4px` / `4px` |
| `secondary-shadow` | `0 1px 2px 0 rgb(0 0 0/.05)` | `6px 6px 0 #b47aff` / `6px 6px 0 #ff5c8a` |
| `secondary-shadow-hover` | 同上 | `2px 2px 0 #b47aff` / `2px 2px 0 #ff5c8a` |
| `media-bg` | `transparent` / `transparent` | `#ffb347` / `#2c1b6b` |
| `media-radius` | `0.75rem` / `0.75rem` | `1.5rem` / `1.5rem` |
| `media-bw` | `1px` / `1px` | `4px` / `4px` |
| `media-bc` | `#e5e7eb` / `#374151` | `#120b48` / `#ffb347` |
| `media-shadow` | `0 25px 50px -12px rgb(0 0 0/.25)` | `20px 20px 0 #ff5c8a` / `20px 20px 0 #b47aff` |
| `media-h` / `-h-md` | `auto` / `auto` | `20rem` / `24rem` |
| `media-opacity` | `1` / `1` | `0.9` / `0.9` |

> classic 的主按钮用 `var(--cf-primary)`（= `#4f46e5`），顺带修掉现有问题：`theme.css` 定义了 `--cf-primary` 但组件从未消费，`docs/guide/theming.md` 承诺的「覆盖变量即生效」目前是假的。

---

## Step 2. 扩展类型契约

`packages/blocks/src/components/Hero/types.ts`：

```ts
/** 结构变体：决定 DOM 骨架 */
export type HeroVariant = 'centered' | 'split' | 'background'
/** @deprecated 兼容旧值，等价于 'centered' */
export type HeroVariantLegacy = 'default'

/** 皮肤色调：只改 CSS 变量，不改 DOM */
export type HeroTone = 'classic' | 'brutal'

export interface HeroData extends BlockBase {
  title: string
  description?: string
  actions?: BlockAction[]
  image?: BlockImage
  variant?: HeroVariant | HeroVariantLegacy
  tone?: HeroTone
  align?: 'center' | 'left'
  bgImage?: BlockImage
  overlayOpacity?: number
}
```

**三条铁律（写进 CLAUDE/贡献指南）：**

1. `variant` 与 `tone` 必须是字面量联合类型，不能是 `string`；默认值必填，非法值静默回退。
2. **视觉参数不进数据契约**。禁止新增 `bgColor`、`rounded`、`shadow` 这类字段——本库的核心卖点是「一个组件 = 一个对象 = AI 可生成的 JSON」，一旦把 Tailwind 类名塞进数据结构，AI 生成的 JSON 就会失控，低代码属性面板也会变成一坨。
3. 变体专属字段（`bgImage` / `overlayOpacity`）保留在顶层，文档标注「仅 `background` 变体生效」，换取 AI/JSON 的简洁性。

用同一份 data 表达两个区块：

```ts
const hero: HeroData = {
  variant: 'centered',
  tone: 'classic',          // 改成 'brutal' 即切换
  title: '<mark>企业级即时通讯</mark><br>让协作更快一步',
  description: '安全、高效、可定制——专为现代企业打造的智能聊天平台，集成工作流与数据洞察。',
  actions: [
    { text: '开始免费使用', link: '#' },
    { text: '联系销售', link: '#' },
  ],
  image: { src: '...', alt: '团队协作界面' },
}
```

**标题高亮的选型说明：** 用语义化 `<mark>` 标签，而不是新增 `highlight?: string[]` 字段。理由——现有 `title` 已经支持 HTML（`v-html`），`<mark>` 零解析、零转义问题；若新增字段则必须先 escape 再包裹，会与「title 支持 `<br>`」的既有契约冲突。`tone` 只需一条 CSS 规则即可定义 `<mark>` 外观，classic 下设为透明即等于无高亮。

---

## Step 3. 目录改造：调度器 + 变体子组件

```
src/components/Hero/
├── Hero.vue                    # 调度器：归一化 → 查 registry → <component :is>
├── types.ts
├── index.ts
├── useHeroData.ts              # 共享归一化逻辑（标题、按钮、tone/variant 回退）
├── registry.ts                 # variant → 组件映射
└── variants/
    ├── HeroCentered.vue        # 由现有 Hero.vue 改造，零 v-if + tone
    ├── HeroBackground.vue      # 从现有 background 分支拆出
    └── HeroSplit.vue           # P2 新增（左右分栏）
```

`registry.ts`：

```ts
import type { Component } from 'vue'
import HeroCentered from './variants/HeroCentered.vue'
import HeroBackground from './variants/HeroBackground.vue'

export const heroRegistry: Record<string, Component> = {
  centered: HeroCentered,
  default: HeroCentered,      // 兼容旧值
  background: HeroBackground,
  split: HeroCentered,        // 未实现前安全回退
}
```

`useHeroData.ts` 负责：合并默认值、`normalizeActions`、把 `'default'` 归一成 `'centered'`、非法 `tone` 回退 `'classic'`。这样每个变体组件只关心渲染，不重复归一化。

> 现有 `Hero.vue` 自己写了个 `computed` 而没用 `useMergedData`，本次统一收口到 `useHeroData`。

---

## Step 4. `HeroCentered.vue` 改造为零分支模板

关键写法（节选，展示模式而非完整文件）：

```vue
<section
  :id="d.id"
  :data-cf-tone="d.tone"
  class="cf-hero relative overflow-hidden antialiased pt-16 pb-20
         bg-[var(--cf-hero-bg)] bg-[image:var(--cf-hero-bg-image)]
         text-[color:var(--cf-hero-text)]
         border-b-[length:var(--cf-hero-border-w)] border-b-[color:var(--cf-hero-border-c)]
         border-solid transition-colors duration-300"
  :class="d.class"
>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <h1
        class="cf-hero-title mb-6 text-4xl font-extrabold tracking-tight md:text-5xl"
        v-html="d.title"
      />
      <p class="cf-hero-desc mb-10 text-lg">{{ d.description }}</p>
      <!-- 按钮组 -->
    </div>
    <div class="cf-hero-media mx-auto mt-16 max-w-5xl">
      <img :src="d.image.src" :alt="d.image.alt ?? ''" class="cf-hero-media-img" />
    </div>
  </div>
</section>
```

注意三点：

1. **图片外层框常驻**。classic 下 `--cf-hero-media-bw: 0`、`--cf-hero-media-bg: transparent`，视觉上等于不存在——用「变量归零」代替 `v-if`，这是零分支的关键手法。
2. **按钮必须写 `border-solid`**。Tailwind 4 的宽度工具类依赖 `--tw-border-style`，显式声明避免 width 为 0 时样式不一致。
3. **按钮用 `transition` 而非 `transition-colors`**。区块 2 的 hover 是阴影位移，`transition-colors` 不会产生过渡动画。（section 本身继续用 `transition-colors duration-300`，与样本一致。）

`tone` 的原生 CSS（非颜色部分）写在 `tones/hero.css`：

```css
[data-cf-tone='classic'] { --cf-hero-bg: #ffffff; /* …其余变量 */ }
.dark [data-cf-tone='classic'] { --cf-hero-bg: #111827; /* … */ }

[data-cf-tone='brutal'] { --cf-hero-bg: #e9e2ff; /* … */ }
.dark [data-cf-tone='brutal'] { --cf-hero-bg: #1a103d; /* … */ }

/* 颜色之外的"量"，用原生规则 */
.cf-hero-title {
  color: var(--cf-hero-title-c);
  font-weight: var(--cf-hero-title-weight);
  line-height: var(--cf-hero-title-leading);
}
.cf-hero-title mark {
  background: var(--cf-hero-mark-bg);
  color: var(--cf-hero-mark-c);
  padding-inline: var(--cf-hero-mark-px);
  display: inline-block;
  transform: rotate(var(--cf-hero-mark-rotate));
}
.cf-hero-desc { color: var(--cf-hero-desc-c); font-weight: var(--cf-hero-desc-weight); }

.cf-hero-media {
  height: var(--cf-hero-media-h);
  border-width: var(--cf-hero-media-bw);
  border-style: solid;
}
@media (min-width: 768px) { .cf-hero-media { height: var(--cf-hero-media-h-md); } }
.cf-hero-media-img { opacity: var(--cf-hero-media-opacity); }
```

在 `src/styles/index.css` 中 `@import "./tones/hero.css";`（与现有 `theme.css` 的 `.dark {}` 覆盖写法保持一致，不用 `light-dark()`——后者要求 `color-scheme`，与现有 `.dark` class 策略不同源）。

---

## Step 5. 兼容迁移

| 旧值 | 处理 | 影响 |
| --- | --- | --- |
| `variant: 'default'` | `useHeroData` 归一为 `'centered'` | 无感 |
| `variant: 'background'` | 保持不变 | 无感 |
| 未传 `variant` | 默认 `'centered'` | 无感 |
| 未传 `tone` | 默认 `'classic'` | 无感 |
| 非法 `tone` | 回退 `'classic'` | 无感 |

同时做一次**基准校准**（把 classic 对齐样本 1）：

- `py-16 md:py-24` → `pt-16 pb-20`（两个样本一致，非 tone 差异，直接改组件）
- `bg-gradient-to-b` → `bg-linear-to-b`（Tailwind 4.3 新写法，旧写法已废弃）
- 主按钮补 `dark:bg-indigo-500 dark:hover:bg-indigo-600`
- 描述深色值 `dark:text-gray-300` → `dark:text-gray-400`
- section 补 `antialiased` 与 `text-gray-800 dark:text-gray-200`

这几项会微调现有用户的视觉，需在 `CHANGELOG.md` 的「视觉校准」条目下说明。

---

## Step 6. 测试

在 `src/components/__tests__/` 补充：

1. **tone 渲染快照** —— `classic` / `brutal` 各一份，覆盖浅色与 `.dark`。
2. **回退用例** —— `variant: 'illegal'`、`tone: 'illegal'`、不传 `variant/tone`，断言回退到 `centered` + `classic`。
3. **旧契约用例** —— `variant: 'default'` 仍渲染 `HeroCentered`（现有的 `components.spec.ts` 里已有 `variant: 'background'` 用例，保留）。
4. **`<mark>` 高亮** —— 标题含 `<mark>` 时正确渲染且不被转义。
5. **变量完整性** —— 断言 `heroRegistry` 的每个 key 都能解析到组件。

---

## Step 7. 文档与 playground

- `scripts/gen-component-docs.mjs` 从 `types.ts` 的 AST 生成 `docs/components/hero.md`，新增的 `variant` / `tone` 联合类型会自动出现在字段表里，无需改脚本；但要补一段「风格切换」示例段落。
- `playground/src/App.vue` 直接并排渲染两个 Hero —— 同一份 data，`tone` 分别取 `classic` / `brutal`，作为最直观的验收页。playground 的示例也会被文档生成脚本抓取。
- `docs/guide/theming.md` 补充：每个区块的可用 tone 清单 + `--cf-hero-*` 变量可覆盖说明。

---

## 验收标准

1. 同一份 `HeroData`，仅改 `tone` 字段，渲染结果与两个 HTML 样本**逐类对齐**。
2. `HeroCentered.vue` 中 `v-if` 数量为 **0**（`description` / `image` 的判空除外）。
3. 老 JSON（无 `variant`、无 `tone`，或 `variant: 'default'`）渲染结果与改动前一致。
4. 覆盖 `--cf-primary` 后，classic 主按钮颜色随之变化。
5. `pnpm typecheck` / `pnpm test` / `pnpm build` 全绿。

---

## 风险与注意事项

| 风险 | 说明 | 应对 |
| --- | --- | --- |
| Tailwind purge | `bg-${tone}-600` 这类拼接类名构建后被清除 | 一律用 `bg-[var(--x)]` 静态字面量 |
| CSS 体积 | 30 个组件 × N 个 tone 全量进 `dist/style.css` | tone 只写变量不写类名，增量极小；后续可按组件拆分 css 做 tree-shaking |
| 变量污染 | 30 个组件共用一套变量会互相覆盖 | 强制 `--cf-{组件}-*` 前缀 |
| 风格漂移 | 30 个组件各自加 tone 后视觉不统一 | 复用仓库现有的 `AUDIT-模板设计一致性审查.md` 机制，每次新增 tone 跑一次一致性审查 |
| 变体膨胀 | 每个组件变体超过 5 个 | 说明把 `tone` 误判成了 `variant`，回 Step 0 重新拆维度 |
| 工作量 | 30 个组件全量铺开过大 | 分 P0（Token 层）→ P1（Hero 跑通）→ P2（Hero / Features / Pricing / CTA / Testimonials / Stats 六个高频组件）→ P3（全量） |
