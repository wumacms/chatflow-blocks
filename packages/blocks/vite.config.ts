import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        resolver: resolve(__dirname, 'src/resolver.ts'),
      },
      name: 'ChatflowBlocks',
      formats: ['es', 'cjs'],
      fileName: (format, name) =>
        `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named',
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'style.css' : assetInfo.name!,
      },
    },
    cssCodeSplit: false,
  },
})
