import MyRequest from './request'
import type {
  User,
  CaptchaParams,
  CommonResponse,
  TempCredential,
  Article,
  RequestQuery,
} from '../typings'

const request = new MyRequest({
  baseURL: import.meta.env.DEV ? 'https://api.apasser.xyz/dev' : 'https://api.apasser.xyz',
})

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

/**
 * 处理url参数
 */
function handleParameters(parameters: Record<string, string>) {
  return Object.values(parameters).join('/')
}

export default {
  userAuth() {
    return request.fetch<User>('/user/auth', 'GET', undefined, { noCommonErrorHandle: true })
  },

  userRegister(body: Pick<User, 'mail' | 'name' | 'pass'> & CaptchaParams) {
    return request.fetch<CommonResponse>('/user/register', 'POST', body)
  },

  userLogin(body: Pick<User, 'mail' | 'pass'> & CaptchaParams) {
    return request.fetch<CommonResponse>('/user/login', 'POST', body)
  },

  userLogout() {
    return request.fetch<CommonResponse>('/user/logout', 'GET', undefined, {
      noCommonErrorHandle: true,
    })
  },

  /**
   * 获取腾讯云COS临时凭证
   */
  getSTS() {
    return request.fetch<TempCredential>('/sts')
  },

  getAllArticles(query?: RequestQuery) {
    const queryString = handleQuery(query)
    const url = `/articles${queryString}`
    return request.fetch<Article[]>(url)
  },

  getArticleById(parameters: { id: string }) {
    const parametersString = handleParameters(parameters)
    const url = `/article/${parametersString}`
    return request.fetch<Article>(url)
  },

  addArticle(body: Omit<Article, 'createdAt' | 'updatedAt' | '_id'>) {
    return request.fetch<CommonResponse>('/article', 'POST', body)
  },

  deleteArticleById(parameters: Pick<Article, '_id'>) {
    const parametersString = handleParameters(parameters)
    const url = `/article/${parametersString}`
    return request.fetch<CommonResponse>(url, 'DELETE')
  },

  modifyArticleById(
    parameters: Pick<Article, '_id'>,
    body: Omit<Article, 'createdAt' | 'updatedAt'>
  ) {
    const parametersString = handleParameters(parameters)
    const url = `/article/${parametersString}`
    return request.fetch<CommonResponse>(url, 'PATCH', body)
  },
}
