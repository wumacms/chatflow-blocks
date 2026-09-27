<script setup lang="ts">
import { computed } from 'vue'
import type { FAQData } from './types'

const props = defineProps<{
  data: FAQData
}>()

const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section
    :id="d.id"
    :class="['bg-white py-20 dark:bg-gray-950', d.class]"
  >
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <h2
        v-if="d.title"
        class="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white"
      >
        {{ d.title }}
      </h2>
      <div class="space-y-6">
        <div
          v-for="(item, i) in d.items"
          :key="i"
          class="border-b border-gray-200 pb-6 dark:border-gray-800"
        >
          <h3 class="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {{ item.question }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
