import type { BlockBase, BlockImage } from '../../types/common'

export interface LogoBarItem {
  /** 品牌名称（作为 Logo 的 alt 文本） */
  name: string
  /** Logo 图片 */
  logo: BlockImage
  /** 点击跳转链接 */
  link?: string
}

export interface LogoBarData extends BlockBase {
  /** Logo 列表 */
  items: LogoBarItem[]
  /** 是否显示灰度效果，默认 true */
  grayscale?: boolean
}
