import type { BlockAction, BlockBase, BlockImage } from '../../types/common'

/**
 * Hero 结构变体：决定 DOM 骨架
 * - `centered`：居中大图（默认）
 * - `split`：左右分栏，文案在左、配图在右，移动端单列堆叠
 * - `background`：背景图 + 遮罩
 */
export type HeroVariant = 'centered' | 'split' | 'background'

/**
 * Hero 接受的 variant 入参。
 * `'default'` 是 `'centered'` 的旧名，继续可用，运行时自动归一。
 */
export type HeroVariantInput = HeroVariant | 'default'

/**
 * Hero 皮肤色调：只切换一组 CSS 变量，不改变 DOM 结构
 * - `classic`：白底渐变 + 品牌色按钮（默认）
 * - `brutal`：新粗野主义，纯色 + 粗描边 + 硬阴影
 * - `amber`：锌灰渐变 + 琥珀色强调，标题局部用强调色文字而不是底色块
 *
 * 仅对 `centered` / `split` 变体生效；`background` 变体的对比度由背景图决定，不受 tone 影响。
 */
export type HeroTone = 'classic' | 'brutal' | 'amber'

export interface HeroData extends BlockBase {
  /** 主标题，支持 HTML（如 `<br>`；需要局部高亮时用 `<mark>` 包裹） */
  title: string
  /** 副标题/描述 */
  description?: string
  /** 按钮列表 */
  actions?: BlockAction[]
  /** 展示图 */
  image?: BlockImage
  /**
   * 结构变体，默认 `centered`。
   * 旧值 `'default'` 仍可用，运行时归一为 `'centered'`；非法值静默回退。
   */
  variant?: HeroVariantInput
  /**
   * 皮肤色调，默认 `classic`。
   * 同一份数据只改这个字段即可切换外观；非法值静默回退。
   */
  tone?: HeroTone
  /** 内容对齐方式 */
  align?: 'center' | 'left'
  /** variant='background' 时的背景图 */
  bgImage?: BlockImage
  /** 遮罩透明度 0-100，仅 variant='background' 有效 */
  overlayOpacity?: number
}
