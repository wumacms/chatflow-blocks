import type { BlockAction, BlockBase } from '../../types/common'

export interface PricingPlan {
  /** 方案名称，如 '专业版' */
  name: string
  /** 价格，如 '¥99' */
  price: string
  /** 价格单位，如 '/月' */
  unit?: string
  /** 权益清单，每行一条，换行分隔 */
  features: string
  /** 方案按钮 */
  button: BlockAction
  /** 卡片角标文字，如 '最受欢迎' */
  badge?: string
  /** 是否高亮为主推方案 */
  primary?: boolean
}

export interface PricingData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 定价方案列表 */
  plans: PricingPlan[]
}
