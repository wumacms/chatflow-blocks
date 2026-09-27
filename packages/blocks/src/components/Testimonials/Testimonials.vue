<script setup lang="ts">
import { computed } from 'vue'
import type { TestimonialsData } from './types'

const props = defineProps<{ data: TestimonialsData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-white py-20 dark:bg-gray-950', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-14 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-lg text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="grid gap-8 md:grid-cols-3">
        <div v-for="(item, i) in d.items" :key="i"
             class="rounded-2xl border border-gray-100 bg-gray-50/80 p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div class="mb-4 flex items-center gap-1 text-lg text-amber-400">
            <span>{{ '★ '.repeat(item.rating ?? 5).trim() }}</span>
          </div>
          <p class="mb-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">“{{ item.quote }}”</p>
          <div class="flex items-center gap-3">
            <img :src="item.avatar.src" :alt="item.avatar.alt ?? item.name"
                 class="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-800" loading="lazy" />
            <div>
              <div class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ item.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.position }} · {{ item.company }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
