import type { BlockAction, BlockBase } from '../../types/common'

export interface ServiceItem {
  /** 图标（推荐 Emoji） */
  icon: string
  /** 服务名称 */
  title: string
  /** 服务描述 */
  description: string
  /** 服务要点列表 */
  points?: string[]
  /** 详情页链接 */
  link?: string
  /** 详情链接是否新窗口打开 */
  newWindow?: boolean
}

export interface ServiceListData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 服务列表 */
  items: ServiceItem[]
  /** 底部「查看更多」按钮 */
  more?: BlockAction
}
