<script setup lang="ts">
import type { HeroData } from '../types'
import { useHeroData } from '../useHeroData'

/**
 * 背景图 + 遮罩 Hero。
 *
 * 对比度由背景图决定，因此**不消费 tone**（tone 仅对 centered / split 生效）。
 * 这样设计是刻意的：photo + pale 色块会让文字不可读，与其提供一组必然出错的
 * 组合，不如在契约上就把它关掉。
 */
const props = defineProps<{
  data: HeroData
}>()

const { d, actions } = useHeroData(() => props.data)
</script>

<template>
  <section
    :id="d.id"
    :class="['relative overflow-hidden bg-gray-900 py-24 md:py-32', d.class]"
  >
    <div v-if="d.bgImage" class="absolute inset-0 z-0">
      <img
        :src="d.bgImage.src"
        :alt="d.bgImage.alt ?? ''"
        class="h-full w-full object-cover"
      />
      <div
        class="absolute inset-0 bg-black"
        :style="{ opacity: d.overlayOpacity / 100 }"
      />
    </div>

    <div
      class="relative z-10 mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8"
    >
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
        v-html="d.title"
      />
      <p
        v-if="d.description"
        class="mx-auto mb-8 max-w-2xl text-lg text-white/80 md:text-xl"
      >
        {{ d.description }}
      </p>
      <div v-if="actions.length" class="flex flex-wrap justify-center gap-4">
        <a
          v-for="(btn, i) in actions"
          :key="i"
          :href="btn.link"
          :target="btn.newWindow ? '_blank' : undefined"
          :rel="btn.newWindow ? 'noopener noreferrer' : undefined"
          :class="[
            'rounded-full px-6 py-3 font-medium shadow-md transition',
            btn.primary
              ? 'bg-[color:var(--cf-primary)] text-white hover:bg-[color:var(--cf-primary-hover)]'
              : 'border border-white text-white hover:bg-white/10',
          ]"
        >
          {{ btn.text }}
        </a>
      </div>
    </div>
  </section>
</template>
