export interface Reply {
  id: string
  author: string
  content: string
  createdAt: string
  isDeleted?: boolean
  deletedAt?: string
}

export interface BlogComment {
  id: string
  author: string
  content: string
  createdAt: string
  isDeleted?: boolean
  deletedAt?: string
  replies?: Reply[]
}