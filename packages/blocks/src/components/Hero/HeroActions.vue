<script setup lang="ts">
import type { BlockAction } from '../../types/common'

/**
 * Hero 按钮组，被所有结构变体共用。
 *
 * 按钮的外观 100% 由 `--cf-hero-btn-*` 变量决定，所以 centered / split 可以
 * 复用同一份标记——变体只负责容器怎么摆，不负责按钮长什么样。
 * 外层容器类名由使用方通过 class 透传（Vue 会合并到根节点）。
 */
defineProps<{
  actions: Required<BlockAction>[]
}>()
</script>

<template>
  <div v-if="actions.length" class="flex flex-wrap gap-4">
    <a
      v-for="(btn, i) in actions"
      :key="i"
      :href="btn.link"
      :target="btn.newWindow ? '_blank' : undefined"
      :rel="btn.newWindow ? 'noopener noreferrer' : undefined"
      :class="[
        'cf-hero-btn inline-block transition',
        'rounded-[var(--cf-hero-btn-radius)] border-solid',
        'px-[var(--cf-hero-btn-px)] py-[var(--cf-hero-btn-py)]',
        btn.primary
          ? 'bg-[color:var(--cf-hero-btn-primary-bg)] text-[color:var(--cf-hero-btn-primary-text)] border-[length:var(--cf-hero-btn-primary-bw)] border-[color:var(--cf-hero-btn-primary-bc)] shadow-[var(--cf-hero-btn-primary-shadow)] hover:bg-[color:var(--cf-hero-btn-primary-bg-hover)] hover:text-[color:var(--cf-hero-btn-primary-text-hover)] hover:shadow-[var(--cf-hero-btn-primary-shadow-hover)]'
          : 'bg-[color:var(--cf-hero-btn-secondary-bg)] text-[color:var(--cf-hero-btn-secondary-text)] border-[length:var(--cf-hero-btn-secondary-bw)] border-[color:var(--cf-hero-btn-secondary-bc)] shadow-[var(--cf-hero-btn-secondary-shadow)] hover:bg-[color:var(--cf-hero-btn-secondary-bg-hover)] hover:text-[color:var(--cf-hero-btn-secondary-text-hover)] hover:border-[color:var(--cf-hero-btn-secondary-bc-hover)] hover:shadow-[var(--cf-hero-btn-secondary-shadow-hover)]',
      ]"
    >
      {{ btn.text }}
    </a>
  </div>
</template>
