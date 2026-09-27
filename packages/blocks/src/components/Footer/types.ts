import type { BlockBase, BlockImage } from '../../types/common'

export interface FooterData extends BlockBase {
  /** 品牌名称 */
  brand: string
  /** Logo */
  logo?: BlockImage
  /** 版权信息 */
  copyright?: string
}
