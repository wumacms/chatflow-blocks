import type { BlockBase, BlockImage } from '../../types/common'

export interface PartnerItem {
  /** 合作方名称（作为 Logo 的 alt 文本） */
  name: string
  /** Logo 图片 */
  logo: BlockImage
}

export interface PartnersData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 合作方列表 */
  items: PartnerItem[]
}
