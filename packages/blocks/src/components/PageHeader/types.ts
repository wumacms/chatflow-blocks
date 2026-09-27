import type { BlockBase } from '../../types/common'

export interface PageHeaderData extends BlockBase {
  /** 页面标题，支持 HTML（如 <br>） */
  title: string
  /** 页面描述 */
  description?: string
  /** 对齐方式，默认 'center' */
  align?: 'center' | 'left'
  /** 背景色 */
  bgColor?: 'white' | 'gray' | 'primary'
}
