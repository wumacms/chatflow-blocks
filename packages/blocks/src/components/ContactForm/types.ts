import type { BlockBase } from '../../types/common'

export interface FormField {
  /** 字段名，作为提交数据的 key */
  name: string
  /** 表单标签文案 */
  label: string
  /** 控件类型 */
  type: 'text' | 'email' | 'textarea' | 'select'
  /** 占位提示 */
  placeholder?: string
  /** 是否必填 */
  required?: boolean
  /** `type: 'select'` 时的下拉选项 */
  options?: { label: string; value: string }[]
  /**
   * 字段宽度：
   * - `half`：与相邻 half 字段并排（sm 断点以上两列）
   * - `full`：独占一行
   * 仅对 `text` / `email` 生效，其余类型恒为 full。
   */
  width?: 'half' | 'full'
}

export interface ContactFormData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 表单字段列表 */
  fields: FormField[]
  /** 提交按钮文案，默认 '发送消息' */
  submitText?: string
  /** 表单底部说明（隐私条款等） */
  footerNote?: string
}
