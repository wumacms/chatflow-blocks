<script setup lang="ts">
import { computed } from 'vue'
import type { ComparisonTableData } from './types'

const props = defineProps<{ data: ComparisonTableData }>()
const d = computed(() => ({ firstColHeader: '功能', ...props.data }))

const headerColor = (c?: string) =>
  c === 'primary' ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'

const cellColor = (c?: string) => {
  switch (c) {
    case 'green': return 'text-green-600 dark:text-green-400'
    case 'red': return 'text-red-400 dark:text-red-400'
    case 'yellow': return 'text-yellow-500 dark:text-yellow-400'
    default: return 'text-gray-700 dark:text-gray-300'
  }
}
</script>

<template>
  <section :id="d.id" :class="['bg-gray-50 py-20 dark:bg-gray-900', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-950">
        <table class="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">{{ d.firstColHeader }}</th>
              <th v-for="(h, i) in d.headers" :key="i" :class="['px-6 py-4 text-left font-semibold', headerColor(h.color)]">
                {{ h.text }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="(row, i) in d.rows" :key="i">
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{{ row.feature }}</td>
              <td v-for="(cell, j) in row.columns" :key="j" :class="['px-6 py-4', cellColor(cell.color)]">
                {{ cell.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
