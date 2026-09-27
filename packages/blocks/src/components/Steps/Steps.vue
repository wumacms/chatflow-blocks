<script setup lang="ts">
import { computed } from 'vue'
import type { StepsData } from './types'

const props = defineProps<{ data: StepsData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section
    :id="d.id"
    :class="['bg-white py-20 dark:bg-gray-950', d.class]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-14 text-center">
        <h2
          v-if="d.title"
          class="text-3xl font-bold text-gray-900 dark:text-white"
        >
          {{ d.title }}
        </h2>
        <p
          v-if="d.description"
          class="mt-2 text-lg text-gray-600 dark:text-gray-400"
        >
          {{ d.description }}
        </p>
      </div>

      <div class="relative">
        <!-- 连接线（仅桌面端） -->
        <div
          class="absolute left-0 right-0 top-8 hidden h-0.5 bg-gray-200 md:block dark:bg-gray-800"
          aria-hidden="true"
        />

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="(step, i) in d.items"
            :key="i"
            class="relative flex flex-col items-center text-center"
          >
            <div
              class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white shadow-lg dark:bg-indigo-500"
            >
              <span v-if="step.icon">{{ step.icon }}</span>
              <span v-else>{{ step.number }}</span>
            </div>
            <h3
              class="mt-6 text-xl font-bold text-gray-900 dark:text-white"
            >
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
