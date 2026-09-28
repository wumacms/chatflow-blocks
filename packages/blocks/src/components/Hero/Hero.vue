<script setup lang="ts">
import { computed } from 'vue'
import type { HeroData } from './types'
import { useHeroData } from './useHeroData'
import { resolveHeroComponent } from './registry'

/**
 * Hero 调度器。
 *
 * 只做三件事：归一化数据 → 查 registry → 渲染对应结构变体。
 * 皮肤（tone）不在这里分支，它只是往下传的一个字段，由 CSS 变量消化。
 */
const props = defineProps<{
  data: HeroData
}>()

const { d } = useHeroData(() => props.data)
const Comp = computed(() => resolveHeroComponent(d.value.variant))
</script>

<template>
  <component :is="Comp" :data="d" />
</template>
