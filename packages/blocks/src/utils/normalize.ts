import type { BlockAction } from '../types/common'

/**
 * 归一化按钮数组：
 * - link 默认 '#'
 * - 首个按钮默认 primary
 * - newWindow 默认 false
 */
export function normalizeActions(
  actions?: BlockAction[]
): Required<BlockAction>[] {
  return (actions ?? []).map((a, i) => ({
    text: a.text,
    link: a.link ?? '#',
    primary: a.primary ?? i === 0,
    newWindow: a.newWindow ?? false,
  }))
}

/**
 * 归一化颜色名称为 Tailwind 类名
 */
export function badgeColor(color?: string): string {
  const map: Record<string, string> = {
    primary: 'bg-indigo-600',
    gray: 'bg-gray-500',
    green: 'bg-green-600',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    rose: 'bg-rose-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
  }
  return map[color ?? 'primary'] ?? 'bg-indigo-600'
}
