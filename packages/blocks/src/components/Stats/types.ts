import type { BlockBase } from '../../types/common'

export interface StatItem {
  /** 数值，如 '98%' */
  value: string
  /** 标签，如 '客户留存率' */
  label: string
}

export interface StatsData extends BlockBase {
  /** 统计项列表 */
  items: StatItem[]
  /** 主题：primary=品牌色背景，light=浅色背景 */
  theme?: 'primary' | 'light'
}
