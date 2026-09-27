<script setup lang="ts">
import { computed } from 'vue'
import type { CourseListData } from './types'

const props = defineProps<{ data: CourseListData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section :id="d.id" :class="['bg-gray-50 py-20 dark:bg-gray-900', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(c, i) in d.items" :key="i"
             class="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-800">
          <div class="relative h-52 overflow-hidden">
            <img :src="c.image.src" :alt="c.image.alt ?? c.title"
                 class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            <div v-if="c.tags?.length" class="absolute left-3 top-3 flex gap-2">
              <span v-for="(t, j) in c.tags" :key="j"
                    :class="['rounded-full px-3 py-1 text-xs font-medium text-white', t.color ?? 'bg-indigo-600']">
                {{ t.text }}
              </span>
            </div>
            <div v-if="c.duration"
                 class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {{ c.duration }}
            </div>
          </div>
          <div class="p-6">
            <div class="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span v-if="c.chapters">📚 {{ c.chapters }} 章节</span>
              <span v-if="c.instructor">👨‍🏫 {{ c.instructor }}</span>
            </div>
            <h3 class="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">{{ c.title }}</h3>
            <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{{ c.description }}</p>
            <div class="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
              <div class="flex items-center gap-1">
                <span class="text-sm text-amber-400">{{ c.rating ?? '★★★★★' }}</span>
                <span v-if="c.ratingCount" class="ml-1 text-xs text-gray-400">({{ c.ratingCount }})</span>
              </div>
              <div class="flex items-center gap-3">
                <span v-if="c.price" class="text-lg font-bold text-indigo-600 dark:text-indigo-400">{{ c.price }}</span>
                <a v-if="c.button" :href="c.button.link ?? '#'"
                   :target="c.button.newWindow ? '_blank' : undefined"
                   :rel="c.button.newWindow ? 'noopener noreferrer' : undefined"
                   class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                  {{ c.button.text }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="d.more" class="mt-14 text-center">
        <a :href="d.more.link ?? '#'"
           :target="d.more.newWindow ? '_blank' : undefined"
           :rel="d.more.newWindow ? 'noopener noreferrer' : undefined"
           class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
          {{ d.more.text }}
        </a>
      </div>
    </div>
  </section>
</template>
