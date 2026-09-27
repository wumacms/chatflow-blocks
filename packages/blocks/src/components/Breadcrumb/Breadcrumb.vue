<script setup lang="ts">
import { computed } from 'vue'
import type { BreadcrumbData } from './types'

const props = defineProps<{ data: BreadcrumbData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <nav
    :id="d.id"
    :class="[
      'border-b border-gray-100 bg-white py-4 dark:border-gray-800 dark:bg-gray-950',
      d.class,
    ]"
    aria-label="面包屑"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ol class="flex flex-wrap items-center gap-2 text-sm">
        <li
          v-for="(item, i) in d.items"
          :key="i"
          class="flex items-center gap-2"
        >
          <a
            v-if="item.link && i < d.items.length - 1"
            :href="item.link"
            class="text-gray-500 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            {{ item.text }}
          </a>
          <span
            v-else
            class="font-medium text-gray-900 dark:text-white"
          >
            {{ item.text }}
          </span>
          <span
            v-if="i < d.items.length - 1"
            class="text-gray-300 dark:text-gray-600"
            aria-hidden="true"
          >
            /
          </span>
        </li>
      </ol>
    </div>
  </nav>
</template>
