import { describe, expect, it } from 'vitest'
import { cn } from '../cn'
import { badgeColor, normalizeActions } from '../normalize'

describe('cn', () => {
  it('合并字符串类名', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('忽略假值', () => {
    expect(cn('a', undefined, null, false, 'b')).toBe('a b')
  })

  it('支持对象语法', () => {
    expect(cn('a', { 'text-center': true, hidden: false })).toBe(
      'a text-center'
    )
  })
})

describe('normalizeActions', () => {
  it('首个按钮默认为主按钮', () => {
    const result = normalizeActions([{ text: 'A' }, { text: 'B' }])
    expect(result[0].primary).toBe(true)
    expect(result[1].primary).toBe(false)
  })

  it('link 默认为 #', () => {
    const result = normalizeActions([{ text: 'A' }])
    expect(result[0].link).toBe('#')
  })

  it('保留显式指定的 primary', () => {
    const result = normalizeActions([
      { text: 'A', primary: false },
      { text: 'B', primary: true },
    ])
    expect(result[0].primary).toBe(false)
    expect(result[1].primary).toBe(true)
  })

  it('空输入返回空数组', () => {
    expect(normalizeActions()).toEqual([])
  })
})

describe('badgeColor', () => {
  it('默认返回品牌色', () => {
    expect(badgeColor()).toBe('bg-indigo-600')
  })

  it('支持预定义颜色', () => {
    expect(badgeColor('emerald')).toBe('bg-emerald-500')
  })

  it('未知颜色回退到品牌色', () => {
    expect(badgeColor('not-a-color')).toBe('bg-indigo-600')
  })
})
