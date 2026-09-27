<script setup lang="ts">
import { computed } from 'vue'
import type { StatsData } from './types'

const props = defineProps<{
  data: StatsData
}>()

const d = computed(() => ({
  theme: 'primary' as const,
  ...props.data,
}))
</script>

<template>
  <section
    :id="d.id"
    :class="[
      'py-16',
      d.theme === 'primary'
        ? 'bg-indigo-600 text-white'
        : 'bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white',
      d.class,
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        <div v-for="(stat, i) in d.items" :key="i">
          <div class="text-4xl font-bold">{{ stat.value }}</div>
          <div
            class="mt-2"
            :class="
              d.theme === 'primary'
                ? 'text-indigo-100'
                : 'text-gray-500 dark:text-gray-400'
            "
          >
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
