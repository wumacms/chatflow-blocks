<script setup lang="ts">
import { computed } from 'vue'
import type { ImageTextData } from './types'

const props = defineProps<{ data: ImageTextData }>()
const d = computed(() => ({
  imagePosition: 'left' as const,
  bgColor: 'white' as const,
  ...props.data,
}))
const isImageLeft = computed(() => d.value.imagePosition === 'left')
</script>

<template>
  <section :id="d.id"
           :class="['py-20', d.bgColor === 'gray' ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-950', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <div :class="isImageLeft ? 'order-2 md:order-1' : 'order-2'">
          <img :src="d.image.src" :alt="d.image.alt ?? ''"
               class="w-full rounded-2xl border border-gray-200 object-cover shadow-lg dark:border-gray-800" loading="lazy" />
        </div>
        <div :class="isImageLeft ? 'order-1 md:order-2' : 'order-1'">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
          <p v-if="d.description" class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {{ d.description }}
          </p>
          <div v-if="d.tags?.length" class="mt-6 flex flex-wrap gap-3">
            <span v-for="(t, i) in d.tags" :key="i"
                  class="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
