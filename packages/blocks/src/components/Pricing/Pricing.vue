<script setup lang="ts">
import { computed } from 'vue'
import type { PricingData } from './types'

const props = defineProps<{ data: PricingData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-gray-50 py-20 dark:bg-gray-900', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="grid gap-8 md:grid-cols-3">
        <div v-for="(plan, i) in d.plans" :key="i"
             :class="['relative rounded-2xl bg-white p-8 dark:bg-gray-800',
                      plan.primary ? 'border-2 border-indigo-200 shadow-md dark:border-indigo-800' : 'border border-gray-200 shadow-sm dark:border-gray-700']">
          <span v-if="plan.badge"
                class="absolute right-8 top-0 rounded-b-lg bg-indigo-600 px-3 py-1 text-sm text-white">
            {{ plan.badge }}
          </span>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ plan.name }}</h3>
          <p class="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
            {{ plan.price }}
            <span v-if="plan.unit" class="text-base font-normal text-gray-500 dark:text-gray-400">{{ plan.unit }}</span>
          </p>
          <div class="mt-6 space-y-3 whitespace-pre-line text-gray-600 dark:text-gray-300">{{ plan.features }}</div>
          <a :href="plan.button.link ?? '#'"
             :class="['mt-8 block w-full rounded-full py-2 text-center font-medium transition',
                      plan.primary ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700']">
            {{ plan.button.text }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
