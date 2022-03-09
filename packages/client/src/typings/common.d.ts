/**
 * 腾讯云验证码
 */
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
