<script setup lang="ts">
import { computed } from 'vue'
import type { TopImageData } from './types'

const props = defineProps<{ data: TopImageData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-white py-20 dark:bg-gray-950', d.class]">
    <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <h2 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
      <p v-if="d.description" class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
        {{ d.description }}
      </p>
      <div class="mt-12">
        <img :src="d.image.src" :alt="d.image.alt ?? ''"
             class="mx-auto h-auto w-full max-w-5xl rounded-2xl border border-gray-200 object-cover shadow-xl dark:border-gray-800" loading="lazy" />
      </div>
    </div>
  </section>
</template>
