import { useDark, useToggle } from '@vueuse/core'

export interface UseThemeOptions {
  /** localStorage key */
  storageKey?: string
}

/**
 * 深色模式切换
 *
 * @example
 * ```ts
 * const { isDark, toggleDark } = useTheme()
 * ```
 */
export function useTheme(options: UseThemeOptions = {}) {
  const { storageKey = 'chatflow-theme' } = options

  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
    storageKey,
  })

  const toggleDark = useToggle(isDark)

  return { isDark, toggleDark }
}
