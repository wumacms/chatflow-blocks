<script setup lang="ts">
import { computed } from 'vue'
import type { LogoBarData } from './types'

const props = defineProps<{ data: LogoBarData }>()
const d = computed(() => ({
  grayscale: true,
  ...props.data,
}))
</script>

<template>
  <section
    :id="d.id"
    :class="['bg-white py-10 dark:bg-gray-950', d.class]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        :class="d.grayscale ? 'opacity-70 grayscale' : ''"
      >
        <component
          :is="item.link ? 'a' : 'div'"
          v-for="(item, i) in d.items"
          :key="i"
          :href="item.link"
          class="flex flex-col items-center"
        >
          <img
            :src="item.logo.src"
            :alt="item.logo.alt ?? item.name"
            class="h-10 w-auto"
            loading="lazy"
          />
          <span class="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {{ item.name }}
          </span>
        </component>
      </div>
    </div>
  </section>
</template>
