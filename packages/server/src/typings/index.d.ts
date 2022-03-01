import type { Types } from 'mongoose'

interface ServerConfig {
  db: {
    user: string
    pass: string
  }
  credential: {
    secretId: string
    secretKey: string
  }
  captcha: {
    CaptchaAppId: number
    AppSecretKey: string
  }
}

interface Test {
  a: string
  b?: string
  c?: number
  d: string[]
  e: Types.ObjectId[]
  f: Types.ObjectId
}

interface User {
  name: string
  pass: string
  avatar?: string
  lastActiveAt: Date
  isAdmin: boolean
}

interface Comment {
  user: Types.ObjectId
  content: string
  replyTo?: Types.ObjectId
  isDeleted: boolean
  articleId?: Types.ObjectId
  tweetId?: Types.ObjectId
}

interface Article {
  user: Types.ObjectId
  title: string
  content: string
  comments: Types.ObjectId[]
  cover?: string
  tags: string[]
  views: number
  removeComment(id: string): Promise<void>
}

interface Book {
  isbn: string
  title: string
  abstract: string
  cover: string
  dobanUrl: string
  isReaded: boolean
}

interface Tweet {
  user: Types.ObjectId
  content: string
  comments: Types.ObjectId[]
  removeComment(id: string): Promise<void>
}

interface UserTokenPayload {
  id: string
  isAdmin: boolean
  iat: number
  exp: number
}
