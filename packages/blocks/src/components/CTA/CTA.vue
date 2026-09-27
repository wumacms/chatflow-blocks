<script setup lang="ts">
import { computed } from 'vue'
import type { CTAData } from './types'
import { normalizeActions } from '../../utils/normalize'

const props = defineProps<{
  data: CTAData
}>()

const d = computed(() => ({
  theme: 'primary' as const,
  ...props.data,
}))

const actions = computed(() => normalizeActions(d.value.actions))
</script>

<template>
  <section
    :id="d.id"
    :class="[
      'py-16',
      d.theme === 'primary' ? 'bg-indigo-600' : 'bg-gray-900',
      d.class,
    ]"
  >
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <h2 class="mb-4 text-3xl font-bold text-white">{{ d.title }}</h2>
      <p v-if="d.description" class="mb-8 text-lg text-indigo-100">
        {{ d.description }}
      </p>
      <div v-if="actions.length" class="flex flex-wrap justify-center gap-4">
        <a
          v-for="(btn, i) in actions"
          :key="i"
          :href="btn.link"
          :target="btn.newWindow ? '_blank' : undefined"
          :rel="btn.newWindow ? 'noopener noreferrer' : undefined"
          :class="[
            'rounded-full px-6 py-3 font-medium transition',
            btn.primary
              ? 'bg-white text-indigo-600 shadow-lg hover:bg-gray-100'
              : 'border border-white text-white hover:bg-indigo-500',
          ]"
        >
          {{ btn.text }}
        </a>
      </div>
    </div>
  </section>
</template>
