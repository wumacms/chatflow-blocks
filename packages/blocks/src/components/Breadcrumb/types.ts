import type { BlockBase } from '../../types/common'

export interface BreadcrumbItem {
  /** 显示文字 */
  text: string
  /** 链接地址（最后一项通常无链接） */
  link?: string
}

export interface BreadcrumbData extends BlockBase {
  /** 层级列表，按从外到内排列 */
  items: BreadcrumbItem[]
}
