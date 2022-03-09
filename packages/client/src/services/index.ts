import MyRequest from '../utils/request'
import type { User, TempCredential, Article, Tweet, Comment, Book } from '../typings'

const request = new MyRequest({
  baseURL: import.meta.env.DEV ? 'http://localhost:3000' : 'https://api.apasser.xyz',
})

interface RequestQuery {
  sort?: string
  order?: 'asc' | 'desc'
  page?: string
  limit?: string
}

/**
 * 处理url查询字符串
 */
function handleQuery(query?: RequestQuery) {
  if (!query) {
    return ''
  }
  const queries: string[] = []
  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queries.push(`${key}=${value}`)
    }
  })
  if (!queries.length) {
    return ''
  }
  return `?${queries.join('&')}`
}

export const PassportService = {
  register(data: Pick<User, 'name' | 'pass' | 'avatar'>) {
    return request.post('/user/register', data)
  },
  login(data: Pick<User, 'name' | 'pass'>) {
    return request.post('/user/login', data)
  },
  auth() {
    return request.get<User>('/user/auth', { noCommonErrorHandle: true })
  },
  logout() {
    return request.get('/user/logout', { noCommonErrorHandle: true })
  },
  updateProfile(data: Partial<Pick<User, 'name' | 'avatar'>>) {
    return request.patch<User>('/user/profile', data)
  },
  updatePass(data: Pick<User, 'pass'>) {
    return request.patch('/user/pass', data)
  },
}

export const ArticleService = {
  add(
    data: Pick<Article, 'title' | 'content'> & Partial<Pick<Article, 'tags' | 'cover'>>
  ) {
    return request.post<Article>('/article', data)
  },
  delete(id: string) {
    return request.delete(`/article/${id}`)
  },
  getAll(query?: RequestQuery) {
    const qs = handleQuery(query)
    return request.get<Article[]>(`/article${qs}`)
  },
  getById(id: string) {
    return request.get<Article>(`/article/${id}`)
  },
  update(
    id: string,
    data: Partial<Pick<Article, 'title' | 'content' | 'tags' | 'cover'>>
  ) {
    return request.patch<Article>(`/article/${id}`, data)
  },
}

export const TweetService = {
  add(data: Pick<Tweet, 'content'>) {
    return request.post<Tweet>('/tweet', data)
  },
  delete(id: string) {
    return request.delete(`/tweet/${id}`)
  },
  getAll(query?: RequestQuery) {
    const qs = handleQuery(query)
    return request.get<Tweet[]>(`/tweet${qs}`)
  },
  update(id: string, data: Partial<Pick<Tweet, 'content'>>) {
    return request.patch<Tweet>(`/tweet/${id}`, data)
  },
}

export const CommentService = {
  addToArticle(data: Pick<Comment, 'content' | 'articleId'> & { replyTo?: string }) {
    return request.post<Comment>('/comment/to-article', data)
  },
  addToTweet(data: Pick<Comment, 'content' | 'tweetId'> & { replyTo?: string }) {
    return request.post<Comment>('/comment/to-tweet', data)
  },
  markDelete(id: string) {
    return request.patch<Comment>(`/comment/${id}`, { isDelete: true })
  },
  getAllFromArticle(id: string, query?: RequestQuery) {
    const qs = handleQuery(query)
    return request.get<Comment[]>(`/comment/from-article/${id}${qs}`)
  },
  getAllFromTweet(id: string, query?: RequestQuery) {
    const qs = handleQuery(query)
    return request.get<Comment[]>(`/comment/from-tweet/${id}${qs}`)
  },
}

export const BookService = {
  add(data: Pick<Book, 'title' | 'doubanUrl'>) {
    return request.post<Book>('/book', data)
  },
  delete(id: string) {
    return request.delete(`/book/${id}`)
  },
  find(query?: RequestQuery) {
    const qs = handleQuery(query)
    return request.get<Book[]>(`/book${qs}`)
  },
  update(id: string, data: Partial<Pick<Book, 'title' | 'doubanUrl'>>) {
    return request.patch<Book>(`/book/${id}`, data)
  },
}

export const TencentService = {
  getSts() {
    return request.get<TempCredential>('/sts')
  },
}
