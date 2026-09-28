<script setup lang="ts">
import type { HeroData } from '../types'
import { useHeroData } from '../useHeroData'
import HeroActions from '../HeroActions.vue'

/**
 * 居中大图 Hero。
 *
 * 零 v-if 是硬约束：除「字段为空不渲染」外不得出现风格分支。
 * 所有视觉差异由 `--cf-hero-*` 变量驱动，切换 tone 只需换一组变量值。
 * 图片外框常驻，classic 下靠 `--cf-hero-media-bw: 0` + 透明背景视觉隐身。
 */
const props = defineProps<{
  data: HeroData
}>()

const { d, actions } = useHeroData(() => props.data)
</script>

<template>
  <section
    :id="d.id"
    :data-cf-tone="d.tone"
    :class="[
      'cf-hero relative overflow-hidden pt-16 pb-20 antialiased transition-colors duration-300',
      'bg-[color:var(--cf-hero-bg)] bg-[image:var(--cf-hero-bg-image)]',
      'text-[color:var(--cf-hero-text)]',
      'border-b-[length:var(--cf-hero-border-w)] border-b-[color:var(--cf-hero-border-c)] border-solid',
      d.class,
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        :class="[
          'mx-auto max-w-3xl',
          d.align === 'center' ? 'text-center' : 'text-left',
        ]"
      >
        <h1
          class="cf-hero-title mb-6 text-4xl tracking-tight md:text-5xl"
          v-html="d.title"
        />

        <p v-if="d.description" class="cf-hero-desc mb-10 text-lg">
          {{ d.description }}
        </p>

        <HeroActions
          :actions="actions"
          :class="d.align === 'center' ? 'justify-center' : 'justify-start'"
        />
      </div>

      <div
        v-if="d.image"
        class="cf-hero-media mx-auto mt-16 max-w-5xl overflow-hidden border-solid bg-[color:var(--cf-hero-media-bg)] rounded-[var(--cf-hero-media-radius)] border-[length:var(--cf-hero-media-bw)] border-[color:var(--cf-hero-media-bc)] shadow-[var(--cf-hero-media-shadow)]"
      >
        <img
          :src="d.image.src"
          :alt="d.image.alt ?? ''"
          class="cf-hero-media-img h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>
