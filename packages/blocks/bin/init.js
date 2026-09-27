#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 简易 ANSI 颜色（避免引入依赖）
const colors = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
}

const log = {
  info: (s) => console.log(colors.cyan('▸ ') + s),
  ok: (s) => console.log(colors.green('✔ ') + s),
  warn: (s) => console.log(colors.yellow('⚠ ') + s),
  error: (s) => console.log(colors.red('✖ ') + s),
}

function findFirst(paths) {
  return paths.find((p) => existsSync(p))
}

async function main() {
  const cwd = process.cwd()
  log.info('初始化 @chatflow/blocks')

  // 1. 检测项目类型
  const isVite = existsSync(resolve(cwd, 'vite.config.ts')) || existsSync(resolve(cwd, 'vite.config.js'))
  const isNuxt = existsSync(resolve(cwd, 'nuxt.config.ts')) || existsSync(resolve(cwd, 'nuxt.config.js'))

  if (!isVite && !isNuxt) {
    log.error('未检测到 Vite 或 Nuxt 项目，请手动配置。')
    log.info('参考文档：https://github.com/chatflow/blocks')
    process.exit(1)
  }

  if (isNuxt) {
    log.warn('检测到 Nuxt 项目，Nuxt 模块暂未内置。请参考文档手动配置。')
    process.exit(0)
  }

  // 2. 写入 vite.config
  const viteConfigPath = findFirst([
    resolve(cwd, 'vite.config.ts'),
    resolve(cwd, 'vite.config.js'),
  ])

  let viteContent = readFileSync(viteConfigPath, 'utf-8')

  if (viteContent.includes('ChatflowBlocksResolver')) {
    log.ok('vite.config 已包含 ChatflowBlocksResolver，跳过')
  } else {
    const importLines = []
    if (!viteContent.includes('unplugin-vue-components')) {
      importLines.push(`import Components from 'unplugin-vue-components/vite'`)
    }
    importLines.push(`import { ChatflowBlocksResolver } from '@chatflow/blocks/resolver'`)

    // 在第一个 import 之后插入
    const firstImportIndex = viteContent.search(/^import\s/m)
    if (firstImportIndex !== -1) {
      viteContent =
        viteContent.slice(0, firstImportIndex) +
        importLines.join('\n') +
        '\n' +
        viteContent.slice(firstImportIndex)
    } else {
      viteContent = importLines.join('\n') + '\n' + viteContent
    }

    // 插入 plugin
    if (viteContent.includes('plugins:')) {
      viteContent = viteContent.replace(
        /plugins:\s*\[/,
        `plugins: [\n    Components({ resolvers: [ChatflowBlocksResolver()] }),`
      )
    } else {
      log.warn('未找到 plugins 配置，请手动添加 Components 插件')
    }

    writeFileSync(viteConfigPath, viteContent)
    log.ok(`已更新 ${viteConfigPath.split('/').pop()}`)
  }

  // 3. 在 main.ts 引入样式
  const mainPath = findFirst([
    resolve(cwd, 'src/main.ts'),
    resolve(cwd, 'src/main.js'),
  ])

  if (mainPath) {
    let mainContent = readFileSync(mainPath, 'utf-8')
    if (!mainContent.includes('@chatflow/blocks/style.css')) {
      mainContent = `import '@chatflow/blocks/style.css'\n${mainContent}`
      writeFileSync(mainPath, mainContent)
      log.ok(`已在 ${mainPath.split('/').pop()} 引入样式`)
    } else {
      log.ok('main.ts 已引入样式，跳过')
    }
  } else {
    log.warn('未找到 src/main.ts，请手动引入 "@chatflow/blocks/style.css"')
  }

  console.log('')
  log.ok(colors.green('🎉 完成！现在可以用 <Hero>、<Features> 等组件了'))
  console.log('')
  console.log(colors.gray('示例：'))
  console.log(colors.gray(`  <script setup lang="ts">`))
  console.log(colors.gray(`  import type { HeroData } from '@chatflow/blocks'`))
  console.log(colors.gray(`  const hero: HeroData = { title: 'Hello', image: { src: '/hero.png' } }`))
  console.log(colors.gray(`  </script>`))
  console.log(colors.gray(`  <template>`))
  console.log(colors.gray(`    <Hero :data="hero" />`))
  console.log(colors.gray(`  </template>`))
}

main().catch((err) => {
  log.error(err.message)
  process.exit(1)
})
