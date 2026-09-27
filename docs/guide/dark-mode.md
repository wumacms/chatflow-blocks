# 深色模式

组件库使用 TailwindCSS 4 的 `dark:` 前缀配合 class 策略实现深色模式：切换 `<html>` 上的 `dark` 类，所有组件立即响应。

## 手动切换

```html
<html class="dark">
```

## 使用 useTheme

```vue
<script setup lang="ts">
import { useTheme } from '@chatflow/blocks'

const { isDark, toggleDark } = useTheme()
</script>

<template>
  <button @click="toggleDark()">
    {{ isDark ? '切换浅色' : '切换深色' }}
  </button>
</template>
```

`useTheme` 基于 `@vueuse/core` 的 `useDark`，默认把状态持久化到 `localStorage` 的 `chatflow-theme` 键下。

## 避免首屏闪烁

在 `<head>` 中插入一段同步脚本，在页面渲染前确定主题：

```html
<script>
  const saved = localStorage.getItem('chatflow-theme')
  const dark = saved === 'true' ||
    (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
</script>
```
