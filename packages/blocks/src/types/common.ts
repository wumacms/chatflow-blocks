/**
 * 通用按钮
 */
export interface BlockAction {
  /** 按钮文字 */
  text: string
  /** 链接地址，默认 '#' */
  link?: string
  /** 是否主按钮（首个按钮默认 true） */
  primary?: boolean
  /** 是否新窗口打开 */
  newWindow?: boolean
}

/**
 * 通用图片
 */
export interface BlockImage {
  /** 图片地址 */
  src: string
  /** 图片 alt（无障碍 & SEO） */
  alt?: string
}

/**
 * 通用标签
 */
export interface BlockTag {
  /** 标签文字 */
  text: string
  /** 颜色 */
  color?:
    | 'primary'
    | 'gray'
    | 'green'
    | 'red'
    | 'yellow'
    | 'emerald'
    | 'orange'
    | 'rose'
    | 'purple'
    | 'cyan'
}

/**
 * 通用链接项（用于导航、页脚）
 */
export interface BlockLink {
  /** 显示文字 */
  text: string
  /** 链接地址 */
  link?: string
  /** 图标（Emoji） */
  icon?: string
  /** 是否新窗口打开 */
  newWindow?: boolean
  /** 二级菜单 */
  children?: BlockLink[]
  /**
   * 二级菜单面板宽度（Tailwind 类名，如 `w-64`）
   * 仅 Navbar 生效，默认 `w-56`
   */
  menuWidth?: string
}

/**
 * 所有区块共有的可选字段
 */
export interface BlockBase {
  /** 区块 id（用于锚点跳转） */
  id?: string
  /** 附加类名 */
  class?: string
}
