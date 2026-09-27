import type { BlockBase, BlockImage } from '../../types/common'

export interface ImageTextData extends BlockBase {
  /** 区块标题，支持 HTML（如 <br>） */
  title: string
  /** 正文描述 */
  description?: string
  /** 配图 */
  image: BlockImage
  /** 标签组（渲染为胶囊） */
  tags?: string[]
  /** 图片位置，left = 左图右文，right = 左文右图，默认 'left' */
  imagePosition?: 'left' | 'right'
  /** 背景色，默认 'white' */
  bgColor?: 'white' | 'gray'
}
