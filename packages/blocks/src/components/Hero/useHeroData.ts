import {
  computed,
  toValue,
  type ComputedRef,
  type MaybeRefOrGetter,
} from 'vue'
import type { BlockAction } from '../../types/common'
import { normalizeActions } from '../../utils/normalize'
import type { HeroData, HeroTone, HeroVariant } from './types'

/** 归一化后的 Hero 数据：变体与色调一定已解析为合法值 */
export interface ResolvedHeroData extends HeroData {
  variant: HeroVariant
  tone: HeroTone
  align: 'center' | 'left'
  overlayOpacity: number
}

/**
 * 归一化结构变体
 * `'default'` 归一为 `'centered'`；未知值静默回退，不抛错。
 */
export function normalizeVariant(variant?: string): HeroVariant {
  if (variant === 'split') return 'split'
  if (variant === 'background') return 'background'
  return 'centered'
}

/**
 * 归一化皮肤色调，未知值静默回退到 `classic`
 */
export function normalizeTone(tone?: string): HeroTone {
  if (tone === 'brutal') return 'brutal'
  if (tone === 'amber') return 'amber'
  return 'classic'
}

export interface UseHeroDataReturn {
  /** 归一化后的数据 */
  d: ComputedRef<ResolvedHeroData>
  /** 归一化后的按钮列表 */
  actions: ComputedRef<Required<BlockAction>[]>
}

/**
 * Hero 共享的归一化逻辑：合并默认值 + 归一 variant/tone + 归一按钮。
 * 每个变体组件都调用它，避免各自重复一遍。
 *
 * @param source Hero 数据，支持传值 / ref / getter（传 getter 才能响应整体替换）
 */
export function useHeroData(
  source: MaybeRefOrGetter<HeroData>
): UseHeroDataReturn {
  const d = computed<ResolvedHeroData>(() => {
    const data = toValue(source)
    const merged: HeroData = {
      align: 'center',
      overlayOpacity: 50,
      ...data,
    }
    return {
      ...merged,
      variant: normalizeVariant(data.variant),
      tone: normalizeTone(data.tone),
      align: merged.align === 'left' ? 'left' : 'center',
      overlayOpacity: merged.overlayOpacity ?? 50,
    } as ResolvedHeroData
  })

  const actions = computed(() => normalizeActions(d.value.actions))

  return { d, actions }
}
