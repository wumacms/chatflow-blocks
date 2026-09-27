import { describe, expect, it } from 'vitest'
import { ChatflowBlocksResolver } from '../resolver'

const resolver = ChatflowBlocksResolver()

function resolve(name: string) {
  return (
    resolver as {
      resolve: (n: string) =>
        | { name: string; from: string; sideEffects?: string[] }
        | undefined
    }
  ).resolve(name)
}

describe('ChatflowBlocksResolver', () => {
  it('解析已知组件', () => {
    const result = resolve('Hero')
    expect(result).toBeDefined()
    expect(result!.name).toBe('Hero')
    expect(result!.from).toBe('@chatflow/blocks')
  })

  it('默认附带样式副作用', () => {
    expect(resolve('Features')!.sideEffects).toEqual([
      '@chatflow/blocks/style.css',
    ])
  })

  it('importStyle=false 时不附带样式', () => {
    const r = ChatflowBlocksResolver({ importStyle: false }) as {
      resolve: (n: string) => { sideEffects?: string[] } | undefined
    }
    expect(r.resolve('Features')!.sideEffects).toBeUndefined()
  })

  it('支持前缀', () => {
    const r = ChatflowBlocksResolver({ prefix: 'Cf' }) as {
      resolve: (n: string) => { name: string } | undefined
    }
    expect(r.resolve('CfHero')!.name).toBe('Hero')
  })

  it('忽略未知组件', () => {
    expect(resolve('NotAComponent')).toBeUndefined()
  })

  it('覆盖全部 30 个组件', () => {
    const names = [
      'Navbar',
      'Banner',
      'Breadcrumb',
      'Footer',
      'Hero',
      'HeroBackground',
      'PageHeader',
      'Features',
      'Stats',
      'IconWall',
      'Steps',
      'Timeline',
      'Video',
      'Team',
      'Testimonials',
      'Partners',
      'LogoBar',
      'ImageText',
      'TopImage',
      'ProductList',
      'ProductDetail',
      'ServiceList',
      'CourseList',
      'NewsList',
      'NewsDetail',
      'Pricing',
      'ComparisonTable',
      'ContactForm',
      'CTA',
      'FAQ',
    ]
    expect(names).toHaveLength(30)
    names.forEach((n) => expect(resolve(n)).toBeDefined())
  })
})
