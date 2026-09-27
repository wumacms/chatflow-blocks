import type {
  BlockAction,
  BlockBase,
  BlockImage,
  BlockTag,
} from '../../types/common'

export interface ProductDetailFeature {
  /** 特性图标（Emoji） */
  icon: string
  /** 特性标题 */
  title: string
  /** 特性描述 */
  description: string
}

export interface ProductDetailData extends BlockBase {
  /** 产品名称 */
  name: string
  /** 产品标语 */
  tagline?: string
  /** 产品描述 */
  description?: string
  /** 产品主图 */
  image: BlockImage
  /** 标签 */
  tags?: BlockTag[]
  /** CTA 按钮 */
  actions?: BlockAction[]
  /** 核心特性 */
  features?: ProductDetailFeature[]
}
