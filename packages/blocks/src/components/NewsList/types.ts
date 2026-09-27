import type { BlockAction, BlockBase, BlockImage } from '../../types/common'

export interface NewsItem {
  /** 资讯标题 */
  title: string
  /** 摘要 */
  summary: string
  /** 封面图 */
  image: BlockImage
  /** 分类 */
  category?: string
  /** 发布日期 */
  date?: string
  /** 详情页链接 */
  link?: string
  /** 阅读更多链接是否新窗口打开 */
  newWindow?: boolean
}

export interface NewsListData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 资讯列表 */
  items: NewsItem[]
  /** 底部「查看更多」按钮 */
  more?: BlockAction
}
