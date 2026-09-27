<script setup lang="ts">
import { computed } from 'vue'
import type { IconWallData } from './types'

const props = defineProps<{ data: IconWallData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-white py-20 dark:bg-gray-950', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div v-for="(item, i) in d.items" :key="i"
             class="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 p-6 transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-2xl text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {{ item.icon }}
          </div>
          <h3 class="font-semibold text-gray-800 dark:text-gray-100">{{ item.title }}</h3>
          <p class="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
