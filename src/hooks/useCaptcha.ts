import { useMemo } from 'react'

interface CaptchaRespose {
  // 验证结果，0：验证成功。2：用户主动关闭验证码
  ret: 0 | 2
  // 验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
  ticket: string
  // 场景 ID
  appid: string
  // 自定义透传参数
  bizState: unknown
  // 本次验证的随机串，请求后台接口时需带上
  randstr: string
}

interface CaptchaCallback {
  (res: CaptchaRespose): void
}

declare class TencentCaptcha {
  constructor(appId: string, callback: CaptchaCallback)
  // 显示验证码
  show: () => void
  // 隐藏验证码
  destroy: () => void
  // 获取验证码验证成功后的 ticket
  getTicket: () => { appid: string; ticket: string }
}

/**
 * 腾讯云验证码钩子
 * @param callback 验证码对象回调函数
 * @returns 验证码对象
 */
export default function useCaptcha(callback: CaptchaCallback) {
  const captcha = useMemo(() => {
    return new TencentCaptcha('2054543757', callback)
  }, [callback])
  return captcha
}
