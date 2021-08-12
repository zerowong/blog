export interface CommonResponse {
  message: string
}

export interface CaptchaParams {
  Ticket: string
  Randstr: string
}

/**
 * 腾讯云COS临时凭证
 */
export interface TempCredential {
  startTime: number
  expiredTime: number
  credentials: {
    tmpSecretId: string
    tmpSecretKey: string
    sessionToken: string
  }
}

export interface RequestQuery {
  sort?: string
  order?: 'asc' | 'desc'
  page?: string
  limit?: string
}

/**
 * 在tailwind.config.js中已配置的颜色
 */
export type Colors = 'teal' | 'green' | 'sky' | 'blue' | 'gray'
