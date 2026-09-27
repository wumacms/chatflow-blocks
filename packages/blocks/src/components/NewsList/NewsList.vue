<script setup lang="ts">
import { computed } from 'vue'
import type { NewsListData } from './types'

const props = defineProps<{ data: NewsListData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-gray-50 py-20 dark:bg-gray-900', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="(n, i) in d.items" :key="i"
                 class="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-800">
          <img :src="n.image.src" :alt="n.image.alt ?? n.title" class="h-48 w-full object-cover" loading="lazy" />
          <div class="flex flex-1 flex-col p-6">
            <div class="mb-3 flex items-center justify-between">
              <span v-if="n.category"
                    class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {{ n.category }}
              </span>
              <span v-if="n.date" class="text-sm text-gray-400 dark:text-gray-500">{{ n.date }}</span>
            </div>
            <h3 class="mb-2 text-lg font-semibold leading-tight text-gray-900 dark:text-white">{{ n.title }}</h3>
            <p class="flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{{ n.summary }}</p>
            <a v-if="n.link" :href="n.link"
               :target="n.newWindow ? '_blank' : undefined"
               :rel="n.newWindow ? 'noopener noreferrer' : undefined"
               class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400">
              阅读更多 <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </div>
      <div v-if="d.more" class="mt-12 text-center">
        <a :href="d.more.link ?? '#'"
           :target="d.more.newWindow ? '_blank' : undefined"
           :rel="d.more.newWindow ? 'noopener noreferrer' : undefined"
           class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
          {{ d.more.text }}
        </a>
      </div>
    </div>
  </section>
</template>
