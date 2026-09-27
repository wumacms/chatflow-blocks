import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Navbar from '../Navbar/Navbar.vue'
import Hero from '../Hero/Hero.vue'
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
