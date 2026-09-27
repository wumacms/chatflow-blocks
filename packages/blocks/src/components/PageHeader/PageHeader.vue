<script setup lang="ts">
import { computed } from 'vue'
import type { PageHeaderData } from './types'

const props = defineProps<{ data: PageHeaderData }>()
const d = computed(() => ({
  align: 'center' as const,
  bgColor: 'gray' as const,
  ...props.data,
}))

const bgClass = computed(() => {
  switch (d.value.bgColor) {
    case 'white':
      return 'bg-white dark:bg-gray-950'
    case 'primary':
      return 'bg-indigo-600'
    case 'gray':
    default:
      return 'bg-gray-50 dark:bg-gray-900'
  }
})

const isPrimary = computed(() => d.value.bgColor === 'primary')
</script>

<template>
  <section
    :id="d.id"
    :class="['py-16 md:py-20', bgClass, d.class]"
  >
    <div
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      :class="d.align === 'center' ? 'text-center' : 'text-left'"
    >
      <h1
        class="text-3xl font-extrabold tracking-tight md:text-4xl"
        :class="
          isPrimary
            ? 'text-white'
            : 'text-gray-900 dark:text-white'
        "
      >
        {{ d.title }}
      </h1>
      <p
        v-if="d.description"
        class="mt-4 max-w-2xl text-lg"
        :class="[
          isPrimary
            ? 'text-indigo-100'
            : 'text-gray-600 dark:text-gray-400',
          d.align === 'center' ? 'mx-auto' : '',
        ]"
      >
        {{ d.description }}
      </p>
    </div>
  </section>
</template>
