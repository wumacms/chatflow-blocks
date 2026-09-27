<script setup lang="ts">
import { computed } from 'vue'
import type { ProductListData } from './types'

const props = defineProps<{ data: ProductListData }>()
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
        <div v-for="(p, i) in d.items" :key="i"
             class="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
          <div class="relative h-48 overflow-hidden">
            <img :src="p.image.src" :alt="p.image.alt ?? p.title" class="h-full w-full object-cover" loading="lazy" />
            <span v-if="p.badge"
                  :class="['absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium text-white',
                           p.badgeColor ?? 'bg-indigo-600']">
              {{ p.badge }}
            </span>
          </div>
          <div class="p-6">
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{{ p.title }}</h3>
            <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{{ p.description }}</p>
            <div v-if="p.tags?.length" class="mt-4 flex flex-wrap gap-2">
              <span v-for="(t, j) in p.tags" :key="j"
                    class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {{ t }}
              </span>
            </div>
            <a v-if="p.link" :href="p.link"
               :target="p.newWindow ? '_blank' : undefined"
               :rel="p.newWindow ? 'noopener noreferrer' : undefined"
               class="mt-5 inline-flex items-center text-sm font-medium text-indigo-600 transition group-hover:gap-2 hover:text-indigo-800 dark:text-indigo-400">
              了解详情 <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
