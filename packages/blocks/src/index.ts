import type { App, Component, Plugin } from 'vue'

// 预编译样式（构建后产物为 dist/style.css）
import './styles/index.css'

// 组件
export * from './components'

// 类型
export type * from './types'

// 组合式函数
export { useTheme } from './composables/useTheme'
export type { UseThemeOptions } from './composables/useTheme'
export { useMergedData } from './composables/useMergedData'

// 工具函数
export { cn } from './utils/cn'
export { normalizeActions, badgeColor } from './utils/normalize'

// Vue 插件：全量注册
import * as components from './components'

export const ChatflowBlocks: Plugin = {
  install(app: App) {
    Object.entries(components).forEach(([name, comp]) => {
      if (comp && (typeof comp === 'object' || typeof comp === 'function')) {
        app.component(name, comp as unknown as Component)
      }
    })
  },
}

export default ChatflowBlocks
