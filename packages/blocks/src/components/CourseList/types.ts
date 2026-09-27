import type { BlockAction, BlockBase, BlockImage } from '../../types/common'

export interface CourseTag {
  /** 标签文字 */
  text: string
  /** 标签配色 */
  color?: string
}

export interface CourseItem {
  /** 课程标题 */
  title: string
  /** 课程简介 */
  description: string
  /** 封面图 */
  image: BlockImage
  /** 标签组 */
  tags?: CourseTag[]
  /** 课时时长，如 '12 小时' */
  duration?: string
  /** 章节数，如 '48 节' */
  chapters?: string
  /** 讲师姓名 */
  instructor?: string
  /** 评分，如 '4.9' */
  rating?: string
  /** 评分人数，如 '2,341 人评价' */
  ratingCount?: string
  /** 价格，如 '¥299' */
  price?: string
  /** 卡片按钮 */
  button?: BlockAction
}

export interface CourseListData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 课程列表 */
  items: CourseItem[]
  /** 底部「查看更多」按钮 */
  more?: BlockAction
}
