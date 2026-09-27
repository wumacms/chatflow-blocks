import type { BlockBase, BlockImage } from '../../types/common'

export interface TopImageData extends BlockBase {
  /** 区块标题，支持 HTML（如 <br>） */
  title: string
  /** 正文描述 */
  description?: string
  /** 标题下方的通栏配图 */
  image: BlockImage
}
