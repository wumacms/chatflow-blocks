import type { BlockAction, BlockBase } from '../../types/common'

export interface CTAData extends BlockBase {
  /** 标题 */
  title: string
  /** 描述 */
  description?: string
  /** 按钮列表 */
  actions?: BlockAction[]
  /** 主题 */
  theme?: 'primary' | 'dark'
}
