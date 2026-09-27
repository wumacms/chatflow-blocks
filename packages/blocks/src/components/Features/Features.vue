<script setup lang="ts">
import { computed } from 'vue'
import type { FeaturesData } from './types'

const props = defineProps<{
  data: FeaturesData
}>()

const d = computed(() => ({
  columns: 4 as const,
  bgColor: 'gray' as const,
  ...props.data,
}))

const gridCols = computed(() => {
  switch (d.value.columns) {
    case 2:
      return 'grid-cols-1 sm:grid-cols-2'
    case 3:
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    case 4:
    default:
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }
})
</script>

<template>
  <section
    :id="d.id"
    :class="[
      'py-20',
      d.bgColor === 'gray'
        ? 'bg-gray-50 dark:bg-gray-900'
        : 'bg-white dark:bg-gray-950',
      d.class,
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2
          v-if="d.title"
          class="text-3xl font-bold text-gray-900 dark:text-white"
        >
          {{ d.title }}
        </h2>
        <p
          v-if="d.description"
          class="mt-2 text-gray-600 dark:text-gray-400"
        >
          {{ d.description }}
        </p>
      </div>

      <div class="grid gap-8" :class="gridCols">
        <div
          v-for="(item, i) in d.items"
          :key="i"
          class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
        >
          <div
            class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-xl text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
          >
            {{ item.icon }}
          </div>
          <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
            {{ item.title }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
