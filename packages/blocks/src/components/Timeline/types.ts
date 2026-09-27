import type { BlockBase } from '../../types/common'

export interface TimelineItem {
  /** 时间（如 2020、Q1 2024） */
  time: string
  /** 标题 */
  title: string
  /** 描述 */
  description?: string
  /** 图标（Emoji，可选） */
  icon?: string
}

export interface TimelineData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 时间节点列表 */
  items: TimelineItem[]
}
