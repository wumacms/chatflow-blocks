import type { BlockAction, BlockBase } from '../../types/common'

export interface BannerData extends BlockBase {
  /** 横幅文字 */
  text: string
  /** 图标（Emoji） */
  icon?: string
  /** 右侧 CTA 按钮 */
  action?: BlockAction
  /** 主题 */
  theme?: 'primary' | 'dark' | 'light'
}
