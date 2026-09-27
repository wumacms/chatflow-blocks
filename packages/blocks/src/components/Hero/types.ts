import type { BlockAction, BlockBase, BlockImage } from '../../types/common'

export interface HeroData extends BlockBase {
  /** 主标题，支持 HTML（如 <br>） */
  title: string
  /** 副标题/描述 */
  description?: string
  /** 按钮列表 */
  actions?: BlockAction[]
  /** 展示图 */
  image?: BlockImage
  /** 变体：default=白底大图，background=背景图 + 遮罩 */
  variant?: 'default' | 'background'
  /** 内容对齐方式 */
  align?: 'center' | 'left'
  /** variant='background' 时的背景图 */
  bgImage?: BlockImage
  /** 遮罩透明度 0-100，仅 variant='background' 有效 */
  overlayOpacity?: number
}
