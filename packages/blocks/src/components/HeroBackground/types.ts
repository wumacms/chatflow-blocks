import type { BlockAction, BlockBase, BlockImage } from '../../types/common'

export interface HeroBackgroundData extends BlockBase {
  /** 主标题，支持 HTML（如 <br>） */
  title: string
  /** 副标题/描述 */
  description?: string
  /** 按钮列表 */
  actions?: BlockAction[]
  /** 背景图片 */
  bgImage: BlockImage
  /** 遮罩透明度 0-100，默认 50 */
  overlayOpacity?: number
  /** 文字是否使用白色，默认 true */
  textWhite?: boolean
}
