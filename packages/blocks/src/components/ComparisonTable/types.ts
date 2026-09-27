import type { BlockBase } from '../../types/common'

export interface ComparisonHeader {
  /** 表头文字 */
  text: string
  /** 表头配色，用于突出自家产品 */
  color?: 'primary' | 'gray'
}

export interface ComparisonCell {
  /** 单元格内容，常用 ✓ / ✗ / 文字 */
  value: string
  /** 单元格配色 */
  color?: 'green' | 'red' | 'yellow' | 'gray'
}

export interface ComparisonRow {
  /** 行首的能力/功能名称 */
  feature: string
  /** 各列的对比结果，顺序需与 `headers` 对应 */
  columns: ComparisonCell[]
}

export interface ComparisonTableData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 首列表头文字，默认 '功能' */
  firstColHeader?: string
  /** 对比列的表头（竞品 / 方案） */
  headers: ComparisonHeader[]
  /** 对比数据行 */
  rows: ComparisonRow[]
}
