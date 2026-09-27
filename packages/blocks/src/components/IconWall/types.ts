import type { BlockBase } from '../../types/common'

export interface IconWallItem {
  /** 图标（推荐 Emoji，无需引入图标库） */
  icon: string
  /** 功能名称 */
  title: string
  /** 功能描述 */
  description: string
}

export interface IconWallData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 功能图标列表 */
  items: IconWallItem[]
}
