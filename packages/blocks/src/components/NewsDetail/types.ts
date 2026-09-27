import type { BlockBase, BlockImage } from '../../types/common'

export interface NewsDetailData extends BlockBase {
  /** 文章分类 */
  category?: string
  /** 发布日期 */
  date?: string
  /** 文章标题 */
  title: string
  /** 题图 */
  image?: BlockImage
  /** 正文，支持 HTML */
  body: string
  /** 文章标签 */
  tags?: string[]
}
