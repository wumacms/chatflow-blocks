import type { BlockBase, BlockImage } from '../../types/common'

export interface TeamMember {
  /** 成员姓名 */
  name: string
  /** 职位 / 角色 */
  role: string
  /** 头像 */
  avatar: BlockImage
}

export interface TeamData extends BlockBase {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 团队成员列表 */
  members: TeamMember[]
}
