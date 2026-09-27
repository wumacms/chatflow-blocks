<script setup lang="ts">
import { computed } from 'vue'
import type { NewsDetailData } from './types'

const props = defineProps<{ data: NewsDetailData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-white py-20 dark:bg-gray-950', d.class]">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="mb-4 flex items-center gap-3">
        <span v-if="d.category"
              class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {{ d.category }}
        </span>
        <span v-if="d.date" class="text-sm text-gray-400 dark:text-gray-500">{{ d.date }}</span>
      </div>
      <h1 class="mb-6 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl dark:text-white">
        {{ d.title }}
      </h1>
      <figure v-if="d.image" class="mb-8">
        <img :src="d.image.src" :alt="d.image.alt ?? ''"
             class="h-auto w-full rounded-2xl border border-gray-200 object-cover shadow-lg dark:border-gray-800" />
      </figure>
      <div class="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300" v-html="d.body" />
      <div v-if="d.tags?.length" class="mt-8 flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
        <span v-for="(t, i) in d.tags" :key="i"
              class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {{ t }}
        </span>
      </div>
    </div>
  </section>
</template>
