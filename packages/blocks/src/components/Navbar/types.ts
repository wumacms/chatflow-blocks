import type { BlockAction, BlockBase, BlockImage, BlockLink } from '../../types/common'

export interface NavbarData extends BlockBase {
  /** 品牌名称 */
  brand: string
  /** Logo 图片 */
  logo?: BlockImage
  /** 导航链接（支持二级菜单） */
  links?: BlockLink[]
  /** 右侧 CTA 按钮 */
  actions?: BlockAction[]
}
