import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Navbar from '../Navbar/Navbar.vue'
import Hero from '../Hero/Hero.vue'
import type { HeroData, HeroTone } from '../Hero/types'
import { heroRegistry, resolveHeroComponent } from '../Hero/registry'
import { normalizeTone, normalizeVariant } from '../Hero/useHeroData'
import Features from '../Features/Features.vue'
import Stats from '../Stats/Stats.vue'
import CTA from '../CTA/CTA.vue'
import FAQ from '../FAQ/FAQ.vue'
import Footer from '../Footer/Footer.vue'
import Pricing from '../Pricing/Pricing.vue'
import ContactForm from '../ContactForm/ContactForm.vue'
import ComparisonTable from '../ComparisonTable/ComparisonTable.vue'
import ImageText from '../ImageText/ImageText.vue'

describe('Navbar', () => {
  it('渲染品牌名与导航链接', () => {
    const wrapper = mount(Navbar, {
      props: {
        data: {
          brand: 'Acme',
          links: [{ text: '产品', link: '/product' }],
          actions: [{ text: '免费试用', link: '/signup' }],
        },
      },
    })
    expect(wrapper.text()).toContain('Acme')
    expect(wrapper.text()).toContain('产品')
    expect(wrapper.text()).toContain('免费试用')
  })

  it('带 children 的链接渲染为下拉按钮', () => {
    const wrapper = mount(Navbar, {
      props: {
        data: {
          brand: 'Acme',
          links: [
            { text: '产品', children: [{ text: '概览', link: '/p' }] },
          ],
        },
      },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toContain('概览')
  })

  it('支持 id 与附加类名', () => {
    const wrapper = mount(Navbar, {
      props: { data: { brand: 'Acme', id: 'nav', class: 'custom' } },
    })
    const header = wrapper.find('header')
    expect(header.attributes('id')).toBe('nav')
    expect(header.classes()).toContain('custom')
  })
})

describe('Hero', () => {
  it('渲染标题（支持 HTML）与描述', () => {
    const wrapper = mount(Hero, {
      props: {
        data: {
          title: 'Hello<br>World',
          description: '一段描述',
        },
      },
    })
    expect(wrapper.find('h1').html()).toContain('<br>')
    expect(wrapper.text()).toContain('一段描述')
  })

  it('center 对齐时按钮容器居中', () => {
    const wrapper = mount(Hero, {
      props: {
        data: { title: 'T', actions: [{ text: '开始' }], align: 'center' },
      },
    })
    expect(wrapper.html()).toContain('justify-center')
  })

  it('background 变体渲染背景图与遮罩', () => {
    const wrapper = mount(Hero, {
      props: {
        data: {
          title: 'T',
          variant: 'background',
          bgImage: { src: '/bg.png', alt: '' },
          overlayOpacity: 60,
        },
      },
    })
    const overlay = wrapper.find('div.absolute.inset-0.bg-black')
    expect(overlay.exists()).toBe(true)
    expect(overlay.attributes('style')).toContain('0.6')
  })

  it('默认 tone 为 classic，并写到 data-cf-tone 上', () => {
    const wrapper = mount(Hero, { props: { data: { title: 'T' } } })
    expect(wrapper.find('section').attributes('data-cf-tone')).toBe('classic')
  })

  it('tone=brutal 时切换到 brutal 预设', () => {
    const wrapper = mount(Hero, {
      props: { data: { title: 'T', tone: 'brutal' } },
    })
    expect(wrapper.find('section').attributes('data-cf-tone')).toBe('brutal')
  })

  it('非法 tone 静默回退到 classic', () => {
    const wrapper = mount(Hero, {
      props: { data: { title: 'T', tone: 'neon' } as HeroData },
    })
    expect(wrapper.find('section').attributes('data-cf-tone')).toBe('classic')
  })

  it('旧值 variant=default 仍渲染 centered（无背景遮罩）', () => {
    const wrapper = mount(Hero, {
      props: { data: { title: 'T', variant: 'default' } },
    })
    expect(wrapper.find('div.absolute.inset-0.bg-black').exists()).toBe(false)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('非法 variant 静默回退到 centered', () => {
    const wrapper = mount(Hero, {
      props: { data: { title: 'T', variant: 'carousel' } as HeroData },
    })
    expect(wrapper.find('div.absolute.inset-0.bg-black').exists()).toBe(false)
  })

  it('标题中的 <mark> 不被转义，用于局部高亮', () => {
    const wrapper = mount(Hero, {
      props: { data: { title: '<mark>高亮</mark>后续' } },
    })
    expect(wrapper.find('h1 mark').exists()).toBe(true)
    expect(wrapper.find('h1 mark').text()).toBe('高亮')
  })

  it('split 变体渲染左右两列栅格', () => {
    const wrapper = mount(Hero, {
      props: { data: { title: 'T', variant: 'split' } },
    })
    expect(wrapper.html()).toContain('md:grid-cols-2')
    expect(wrapper.find('div.absolute.inset-0.bg-black').exists()).toBe(false)
  })

  it('split 与 centered 渲染出不同的 DOM 骨架', () => {
    const data: HeroData = { title: 'T', description: 'D', image: { src: '/a.png' } }
    const centered = mount(Hero, { props: { data } }).html()
    const split = mount(Hero, {
      props: { data: { ...data, variant: 'split' } },
    }).html()
    expect(split).not.toBe(centered)
  })

  it('tone=amber 时切换到 amber 预设', () => {
    const wrapper = mount(Hero, {
      props: { data: { title: 'T', tone: 'amber' } },
    })
    expect(wrapper.find('section').attributes('data-cf-tone')).toBe('amber')
  })

  it('三种 tone 在同一变体下只改 data-cf-tone，DOM 结构一致', () => {
    const data: HeroData = {
      title: 'T',
      description: 'D',
      actions: [{ text: 'A' }, { text: 'B' }],
      image: { src: '/a.png' },
    }
    const base = mount(Hero, { props: { data } }).html()
    const tones: HeroTone[] = ['brutal', 'amber']
    tones.forEach((tone) => {
      const html = mount(Hero, { props: { data: { ...data, tone } } }).html()
      expect(html.replace(`data-cf-tone="${tone}"`, 'data-cf-tone="classic"')).toBe(
        base
      )
    })
  })

  it('同一份数据切换 tone 不改变 DOM 结构', () => {
    const data: HeroData = {
      title: 'T',
      description: 'D',
      actions: [{ text: 'A' }, { text: 'B' }],
      image: { src: '/a.png' },
    }
    const classic = mount(Hero, { props: { data } }).html()
    const brutal = mount(Hero, { props: { data: { ...data, tone: 'brutal' } } })
      .html()
    // 去掉 tone 标记后，两者结构应完全一致
    expect(brutal.replace('data-cf-tone="brutal"', 'data-cf-tone="classic"')).toBe(
      classic
    )
  })
})

describe('Hero 风格归一化', () => {
  it('variant：default 与非法值都归一到 centered', () => {
    expect(normalizeVariant()).toBe('centered')
    expect(normalizeVariant('default')).toBe('centered')
    expect(normalizeVariant('unknown')).toBe('centered')
    expect(normalizeVariant('split')).toBe('split')
    expect(normalizeVariant('background')).toBe('background')
  })

  it('tone：未知值归一到 classic', () => {
    expect(normalizeTone()).toBe('classic')
    expect(normalizeTone('brutal')).toBe('brutal')
    expect(normalizeTone('amber')).toBe('amber')
    expect(normalizeTone('neon')).toBe('classic')
  })

  it('split 已实现，registry 不再回退到 centered', () => {
    expect(heroRegistry.split).not.toBe(heroRegistry.centered)
  })

  it('registry 的每个 key 都能解析出组件', () => {
    Object.keys(heroRegistry).forEach((key) => {
      expect(resolveHeroComponent(key as never)).toBeTruthy()
    })
  })

  it('registry 缺失的 key 回退到 centered', () => {
    expect(resolveHeroComponent('carousel' as never)).toBe(
      heroRegistry.centered
    )
  })
})

describe('Features', () => {
  it('渲染全部特性项', () => {
    const wrapper = mount(Features, {
      props: {
        data: {
          title: '核心能力',
          items: [
            { icon: '⚡', title: '极速', description: '快' },
            { icon: '🎨', title: '统一', description: '稳' },
          ],
        },
      },
    })
    expect(wrapper.text()).toContain('核心能力')
    expect(wrapper.text()).toContain('极速')
    expect(wrapper.text()).toContain('统一')
  })

  it('columns=2 时使用两列栅格', () => {
    const wrapper = mount(Features, {
      props: { data: { items: [], columns: 2 } },
    })
    expect(wrapper.html()).toContain('sm:grid-cols-2')
    expect(wrapper.html()).not.toContain('lg:grid-cols-4')
  })

  it('默认 4 列', () => {
    const wrapper = mount(Features, { props: { data: { items: [] } } })
    expect(wrapper.html()).toContain('lg:grid-cols-4')
  })
})

describe('Stats', () => {
  it('渲染数值与标签', () => {
    const wrapper = mount(Stats, {
      props: {
        data: { items: [{ value: '98%', label: '留存率' }] },
      },
    })
    expect(wrapper.text()).toContain('98%')
    expect(wrapper.text()).toContain('留存率')
  })

  it('primary 主题使用品牌色背景', () => {
    const wrapper = mount(Stats, { props: { data: { items: [] } } })
    expect(wrapper.html()).toContain('bg-indigo-600')
  })
})

describe('CTA', () => {
  it('渲染标题与按钮', () => {
    const wrapper = mount(CTA, {
      props: {
        data: { title: '立即开始', actions: [{ text: '注册' }] },
      },
    })
    expect(wrapper.text()).toContain('立即开始')
    expect(wrapper.text()).toContain('注册')
  })
})

describe('FAQ', () => {
  it('渲染全部问答', () => {
    const wrapper = mount(FAQ, {
      props: {
        data: {
          title: '常见问题',
          items: [{ question: 'Q1', answer: 'A1' }],
        },
      },
    })
    expect(wrapper.text()).toContain('常见问题')
    expect(wrapper.text()).toContain('Q1')
    expect(wrapper.text()).toContain('A1')
  })
})

describe('Footer', () => {
  it('渲染品牌与版权', () => {
    const wrapper = mount(Footer, {
      props: { data: { brand: 'Acme', copyright: '© 2025' } },
    })
    expect(wrapper.text()).toContain('Acme')
    expect(wrapper.text()).toContain('© 2025')
  })
})

describe('Pricing', () => {
  it('渲染套餐与徽标', () => {
    const wrapper = mount(Pricing, {
      props: {
        data: {
          plans: [
            {
              name: '专业版',
              price: '¥199',
              unit: '/月',
              features: '功能 A',
              button: { text: '购买', link: '/buy' },
              badge: '推荐',
              primary: true,
            },
          ],
        },
      },
    })
    expect(wrapper.text()).toContain('专业版')
    expect(wrapper.text()).toContain('¥199')
    expect(wrapper.text()).toContain('推荐')
    expect(wrapper.find('a').attributes('href')).toBe('/buy')
  })
})

describe('ContactForm', () => {
  const fields = [
    { name: 'name', label: '姓名', type: 'text' as const, required: true },
    { name: 'email', label: '邮箱', type: 'email' as const },
    {
      name: 'topic',
      label: '主题',
      type: 'select' as const,
      options: [
        { label: '咨询', value: 'a' },
        { label: '合作', value: 'b' },
      ],
    },
  ]

  it('渲染各类型字段', () => {
    const wrapper = mount(ContactForm, {
      props: { data: { fields, submitText: '提交' } },
    })
    expect(wrapper.find('input#name').exists()).toBe(true)
    expect(wrapper.find('input#email').exists()).toBe(true)
    expect(wrapper.find('select#topic').exists()).toBe(true)
    expect(wrapper.text()).toContain('提交')
  })

  it('提交时触发 submit 事件并携带数据', async () => {
    const wrapper = mount(ContactForm, {
      props: { data: { fields } },
    })
    await wrapper.find('input#name').setValue('张三')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')![0][0]).toEqual({
      name: '张三',
      email: '',
      topic: '',
    })
  })

  it('必填字段带 required 属性', () => {
    const wrapper = mount(ContactForm, { props: { data: { fields } } })
    expect(wrapper.find('input#name').attributes('required')).toBeDefined()
    expect(wrapper.find('input#email').attributes('required')).toBeUndefined()
  })
})

describe('ComparisonTable', () => {
  it('渲染表头与数据行', () => {
    const wrapper = mount(ComparisonTable, {
      props: {
        data: {
          firstColHeader: '能力',
          headers: [
            { text: '我们', color: 'primary' },
            { text: '竞品' },
          ],
          rows: [
            {
              feature: '价格',
              columns: [
                { value: '低', color: 'green' },
                { value: '高', color: 'red' },
              ],
            },
          ],
        },
      },
    })
    expect(wrapper.text()).toContain('能力')
    expect(wrapper.text()).toContain('我们')
    expect(wrapper.text()).toContain('价格')
    expect(wrapper.text()).toContain('低')
  })
})

describe('ImageText', () => {
  it('支持图片位置切换', () => {
    const left = mount(ImageText, {
      props: {
        data: {
          title: 'T',
          image: { src: '/a.png', alt: 'a' },
          imagePosition: 'left',
        },
      },
    })
    const right = mount(ImageText, {
      props: {
        data: {
          title: 'T',
          image: { src: '/a.png', alt: 'a' },
          imagePosition: 'right',
        },
      },
    })
    expect(left.html()).not.toBe(right.html())
  })

  it('图片带 alt 属性', () => {
    const wrapper = mount(ImageText, {
      props: {
        data: { title: 'T', image: { src: '/a.png', alt: '示意图' } },
      },
    })
    expect(wrapper.find('img').attributes('alt')).toBe('示意图')
  })
})
