import type { BlockBase, BlockImage } from '../../types/common'

export interface TestimonialItem {
  /** 客户评价正文 */
  quote: string
  /** 客户姓名 */
  name: string
  /** 客户职位 */
  position: string
  /** 所属公司 */
  company: string
  /** 客户头像 */
  avatar: BlockImage
  /** 星级评分 1-5 */
  rating?: number
}

export interface TestimonialsData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 客户证言列表 */
  items: TestimonialItem[]
}
