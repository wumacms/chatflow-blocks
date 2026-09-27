<script setup lang="ts">
import { computed } from 'vue'
import type { HeroData } from './types'
import { normalizeActions } from '../../utils/normalize'

const props = defineProps<{
  data: HeroData
}>()

const d = computed(() => ({
  variant: 'default' as const,
  align: 'center' as const,
  overlayOpacity: 50,
  ...props.data,
}))

const actions = computed(() => normalizeActions(d.value.actions))
</script>

<template>
  <section
    :id="d.id"
    :class="[
      'relative overflow-hidden py-16 md:py-24',
      d.variant === 'background'
        ? 'bg-gray-900'
        : 'bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900',
      d.class,
    ]"
  >
    <!-- 背景图模式 -->
    <div
      v-if="d.variant === 'background' && d.bgImage"
      class="absolute inset-0 z-0"
    >
      <img
        :src="d.bgImage.src"
        :alt="d.bgImage.alt ?? ''"
        class="h-full w-full object-cover"
      />
      <div
        class="absolute inset-0 bg-black"
        :style="{ opacity: d.overlayOpacity / 100 }"
      />
    </div>

    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        :class="[
          'mx-auto max-w-3xl',
          d.align === 'center' ? 'text-center' : 'text-left',
        ]"
      >
        <h1
          class="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl"
          :class="
            d.variant === 'background'
              ? 'text-white'
              : 'text-gray-900 dark:text-white'
          "
          v-html="d.title"
        />

        <p
          v-if="d.description"
          class="mb-10 text-lg"
          :class="
            d.variant === 'background'
              ? 'text-white/80'
              : 'text-gray-600 dark:text-gray-300'
          "
        >
          {{ d.description }}
        </p>

        <div
          v-if="actions.length"
          class="flex flex-wrap gap-4"
          :class="d.align === 'center' ? 'justify-center' : 'justify-start'"
        >
          <a
            v-for="(btn, i) in actions"
            :key="i"
            :href="btn.link"
            :target="btn.newWindow ? '_blank' : undefined"
            :rel="btn.newWindow ? 'noopener noreferrer' : undefined"
            :class="[
              'rounded-full px-6 py-3 font-medium shadow-sm transition',
              btn.primary
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : d.variant === 'background'
                  ? 'border border-white text-white hover:bg-white/10'
                  : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200',
            ]"
          >
            {{ btn.text }}
          </a>
        </div>
      </div>

      <div
        v-if="d.image && d.variant === 'default'"
        class="mx-auto mt-16 max-w-5xl"
      >
        <img
          :src="d.image.src"
          :alt="d.image.alt ?? ''"
          class="h-auto w-full rounded-xl border border-gray-200 object-cover shadow-2xl dark:border-gray-800"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>
