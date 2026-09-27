import type { BlockBase, BlockImage } from '../../types/common'

export interface VideoData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 视频地址（mp4 或 iframe 嵌入地址） */
  src: string
  /** 视频类型，默认 'video' */
  type?: 'video' | 'iframe'
  /** 视频封面 */
  poster?: BlockImage
  /** 宽高比 */
  aspectRatio?: '16/9' | '4/3' | '1/1'
}
