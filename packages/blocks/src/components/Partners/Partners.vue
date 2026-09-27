<script setup lang="ts">
import { computed } from 'vue'
import type { PartnersData } from './types'

const props = defineProps<{ data: PartnersData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['border-y border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-gray-950', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale md:gap-12">
        <div v-for="(p, i) in d.items" :key="i" class="flex flex-col items-center">
          <img :src="p.logo.src" :alt="p.logo.alt ?? p.name" class="h-10 w-auto" loading="lazy" />
          <span class="mt-1 text-xs text-gray-400 dark:text-gray-500">{{ p.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
