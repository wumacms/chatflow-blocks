<script setup lang="ts">
import { computed } from 'vue'
import type { ServiceListData } from './types'

const props = defineProps<{ data: ServiceListData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-white py-20 dark:bg-gray-950', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-14 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-lg text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(s, i) in d.items" :key="i"
             class="group rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-indigo-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-800">
          <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-3xl text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950 dark:text-indigo-300">
            {{ s.icon }}
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">{{ s.title }}</h3>
          <p class="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{{ s.description }}</p>
          <ul v-if="s.points?.length" class="mb-6 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li v-for="(pt, j) in s.points" :key="j" class="flex items-center gap-2">✓ {{ pt }}</li>
          </ul>
          <a v-if="s.link" :href="s.link"
             :target="s.newWindow ? '_blank' : undefined"
             :rel="s.newWindow ? 'noopener noreferrer' : undefined"
             class="inline-flex items-center text-sm font-medium text-indigo-600 transition-all group-hover:gap-2 hover:text-indigo-800 dark:text-indigo-400">
            了解详情 <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div v-if="d.more" class="mt-14 text-center">
        <a :href="d.more.link ?? '#'"
           :target="d.more.newWindow ? '_blank' : undefined"
           :rel="d.more.newWindow ? 'noopener noreferrer' : undefined"
           class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
          {{ d.more.text }}
        </a>
      </div>
    </div>
  </section>
</template>
