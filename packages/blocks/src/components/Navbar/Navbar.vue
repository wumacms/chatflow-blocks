<script setup lang="ts">
import { computed } from 'vue'
import type { NavbarData } from './types'
import { normalizeActions } from '../../utils/normalize'

const props = defineProps<{
  data: NavbarData
}>()

const d = computed(() => ({
  ...props.data,
}))

const actions = computed(() => normalizeActions(d.value.actions))
</script>

<template>
  <header
    :id="d.id"
    :class="[
      'sticky top-0 z-20 border-b border-gray-100 bg-white/80 backdrop-blur-sm',
      'dark:border-gray-800 dark:bg-gray-950/80',
      d.class,
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between md:h-20">
        <!-- Logo -->
        <a href="/" class="flex shrink-0 items-center gap-3">
          <img
            v-if="d.logo"
            :src="d.logo.src"
            :alt="d.logo.alt ?? d.brand"
            class="h-8 w-auto rounded-lg shadow-sm"
          />
          <span class="text-xl font-semibold tracking-tight text-gray-800 dark:text-white">
            {{ d.brand }}
          </span>
        </a>

        <!-- 导航菜单 -->
        <nav class="hidden items-center space-x-1 md:flex lg:space-x-2">
          <div
            v-for="(link, i) in d.links ?? []"
            :key="i"
            class="group relative"
          >
            <!-- 有二级菜单 -->
            <button
              v-if="link.children?.length"
              type="button"
              class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
            >
              {{ link.text }}
              <svg
                class="h-4 w-4 transition-transform group-hover:rotate-180"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <!-- 无二级菜单 -->
            <a
              v-else
              :href="link.link ?? '#'"
              :target="link.newWindow ? '_blank' : undefined"
              :rel="link.newWindow ? 'noopener noreferrer' : undefined"
              class="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
            >
              {{ link.text }}
            </a>

            <!-- 二级菜单 -->
            <div
              v-if="link.children?.length"
              :class="[
                'invisible absolute left-0 z-30 mt-1 rounded-xl border border-gray-100 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:border-gray-800 dark:bg-gray-900',
                link.menuWidth ?? 'w-56',
              ]"
            >
              <div class="py-2">
                <a
                  v-for="(child, j) in link.children"
                  :key="j"
                  :href="child.link ?? '#'"
                  :target="child.newWindow ? '_blank' : undefined"
                  :rel="child.newWindow ? 'noopener noreferrer' : undefined"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
                >
                  <span v-if="child.icon" class="text-indigo-500">{{ child.icon }}</span>
                  {{ child.text }}
                </a>
              </div>
            </div>
          </div>
        </nav>

        <!-- 右侧按钮 -->
        <div class="flex items-center gap-3">
          <a
            v-for="(btn, i) in actions"
            :key="i"
            :href="btn.link"
            :target="btn.newWindow ? '_blank' : undefined"
            :rel="btn.newWindow ? 'noopener noreferrer' : undefined"
            :class="[
              'hidden items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors sm:inline-flex',
              btn.primary
                ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800',
            ]"
          >
            {{ btn.text }}
          </a>

          <!-- 移动端菜单占位 -->
          <button
            type="button"
            class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="打开菜单"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
