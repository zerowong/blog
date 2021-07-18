interface BaseSchema {
  _id: string
}

export interface User extends BaseSchema {
  name: string
  avatar: string
  mail: string
  pass: string
  createdAt: string
  lastActiveAt: string
  role: 'admin' | 'normal'
}

export interface Comment extends BaseSchema {
  user: string
  content: string
  likes: string[]
  replies: string[]
  createdAt: string
}

export interface Reply extends BaseSchema {
  user: string
  content: string
  to: string
  createdAt: string
}

export interface Book extends BaseSchema {
  isbn: string
  title: string
  abstract: string
  coverUrl: string
  url: string
  isReaded: boolean
}

export interface Article extends BaseSchema {
  title: string
  content: string
  comments: string[]
  coverUrl: string
  path: string
  createdAt: string
  updatedAt: string
}

export interface Tweet extends BaseSchema {
  content: string
  comments: string[]
  createdAt: string
}

export interface Stats extends BaseSchema {
  device: string
  browser: string
  activeTime: number
}
