<script setup lang="ts">
import { computed } from 'vue'
import type { FooterData } from './types'

const props = defineProps<{
  data: FooterData
}>()

const d = computed(() => ({ ...props.data }))
</script>

<template>
  <footer
    :id="d.id"
    :class="['bg-gray-900 py-8 text-gray-300', d.class]"
  >
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:px-6 md:flex-row lg:px-8"
    >
      <div class="flex items-center gap-2">
        <img
          v-if="d.logo"
          :src="d.logo.src"
          :alt="d.logo.alt ?? d.brand"
          class="h-8 w-auto rounded-md"
        />
        <span class="font-semibold text-white">{{ d.brand }}</span>
      </div>
      <div v-if="d.copyright" class="mt-4 text-sm md:mt-0">
        {{ d.copyright }}
      </div>
    </div>
  </footer>
</template>
