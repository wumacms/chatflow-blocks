import type { BlockBase } from '../../types/common'

export interface StepItem {
  /** 步骤编号（如 1、2、3） */
  number: string
  /** 步骤标题 */
  title: string
  /** 步骤描述 */
  description: string
  /** 图标（Emoji，可选） */
  icon?: string
}

export interface StepsData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 步骤列表 */
  items: StepItem[]
}
