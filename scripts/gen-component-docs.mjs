/**
 * 从源码生成 VitePress 组件文档页
 * 数据源：types.ts（TS AST）、*.vue（默认值 + 模板特征）、playground App.vue（可运行示例）
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const require = createRequire(ROOT + '/package.json')
const ts = require('typescript')

const COMP_DIR = path.join(ROOT, 'packages/blocks/src/components')
const DOCS_DIR = path.join(ROOT, 'docs')
const OUT_DIR = path.join(DOCS_DIR, 'components')
const PLAYGROUND = path.join(ROOT, 'playground/src/App.vue')
const COMMON_TYPES = path.join(ROOT, 'packages/blocks/src/types/common.ts')

/* ---------------- 组件中文名 ---------------- */
const CN = {
  Navbar: '导航栏',
  Banner: '通知条',
  Breadcrumb: '面包屑',
  Footer: '页脚',
  Hero: '主视觉',
  HeroBackground: '背景图主视觉',
  PageHeader: '页头',
  Features: '特性网格',
  Stats: '数据统计',
  IconWall: '图标墙',
  Steps: '步骤流程',
  Timeline: '发展历程',
  Video: '视频区块',
  Team: '团队展示',
  Testimonials: '客户证言',
  Partners: '合作伙伴',
  LogoBar: 'Logo 墙',
  ImageText: '图文组合',
  TopImage: '上文下图',
  ProductList: '产品列表',
  ProductDetail: '产品详情',
  ServiceList: '服务列表',
  CourseList: '课程列表',
  NewsList: '资讯列表',
  NewsDetail: '文章详情',
  Pricing: '定价方案',
  ComparisonTable: '对比表格',
  ContactForm: '联系表单',
  CTA: '行动号召',
  FAQ: '常见问题',
}

const EMIT_DOC = {
  submit: '表单提交，参数为所有字段的键值对（`field.name` → 用户输入）',
}

/* ---------------- 读取分类与用途 ---------------- */
const indexMd = fs.readFileSync(path.join(OUT_DIR, 'index.md'), 'utf8')
const categories = []
let cur = null
for (const line of indexMd.split('\n')) {
  const h = line.match(/^## (.+)$/)
  if (h) {
    cur = { name: h[1].trim(), items: [] }
    categories.push(cur)
    continue
  }
  if (!cur) continue
  const row = line.match(
    /^\|\s*(?:\[)?\s*`([A-Za-z]+)`(?:\]\([^)]*\))?\s*\|\s*`([A-Za-z]+)`\s*\|\s*(.+?)\s*\|$/
  )
  if (row && cur.name !== '通用类型契约') {
    cur.items.push({ name: row[1], type: row[2], desc: row[3] })
  }
}
const metaOf = {}
categories.forEach((c) => c.items.forEach((i) => (metaOf[i.name] = { ...i, category: c.name })))

/* ---------------- TS AST 解析 ---------------- */
function getDoc(sf, node) {
  const ranges = ts.getLeadingCommentRanges(sf.text, node.pos) || []
  return ranges
    .map((r) => sf.text.slice(r.pos, r.end))
    .filter((t) => t.startsWith('/**'))
    .map((t) =>
      t
        .replace(/^\/\*\*/, '')
        .replace(/\*\/\s*$/, '')
        .split('\n')
        .map((l) => l.replace(/^\s*\*\s?/, '').trim())
        .filter(Boolean)
        .join(' ')
        .trim()
    )
    .join(' ')
}

function parseInterfaces(file) {
  const text = fs.readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  const list = []
  sf.forEachChild((node) => {
    if (ts.isInterfaceDeclaration(node)) {
      const members = node.members
        .map((m) => {
          if (!ts.isPropertySignature(m) || !m.name) return null
          return {
            name: m.name.getText(sf),
            type: m.type ? m.type.getText(sf).replace(/\s+/g, ' ') : 'any',
            optional: !!m.questionToken,
            doc: getDoc(sf, m),
          }
        })
        .filter(Boolean)
      const ext = (node.heritageClauses || []).flatMap((h) => h.types.map((t) => t.getText(sf)))
      list.push({ name: node.name.text, members, extends: ext, doc: getDoc(sf, node) })
    }
  })
  return list
}

/* ---------------- 解析 .vue ---------------- */
function readVue(name) {
  const file = path.join(COMP_DIR, name, `${name}.vue`)
  return { file, text: fs.readFileSync(file, 'utf8') }
}

function parseDefaults(text) {
  const idx = text.indexOf('...props.data')
  if (idx === -1) return {}
  const start = text.lastIndexOf('({', idx)
  if (start === -1) return {}
  const body = text.slice(start + 2, idx)
  const parts = []
  let depth = 0
  let buf = ''
  for (const ch of body) {
    if ('([{'.includes(ch)) depth++
    if (')]}'.includes(ch)) depth--
    if (ch === ',' && depth === 0) {
      parts.push(buf)
      buf = ''
    } else buf += ch
  }
  if (buf.trim()) parts.push(buf)
  const map = {}
  for (const p of parts) {
    const m = p.match(/^\s*([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/)
    if (m) map[m[1]] = m[2].trim().replace(/\s+/g, ' ')
  }
  return map
}

function parseEmits(text) {
  const out = []
  const re = /\(\s*e:\s*'([^']+)'\s*(?:,\s*([A-Za-z_$][\w$]*)\s*:\s*([^)]+?))?\s*\)\s*:\s*void/g
  let m
  while ((m = re.exec(text))) {
    out.push({ name: m[1], arg: m[2] || '—', argType: (m[3] || '—').trim() })
  }
  return out
}

const SEMANTIC = ['nav', 'section', 'footer', 'header', 'article', 'aside', 'main', 'form', 'figure', 'time', 'blockquote']

function parseTemplateFacts(text) {
  const tplIdx = text.indexOf('<template>')
  const tpl = tplIdx === -1 ? text : text.slice(tplIdx)
  const tags = [...new Set((tpl.match(/<([a-z][a-z0-9-]*)\b/g) || []).map((s) => s.slice(1)))]
  const semantic = tags.filter((t) => SEMANTIC.includes(t))
  const aria = [...new Set((tpl.match(/aria-[a-z]+/g) || []))].sort()
  const responsive = [...new Set((tpl.match(/\b(sm|md|lg|xl):/g) || []).map((s) => s.replace(':', '')))]
  const darkCount = (tpl.match(/\bdark:/g) || []).length
  const hasAlt = /:alt=|:alt"/.test(tpl)
  return { semantic, aria, responsive, darkCount, hasAlt }
}

/* ---------------- playground 示例 ---------------- */
const pgText = fs.readFileSync(PLAYGROUND, 'utf8')
function extractExample(dataType) {
  const re = new RegExp(`^const (\\w+): ${dataType} = \\{`, 'm')
  const m = re.exec(pgText)
  if (!m) return null
  const open = pgText.indexOf('{', m.index + m[0].length - 1)
  let depth = 0
  for (let j = open; j < pgText.length; j++) {
    if (pgText[j] === '{') depth++
    else if (pgText[j] === '}') {
      depth--
      if (depth === 0) return { varName: m[1], body: pgText.slice(open, j + 1) }
    }
  }
  return null
}

/* ---------------- 通用契约（用于行类型链接） ---------------- */
const commonIfaces = parseInterfaces(COMMON_TYPES).map((i) => i.name)

// 同行页内锚点 + 契约页锚点
function typeCell(t, localNames = []) {
  let out = String(t)
  for (const name of localNames) {
    out = out.replace(new RegExp(`\\b${name}\\b`, 'g'), `[${name}](#${name.toLowerCase()})`)
  }
  for (const name of commonIfaces) {
    out = out.replace(new RegExp(`\\b${name}\\b`, 'g'), `[${name}](/guide/contracts#${name.toLowerCase()})`)
  }
  return '`' + out.replace(/\|/g, '\\|') + '`'
}

function memberTable(members, defaults, localNames = []) {
  const rows = members.map((m) => {
    const rawDef = defaults[m.name]
    // 去掉源码里的 `as const` 断言，只保留字面量
    const def = rawDef === undefined ? '—' : '`' + String(rawDef).replace(/\s+as const/g, '') + '`'
    const req = m.optional || def !== '—' ? '否' : '是'
    // 转义尖括号，避免表格里的 <br> 被当成 HTML 标签渲染
    const doc = String(m.doc || '—').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `| \`${m.name}\` | ${typeCell(m.type, localNames)} | ${req} | ${def} | ${doc} |`
  })
  return ['| 字段 | 类型 | 必填 | 默认值 | 说明 |', '| --- | --- | --- | --- | --- |', ...rows].join('\n')
}

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/* ---------------- 生成 ---------------- */
const componentDirs = fs
  .readdirSync(COMP_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('__'))
  .map((d) => d.name)
  .sort()

const generated = []
const missingDocs = []
for (const name of componentDirs) {
  const meta = metaOf[name]
  if (!meta) {
    console.warn(`! 缺少索引条目：${name}`)
    continue
  }
  const { file, text } = readVue(name)
  const ifaces = parseInterfaces(path.join(COMP_DIR, name, 'types.ts'))
  const dataIface = ifaces.find((i) => i.name === meta.type) || ifaces[0]
  const subIfaces = ifaces.filter((i) => i.name !== dataIface.name)
  const defaults = parseDefaults(text)
  const emits = parseEmits(text)
  const facts = parseTemplateFacts(text)
  const example = extractExample(meta.type)
  const cnName = CN[name] || meta.desc
  const fileKebab = kebab(name)

  const md = []
  md.push(`# ${name} ${cnName}`)
  md.push('')
  md.push(meta.desc + '。')
  md.push('')
  md.push(`> 类型 \`${meta.type}\` · 分类：${meta.category} · 源码 \`packages/blocks/src/components/${name}/\``)
  md.push('')

  /* 示例 */
  if (example) {
    md.push('## 基础用法')
    md.push('')
    md.push('```vue')
    md.push('<script setup lang="ts">')
    md.push(`import type { ${meta.type} } from '@chatflow/blocks'`)
    md.push('')
    md.push(`const ${example.varName}: ${meta.type} = ${example.body}`)
    md.push('</script>')
    md.push('')
    md.push('<template>')
    md.push(`  <${name} :data="${example.varName}" />`)
    md.push('</template>')
    md.push('```')
    md.push('')
  }

  /* 事件（放在用法之后，交互型组件优先看到） */
  if (emits.length) {
    md.push('## 事件')
    md.push('')
    md.push('| 事件 | 参数 | 参数类型 | 说明 |')
    md.push('| --- | --- | --- | --- |')
    for (const e of emits) {
      md.push(`| \`${e.name}\` | \`${e.arg}\` | \`${e.argType.replace(/\|/g, '\\|')}\` | ${EMIT_DOC[e.name] || '用户交互时触发'} |`)
    }
    md.push('')
    if (name === 'ContactForm') {
      md.push('```vue')
      md.push(`<${name} :data="${example ? example.varName : 'data'}" @submit="onSubmit" />`)
      md.push('```')
      md.push('')
    }
  }

  /* API */
  md.push('## API')
  md.push('')
  md.push(`### \`data: ${dataIface.name}\``)
  md.push('')
  if (dataIface.extends.includes('BlockBase')) {
    md.push('继承自 [`BlockBase`](/guide/contracts#blockbase)，额外支持 `id` 与 `class` 字段。')
    md.push('')
  }
  const localNames = ifaces.map((i) => i.name)
  md.push(memberTable(dataIface.members, defaults, localNames))
  md.push('')

  for (const sub of subIfaces) {
    md.push(`### \`${sub.name}\``)
    md.push('')
    if (sub.doc) {
      md.push(sub.doc + '。')
      md.push('')
    }
    md.push(memberTable(sub.members, {}, localNames))
    md.push('')
  }

  // 注释自检
  for (const i of ifaces) {
    for (const m of i.members) if (!m.doc) missingDocs.push(`${name}.${i.name}.${m.name}`)
  }

  /* 实现要点 */
  const points = []
  if (facts.semantic.length) points.push(`使用语义化标签：${facts.semantic.map((t) => `\`<${t}>\``).join('、')}`)
  if (facts.aria.length) points.push(`已标注无障碍属性：${facts.aria.map((a) => `\`${a}\``).join('、')}`)
  if (facts.hasAlt) points.push('图片渲染 `alt`，符合 PRD 无障碍要求')
  if (facts.darkCount) points.push(`内置 ${facts.darkCount} 处 \`dark:\` 适配，无需额外配置即可跟随深色模式`)
  if (facts.responsive.length)
    points.push(`响应式断点：${facts.responsive.sort().map((r) => `\`${r}:\``).join('、')}（Tailwind 默认断点）`)
  if (Object.keys(defaults).length)
    points.push(`字段缺失时使用内置默认值（如 \`${Object.keys(defaults)[0]}\`），不会渲染空白`)
  if (points.length) {
    md.push('## 实现要点')
    md.push('')
    points.forEach((p) => md.push(`- ${p}`))
    md.push('')
  }

  /* 相关组件 */
  const related = categories
    .find((c) => c.name === meta.category)
    .items.filter((i) => i.name !== name)
    .map((i) => `[${i.name} ${CN[i.name] || ''}](/components/${kebab(i.name)})${i.desc ? ` — ${i.desc}` : ''}`)
  if (related.length) {
    md.push('## 同类组件')
    md.push('')
    related.forEach((r) => md.push(`- ${r}`))
    md.push('')
  }

  fs.writeFileSync(path.join(OUT_DIR, `${fileKebab}.md`), md.join('\n'))
  generated.push({ name, cnName, file: fileKebab, category: meta.category, fields: dataIface.members.length, example: !!example })
}

console.log(`生成 ${generated.length} 个组件文档页：`)
for (const g of generated) {
  console.log(`  ${String(g.file).padEnd(20)} ${g.name.padEnd(16)} ${String(g.fields).padStart(2)} 字段  ${g.example ? '含示例' : '!!无示例'}`)
}
if (missingDocs.length) {
  console.log(`\n!! ${missingDocs.length} 个字段缺少 JSDoc：`)
  missingDocs.forEach((m) => console.log('   ' + m))
} else {
  console.log('\n所有字段均有 JSDoc 说明')
}

/* ---------------- 侧边栏分组 ----------------
 * 新增组件后，把这段 JSON 的 groups 同步到 docs/.vitepress/config.mts
 */
const sidebarItems = categories
  .filter((c) => c.name !== '通用类型契约' && c.items.length)
  .map((c) => ({
    text: c.name,
    collapsed: false,
    items: c.items.map((i) => ({ text: `${i.name} ${CN[i.name] || ''}`.trim(), link: `/components/${kebab(i.name)}` })),
  }))
console.log('\n侧边栏分组（供 docs/.vitepress/config.mts 参考）：')
console.log(JSON.stringify(sidebarItems, null, 2))

