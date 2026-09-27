# CLI 初始化

`@zeldafox/blocks` 提供一条命令完成接入，无需手动改配置。

```bash
npx @zeldafox/blocks init
```

也可通过 pnpm / npm 调用：

```bash
pnpm dlx @zeldafox/blocks init
```

## 它会做什么

命令在你的项目根目录执行，按顺序完成三步：

1. **检测项目类型** —— 查找 `vite.config.ts|js` 或 `nuxt.config.ts|js`
2. **改写 Vite 配置** —— 插入 `Components` 插件与 `ChatflowBlocksResolver`
3. **引入样式** —— 在 `src/main.ts|js` 顶部加入 `import '@zeldafox/blocks/style.css'`

执行前后的 `vite.config.ts` 对比：

```diff
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
+ import Components from 'unplugin-vue-components/vite'
+ import { ChatflowBlocksResolver } from '@zeldafox/blocks/resolver'

  export default defineConfig({
-   plugins: [vue()],
+   plugins: [
+     vue(),
+     Components({ resolvers: [ChatflowBlocksResolver()] }),
+   ],
  })
```

`src/main.ts`：

```diff
+ import '@zeldafox/blocks/style.css'
  import { createApp } from 'vue'
  import App from './App.vue'
```

## 幂等性

命令可以重复执行，每一项改动都会先检查是否已存在：

| 检查项                                | 已存在时的行为   |
| ------------------------------------- | ---------------- |
| 配置中已含 `ChatflowBlocksResolver`   | 跳过，提示 ✔ 已包含 |
| 已 import `unplugin-vue-components`   | 不重复插入该行   |
| `main.ts` 已引入 `style.css`          | 跳过             |

::: warning
CLI 会对 `vite.config.ts` 与 `src/main.ts` 做**字符串插入**，建议先提交一次 Git，方便 diff 与回滚。
:::

## 未覆盖的情况

| 情况                       | 表现                                             | 处理                                    |
| -------------------------- | ------------------------------------------------ | --------------------------------------- |
| 目录中没有配置文件         | 报 `未检测到 Vite 或 Nuxt 项目` 并以 code 1 退出 | 在项目根目录执行                        |
| Nuxt 项目                  | 提示「Nuxt 模块暂未内置」并以 code 0 退出        | 参见[自动导入](./auto-import)手动配置   |
| 配置里没有 `plugins:` 字段 | 提示手动添加 `Components` 插件                   | 按自动导入页面补上 plugins              |
| 找不到 `src/main.ts`       | 提示手动引入样式                                 | 在入口手动加 `import '@zeldafox/blocks/style.css'` |

::: tip
Nuxt 用户可把 `Components({ resolvers: [ChatflowBlocksResolver()] })` 配到 `nuxt.config.ts` 的 `vite.plugins` 中。
:::

## 手动配置

想自己控制改动范围时，跳过 CLI，直接按[自动导入](./auto-import)配置即可。
