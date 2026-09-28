# 区块风格

同一个区块组件可以有多套外观，**数据结构完全不变**，只改一个字段即可切换。

```
一份 HeroData ── variant（结构）── 决定 DOM 骨架
              └─ tone（皮肤）  ── 决定 CSS 变量
```

## 两个维度，不要混

| 维度 | 含义 | 改变什么 | 成本 |
| --- | --- | --- | --- |
| `variant` | 结构变体 | DOM 骨架（左右分栏 / 居中堆叠 / 背景图） | 独立子组件 |
| `tone` | 皮肤色调 | 配色、字重、圆角、阴影、描边 | 一组 CSS 变量 |
| 暗色模式 | 沿用 `.dark` | 已有机制，见[深色模式](./dark-mode) | — |

**判断规则**：如果两个外观能靠改 CSS 变量互相转换，它就是 `tone`；只有必须改 DOM 结构时，才是 `variant`。

把这两者做成正交维度，组合数是乘法、代码量是加法：

```
4 个 variant × 3 个 tone = 12 种外观
但只需要维护 4 + 3 = 7 个定义
```

## 用法

```vue
<script setup lang="ts">
import type { HeroData } from '@zeldafox/blocks'

const hero: HeroData = {
  variant: 'centered', // 结构
  tone: 'classic', // 皮肤
  title: '<mark>企业级即时通讯</mark><br>让协作更快一步',
  description: '安全、高效、可定制。',
  actions: [
    { text: '开始免费使用', link: '#', primary: true },
    { text: '联系销售', link: '#' },
  ],
  image: { src: '/screenshot.png', alt: '界面截图' },
}

// 完全复用同一份数据，只换皮肤
const heroBrutal: HeroData = { ...hero, tone: 'brutal' }

// 再换一次：结构改左右分栏，皮肤改琥珀色
const heroAmber: HeroData = { ...hero, variant: 'split', tone: 'amber' }
</script>

<template>
  <Hero :data="hero" />
  <Hero :data="heroBrutal" />
  <Hero :data="heroAmber" />
</template>
```

## Hero 当前支持的取值

### `variant`

| 值 | 说明 |
| --- | --- |
| `centered` | 居中大图（**默认**） |
| `split` | 左右分栏：文案在左、配图在右，移动端单列堆叠 |
| `background` | 背景图 + 遮罩 |
| `default` | `'centered'` 的旧名，继续可用，运行时自动归一 |

### `tone`

| 值 | 说明 |
| --- | --- |
| `classic` | 白底渐变 + 品牌色按钮（**默认**） |
| `brutal` | 新粗野主义：纯色 + 粗描边 + 硬阴影 |
| `amber` | 锌灰渐变 + 琥珀色强调，标题局部是强调色**文字**而非底色块 |

> `tone` 仅对 `centered` / `split` 生效。`background` 变体的对比度由背景图决定，
> 强行叠加浅色皮肤会让文字不可读，因此契约上就不提供这个组合。

## variant 与 tone 各管什么

分工是硬性的，混了就会长出分支判断：

| 归 `variant` | 归 `tone` |
| --- | --- |
| 栅格 / 布局（单列还是两列） | 颜色（背景、文字、描边、阴影色） |
| 区块内边距 | 字重、行高、按钮字号与内边距 |
| 标题字号（响应式，带 `md:` 断点） | 圆角、描边宽度、阴影形态 |
| 描述最大宽度、图片容器尺寸约束 | `<mark>` 高亮的外观 |

标题字号不进 tone，是因为它是响应式的——放进变量会让每个 tone 都要写一遍媒体查询。

## 数据结构三条约定

1. **`variant` / `tone` 必须是字面量联合类型**，不能是 `string`。这样编辑器能补全，
   非法值在编译期就能被发现；运行期遇到非法值也会静默回退到默认值，不会渲染空白。
2. **视觉参数不进数据契约**。不会出现 `bgColor`、`rounded`、`shadow` 这类字段——
   本库的核心是一个组件等于一个对象，可以直接由 AI 生成 JSON。把 Tailwind 类名塞进
   数据结构会让生成的 JSON 失控，低代码属性面板也会变得难以维护。所有视觉差异都通过
   `tone` 枚举表达。
3. **变体专属字段保留在顶层**并注明生效范围（例如 `bgImage` 只在 `background` 下生效），
   换取 JSON 的简洁性，而不是拆成嵌套的 `variantOptions`。

## 标题局部高亮

用语义化 `<mark>` 标签包裹需要强调的文字，具体外观由 `tone` 决定：

```ts
const hero: HeroData = {
  title: '<mark>企业级即时通讯</mark><br>让协作更快一步',
}
```

不同 tone 对 `<mark>` 的解释不同，这就是「同一份数据、不同外观」的具体落点：

| tone | `<mark>` 呈现 |
| --- | --- |
| `classic` | 背景透明，等于无高亮 |
| `brutal` | 黄色底色块 + 轻微旋转 |
| `amber` | 只改文字颜色为琥珀色，不铺底色 |

选 `<mark>` 而不是新增一个 `highlight` 字段，是为了不与「`title` 支持 HTML」的既有契约冲突。

## 自定义一种风格

tone 只是一组 CSS 变量，覆盖即可，不必改组件：

```css
/* 在你的全局样式中，组件库样式之后引入 */
[data-cf-tone='brutal'] {
  --cf-hero-bg: #0b1120;
  --cf-hero-title-c: #f8fafc;
  --cf-hero-btn-primary-bg: #f97316;
  --cf-hero-btn-primary-shadow: 6px 6px 0 #0ea5e9;
}
```

可覆盖的 Hero 变量：

| 分组 | 变量 |
| --- | --- |
| 区块 | `--cf-hero-bg` `--cf-hero-bg-image` `--cf-hero-text` `--cf-hero-border-w` `--cf-hero-border-c` |
| 标题 | `--cf-hero-title-c` `--cf-hero-title-weight` `--cf-hero-title-leading` |
| 高亮 | `--cf-hero-mark-bg` `--cf-hero-mark-c` `--cf-hero-mark-px` `--cf-hero-mark-rotate` |
| 描述 | `--cf-hero-desc-c` `--cf-hero-desc-weight` |
| 按钮 | `--cf-hero-btn-{px,py,size,weight,radius}` |
| 主按钮 | `--cf-hero-btn-primary-{bg,bg-hover,text,text-hover,bc,bw,shadow,shadow-hover}` |
| 次按钮 | `--cf-hero-btn-secondary-{bg,bg-hover,text,text-hover,bc,bc-hover,bw,shadow,shadow-hover}` |
| 图片框 | `--cf-hero-media-{bg,radius,bw,bc,shadow,h,h-md,opacity}` |

变量名统一 `--cf-{组件}-*` 前缀，避免 30 个组件互相污染。

## 扩展指南

**加一种皮肤**：复制一段 `[data-cf-tone='xxx']` 变量块，改 `.vue` 文件数为 **0**。

**加一种结构**：在 `registry.ts` 加一行映射 + 新增一个 `variants/Xxx.vue`。
变体组件内部请保持**零 `v-if`**——除「字段为空不渲染」外不要出现风格分支，
能靠变量归零表达的（如 `--cf-hero-media-bw: 0`）就不要用条件判断。
