/**
 * 合并类名
 */
export function cn(
  ...classes: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  return classes
    .filter(Boolean)
    .map((c) => {
      if (typeof c === 'string') return c
      if (typeof c === 'object' && c !== null) {
        return Object.entries(c)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(' ')
      }
      return ''
    })
    .join(' ')
    .trim()
}
