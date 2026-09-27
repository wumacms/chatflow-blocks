import type { BlockBase, BlockImage } from '../../types/common'

export interface ProductItem {
  /** 产品名称 */
  title: string
  /** 产品简介 */
  description: string
  /** 产品图 */
  image: BlockImage
  /** 标签组 */
  tags?: string[]
  /** 卡片角标文字 */
  badge?: string
  /** 角标背景色（Tailwind 类名，如 `bg-emerald-500`） */
  badgeColor?: string
  /** 详情页链接 */
  link?: string
  /** 详情链接是否新窗口打开 */
  newWindow?: boolean
}

export interface ProductListData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 产品列表 */
  items: ProductItem[]
}
