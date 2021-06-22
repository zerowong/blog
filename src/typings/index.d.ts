export interface User {
  _id: string
  name: string
  avatar: string
  mail: string
  createdAt: string
  lastActiveAt: string
  role: 'admin' | 'normal'
}

export interface UserContextType {
  readonly value: User | null
  readonly dispatch: (action: 'fetch' | 'reset') => Promise<void>
}

export interface Comment {
  _id: string
  user: string
  content: string
  likes: string[]
  replies: string[]
  createdAt: string
}

export interface Reply {
  _id: string
  user: string
  content: string
  to: string
  createdAt: string
}

export interface Book {
  _id: string
  isbn: string
  title: string
  abstract: string
  coverUrl: string
  url: string
  isReaded: boolean
}

export interface Article {
  _id: string
  title: string
  content: string
  comments: string[]
  coverUrl: string
  path: string
  createdAt: string
  updatedAt: string
}

export interface Tweet {
  _id: string
  content: string
  comments: string[]
  createdAt: string
}

export interface Stats {
  _id: string
  device: string
  browser: string
  activeTime: number
}

export interface TempCredential {
  startTime: number
  expiredTime: number
  credentials: {
    tmpSecretId: string
    tmpSecretKey: string
    sessionToken: string
  }
}
