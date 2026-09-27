<script setup lang="ts">
import { computed } from 'vue'
import type { BannerData } from './types'

const props = defineProps<{ data: BannerData }>()
const d = computed(() => ({
  theme: 'primary' as const,
  ...props.data,
}))

const themeClass = computed(() => {
  switch (d.value.theme) {
    case 'dark':
      return 'bg-gray-900 text-white'
    case 'light':
      return 'bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
    case 'primary':
    default:
      return 'bg-indigo-600 text-white'
  }
})
</script>

<template>
  <div :id="d.id" :class="['w-full py-3', themeClass, d.class]">
    <div
      class="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 sm:px-6 lg:px-8"
    >
      <span v-if="d.icon" class="text-lg">{{ d.icon }}</span>
      <span class="text-sm font-medium">{{ d.text }}</span>
      <a
        v-if="d.action"
        :href="d.action.link ?? '#'"
        :target="d.action.newWindow ? '_blank' : undefined"
        :rel="d.action.newWindow ? 'noopener noreferrer' : undefined"
        class="ml-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold transition hover:bg-white/30"
      >
        {{ d.action.text }} →
      </a>
    </div>
  </div>
</template>
