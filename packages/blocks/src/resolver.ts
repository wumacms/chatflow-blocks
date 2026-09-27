/**
 * 解析结果：与 unplugin-vue-components 的 `ComponentInfo` 结构兼容
 */
export interface ComponentInfo {
  /** 组件名 */
  name: string
  /** 来源包 */
  from: string
  /** 附带引入的副作用文件（如样式） */
  sideEffects?: string[] | undefined
}

/**
 * 解析器对象：与 unplugin-vue-components 的 `ComponentResolverObject` 结构兼容。
 * 这里本地声明一份，避免组件库和用户项目之间的类型依赖冲突。
 */
export interface ComponentResolver {
  type: 'component' | 'directive'
  resolve: (
    name: string
  ) => ComponentInfo | string | null | undefined | void
}

export interface ChatflowBlocksResolverOptions {
  /**
   * 组件前缀，默认无前缀
   */
  prefix?: string
  /**
   * 是否按需引入样式
   * @default true
   */
  importStyle?: boolean
}

const COMPONENT_NAMES = [
  // 布局 & 导航
  'Navbar',
  'Banner',
  'Breadcrumb',
  'Footer',
  // Hero 类
  'Hero',
  'HeroBackground',
  'PageHeader',
  // 内容区块
  'Features',
  'Stats',
  'IconWall',
  'Steps',
  'Timeline',
  'Video',
  // 团队 & 客户
  'Team',
  'Testimonials',
  'Partners',
  'LogoBar',
  // 图文组合
  'ImageText',
  'TopImage',
  // 列表类
  'ProductList',
  'ProductDetail',
  'ServiceList',
  'CourseList',
  'NewsList',
  'NewsDetail',
  // 表格 & 定价
  'Pricing',
  'ComparisonTable',
  // 表单 & 互动
  'ContactForm',
  'CTA',
  'FAQ',
] as const

type ComponentName = (typeof COMPONENT_NAMES)[number]

function isComponentName(name: string): name is ComponentName {
  return (COMPONENT_NAMES as readonly string[]).includes(name)
}

/**
 * unplugin-vue-components 解析器
 *
 * @example
 * ```ts
 * import { ChatflowBlocksResolver } from '@zeldafox/blocks/resolver'
 *
 * Components({
 *   resolvers: [ChatflowBlocksResolver()],
 * })
 * ```
 */
export function ChatflowBlocksResolver(
  options: ChatflowBlocksResolverOptions = {}
): ComponentResolver {
  const { prefix = '', importStyle = true } = options

  return {
    type: 'component',
    resolve: (name: string) => {
      const componentName =
        prefix && name.startsWith(prefix)
          ? name.slice(prefix.length)
          : name

      if (!isComponentName(componentName)) return

      return {
        name: componentName,
        from: '@zeldafox/blocks',
        sideEffects: importStyle
          ? ['@zeldafox/blocks/style.css']
          : undefined,
      }
    },
  }
}

export default ChatflowBlocksResolver
