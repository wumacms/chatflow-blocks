import type { Component } from 'vue'
import HeroCentered from './variants/HeroCentered.vue'
import HeroSplit from './variants/HeroSplit.vue'
import HeroBackground from './variants/HeroBackground.vue'
import type { HeroVariant } from './types'

/**
 * 结构变体 → 渲染组件。
 * 新增一种结构 = 在这里加一行 + 新增一个 variants/*.vue，
 * 皮肤（tone）不进这张表，因为它只改 CSS 变量、不改 DOM。
 */
export const heroRegistry: Record<HeroVariant, Component> = {
  centered: HeroCentered,
  split: HeroSplit,
  background: HeroBackground,
}

/**
 * 解析变体对应的组件，缺失时回退到 centered
 */
export function resolveHeroComponent(variant: HeroVariant): Component {
  return heroRegistry[variant] ?? heroRegistry.centered
}
