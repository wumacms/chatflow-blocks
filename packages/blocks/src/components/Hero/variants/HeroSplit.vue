<script setup lang="ts">
import type { HeroData } from '../types'
import { useHeroData } from '../useHeroData'
import HeroActions from '../HeroActions.vue'

/**
 * 左右分栏 Hero：文案在左、配图在右，移动端单列堆叠。
 *
 * 变体只决定「骨架与尺度」——栅格、区块内边距、标题字号、描述最大宽度。
 * 颜色 / 字重 / 圆角 / 描边 / 阴影 全部交给 tone 变量，所以本文件同样零风格分支。
 * 标题字号不进 tone，是因为它是响应式的（md: 断点），放进变量会让每个 tone 都要写媒体查询。
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
      'cf-hero relative overflow-hidden antialiased transition-colors duration-300',
      'bg-[color:var(--cf-hero-bg)] bg-[image:var(--cf-hero-bg-image)]',
      'text-[color:var(--cf-hero-text)]',
      'border-b-[length:var(--cf-hero-border-w)] border-b-[color:var(--cf-hero-border-c)] border-solid',
      d.class,
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <div class="space-y-6">
          <h1
            class="cf-hero-title text-5xl tracking-tight md:text-6xl"
            v-html="d.title"
          />

          <p v-if="d.description" class="cf-hero-desc max-w-lg text-xl">
            {{ d.description }}
          </p>

          <HeroActions :actions="actions" class="pt-4" />
        </div>

        <div
          v-if="d.image"
          class="cf-hero-media overflow-hidden border-solid bg-[color:var(--cf-hero-media-bg)] rounded-[var(--cf-hero-media-radius)] border-[length:var(--cf-hero-media-bw)] border-[color:var(--cf-hero-media-bc)] shadow-[var(--cf-hero-media-shadow)]"
        >
          <img
            :src="d.image.src"
            :alt="d.image.alt ?? ''"
            class="cf-hero-media-img h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>
