import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import { ChatflowBlocksResolver } from '@zeldafox/blocks/resolver'
import { resolve } from 'node:path'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [ChatflowBlocksResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@zeldafox/blocks': resolve(__dirname, '../packages/blocks/src'),
    },
  },
})
