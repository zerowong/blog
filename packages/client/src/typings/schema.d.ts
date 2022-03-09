interface Base {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface User extends Base {
  name: string
  pass: string
  avatar?: string
  lastActiveAt: Date
  isAdmin: boolean
}

export interface Comment extends Base {
  user: User
  content: string
  replyTo?: User
  isDeleted: boolean
  articleId?: string
  tweetId?: string
}

export interface Article extends Base {
  user: User
  title: string
  content: string
  comments: string[]
  cover?: string
  tags: string[]
  views: number
}

export interface Book extends Base {
  title: string
  doubanUrl: string
  isReaded: boolean
}

export interface Tweet extends Base {
  user: User
  content: string
  comments: string[]
}
