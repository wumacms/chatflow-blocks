<script setup lang="ts">
import { computed } from 'vue'
import type { HeroBackgroundData } from './types'
import { normalizeActions } from '../../utils/normalize'

const props = defineProps<{
  data: HeroBackgroundData
}>()

const d = computed(() => ({
  overlayOpacity: 50,
  textWhite: true,
  ...props.data,
}))

const actions = computed(() => normalizeActions(d.value.actions))
</script>

<template>
  <section
    :id="d.id"
    :class="[
      'relative overflow-hidden bg-gray-900 py-24 md:py-32',
      d.class,
    ]"
  >
    <!-- 背景图片 -->
    <div class="absolute inset-0 z-0">
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

    <!-- 内容 -->
    <div
      class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      :class="d.textWhite ? 'text-white' : 'text-gray-900'"
    >
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
        v-html="d.title"
      />
      <p
        v-if="d.description"
        class="mx-auto mb-8 max-w-2xl text-lg md:text-xl"
        :class="d.textWhite ? 'text-white/80' : 'text-gray-700'"
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
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : d.textWhite
                ? 'border border-white text-white hover:bg-white/10'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ btn.text }}
        </a>
      </div>
    </div>
  </section>
</template>
