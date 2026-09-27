<script setup lang="ts">
import { computed } from 'vue'
import type { ProductDetailData } from './types'
import { badgeColor, normalizeActions } from '../../utils/normalize'

const props = defineProps<{ data: ProductDetailData }>()
const d = computed(() => ({ ...props.data }))
const actions = computed(() => normalizeActions(d.value.actions))
</script>

<template>
  <section
    :id="d.id"
    :class="['bg-white py-20 dark:bg-gray-950', d.class]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <!-- 左：图片 -->
        <div>
          <img
            :src="d.image.src"
            :alt="d.image.alt ?? d.name"
            class="h-auto w-full rounded-2xl border border-gray-200 object-cover shadow-lg dark:border-gray-800"
            loading="lazy"
          />
        </div>

        <!-- 右：信息 -->
        <div>
          <div v-if="d.tags?.length" class="mb-4 flex flex-wrap gap-2">
            <span
              v-for="(tag, i) in d.tags"
              :key="i"
              :class="[
                'rounded-full px-3 py-1 text-xs font-medium text-white',
                badgeColor(tag.color),
              ]"
            >
              {{ tag.text }}
            </span>
          </div>
          <h1
            class="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white"
          >
            {{ d.name }}
          </h1>
          <p
            v-if="d.tagline"
            class="mt-2 text-lg font-medium text-indigo-600 dark:text-indigo-400"
          >
            {{ d.tagline }}
          </p>
          <p
            v-if="d.description"
            class="mt-4 text-gray-600 dark:text-gray-300"
          >
            {{ d.description }}
          </p>

          <div
            v-if="actions.length"
            class="mt-8 flex flex-wrap gap-4"
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
                  : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200',
              ]"
            >
              {{ btn.text }}
            </a>
          </div>
        </div>
      </div>

      <!-- 核心特性 -->
      <div
        v-if="d.features?.length"
        class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(f, i) in d.features"
          :key="i"
          class="rounded-xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div
            class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-xl text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
          >
            {{ f.icon }}
          </div>
          <h3
            class="mb-2 font-semibold text-gray-900 dark:text-white"
          >
            {{ f.title }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ f.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
