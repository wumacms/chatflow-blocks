import type { BlockBase } from '../../types/common'

export interface FeatureItem {
  /** 图标（Emoji） */
  icon: string
  /** 标题 */
  title: string
  /** 描述 */
  description: string
}

export interface FeaturesData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 特性列表 */
  items: FeatureItem[]
  /** 列数 */
  columns?: 2 | 3 | 4
  /** 背景色 */
  bgColor?: 'white' | 'gray'
}
