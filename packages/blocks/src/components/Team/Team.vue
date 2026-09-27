<script setup lang="ts">
import { computed } from 'vue'
import type { TeamData } from './types'

const props = defineProps<{ data: TeamData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-white py-20 dark:bg-gray-950', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div v-for="(m, i) in d.members" :key="i" class="text-center">
          <img :src="m.avatar.src" :alt="m.avatar.alt ?? m.name"
               class="mx-auto h-32 w-32 rounded-full border-2 border-white object-cover shadow-md dark:border-gray-800" loading="lazy" />
          <h3 class="mt-4 font-semibold text-gray-900 dark:text-white">{{ m.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ m.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
