<script setup lang="ts">
import { computed } from 'vue'
import type { VideoData } from './types'

const props = defineProps<{ data: VideoData }>()
const d = computed(() => ({
  type: 'video' as const,
  aspectRatio: '16/9' as const,
  ...props.data,
}))

const aspectClass = computed(() => {
  switch (d.value.aspectRatio) {
    case '4/3':
      return 'aspect-[4/3]'
    case '1/1':
      return 'aspect-square'
    case '16/9':
    default:
      return 'aspect-video'
  }
})
</script>

<template>
  <section
    :id="d.id"
    :class="['bg-white py-20 dark:bg-gray-950', d.class]"
  >
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-10 text-center">
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

      <div
        :class="[
          'overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-800',
          aspectClass,
        ]"
      >
        <iframe
          v-if="d.type === 'iframe'"
          :src="d.src"
          class="h-full w-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        />
        <video
          v-else
          :src="d.src"
          :poster="d.poster?.src"
          class="h-full w-full object-cover"
          controls
          playsinline
          preload="metadata"
        />
      </div>
    </div>
  </section>
</template>
