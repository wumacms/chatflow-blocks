import { computed, type ComputedRef } from 'vue'

/**
 * 合并用户数据与默认值
 *
 * @example
 * ```ts
 * const d = useMergedData(props.data, { variant: 'default', align: 'center' })
 * ```
 */
export function useMergedData<T extends object>(
  data: T,
  defaults: Partial<T>
): ComputedRef<T & Required<Partial<T>>> {
  return computed(
    () => ({ ...defaults, ...data }) as T & Required<Partial<T>>
  )
}
