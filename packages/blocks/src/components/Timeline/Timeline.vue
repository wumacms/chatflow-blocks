<script setup lang="ts">
import { computed } from 'vue'
import type { TimelineData } from './types'

const props = defineProps<{ data: TimelineData }>()
const d = computed(() => ({ ...props.data }))
</script>

<template>
  <section
    :id="d.id"
    :class="['bg-gray-50 py-20 dark:bg-gray-900', d.class]"
  >
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
        <!-- 竖线 -->
        <div
          class="absolute left-4 top-0 h-full w-0.5 bg-gray-200 md:left-1/2 md:-translate-x-1/2 dark:bg-gray-800"
          aria-hidden="true"
        />

        <div class="space-y-8">
          <div
            v-for="(item, i) in d.items"
            :key="i"
            class="relative flex items-start gap-6 md:items-center"
            :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <!-- 内容卡片 -->
            <div class="ml-12 flex-1 md:ml-0">
              <div
                class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800"
              >
                <div
                  class="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  {{ item.time }}
                </div>
                <h3
                  class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >
                  {{ item.icon }} {{ item.title }}
                </h3>
                <p
                  v-if="item.description"
                  class="text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ item.description }}
                </p>
              </div>
            </div>

            <!-- 节点圆点 -->
            <div
              class="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-indigo-600 ring-4 ring-white md:left-1/2 md:top-1/2 md:-translate-y-1/2 dark:ring-gray-900 dark:bg-indigo-400"
            />

            <!-- 占位（保持对称） -->
            <div class="hidden flex-1 md:block" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
