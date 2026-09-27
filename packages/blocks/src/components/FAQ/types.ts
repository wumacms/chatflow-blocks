import type { BlockBase } from '../../types/common'

export interface FAQItem {
  /** 问题 */
  question: string
  /** 回答 */
  answer: string
}

export interface FAQData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** FAQ 列表 */
  items: FAQItem[]
}
