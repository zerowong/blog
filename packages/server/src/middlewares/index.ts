import fs from 'fs'
import type { ParameterizedContext, Next } from 'koa'
import koajwt from 'koa-jwt'
import * as TencentCaptcha from 'tencentcloud-sdk-nodejs/tencentcloud/services/captcha'
import {
  PUBLIC_KEY_PATH,
  serverConfig,
  type,
  errors,
  pageQuery,
  sortQuery,
} from '../utils'

export const userTokenAuth = koajwt({
  cookie: 'user_token',
  key: 'user',
  secret: fs.readFileSync(PUBLIC_KEY_PATH),
})

export async function adminAuth(ctx: ParameterizedContext, next: Next) {
  if (!ctx.state.user?.isAdmin) {
    ctx.throw(401, errors.PERMISSION_DENIED)
  }
  return next()
}

const client = new TencentCaptcha.captcha.v20190722.Client({
  credential: serverConfig.credential,
  region: '',
  profile: {},
})

export async function captcha(ctx: ParameterizedContext, next: Next) {
  if (process.env.NODE_ENV === 'test') {
    return next()
  }
  const { Ticket, Randstr } = ctx.request.body
  const res = await client.DescribeCaptchaResult({
    CaptchaType: 9,
    UserIp: ctx.ip,
    Ticket,
    Randstr,
    ...serverConfig.captcha,
  })
  if (res.CaptchaCode !== 1) {
    ctx.throw(404, errors.CAPTCHA_INVALID)
  }
  return next()
}

// https://github.com/jshttp/http-errors
interface HttpError {
  expose: boolean
  message: string
  statusCode: number
  status: number
  headers?: Record<string, string>
  [customProperties: string]: any
}

export async function errorHanlder(ctx: ParameterizedContext, next: Next) {
  try {
    await next()
  } catch (err) {
    const { expose, statusCode, status } = <HttpError>err
    ctx.status = statusCode ?? status ?? 500
    if (expose) {
      throw err
    }
    console.error(err)
  }
}

type AllowType = 'Number' | 'String' | 'Boolean' | 'Object' | 'Array'

interface Validator {
  [key: string]:
    | AllowType
    | {
        type: AllowType
        optional?: boolean
      }
}

export function bodyValidator(validator: Validator) {
  return (ctx: ParameterizedContext, next: Next) => {
    const newBody: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(validator)) {
      let _type = 'Undefined'
      let _required = true
      if (typeof value === 'string') {
        _type = value
      } else {
        _type = value.type
        _required = !value.optional
      }
      const bodyValue = ctx.request.body[key]
      if (bodyValue === undefined || bodyValue === null) {
        if (_required) {
          return ctx.throw(400, `${errors.PARAMS_MISSING}: "${key}"`)
        }
      } else {
        const paramsType = type(bodyValue)
        if (paramsType !== _type) {
          return ctx.throw(
            400,
            `${errors.PARAMS_TYPE_ERROR}: expect "${_type}" but "${paramsType}"`
          )
        }
        newBody[key] = bodyValue
      }
    }
    ctx.request.body = newBody
    return next()
  }
}

export function pageAndSort(ctx: ParameterizedContext) {
  const { sort, order, page, limit } = ctx.query
  const body = ctx.state.body
  sortQuery(body, sort, order)
  ctx.body = pageQuery(body, page, limit)
  ctx.status = 200
}

/**
 * @todo 字符串字段长度和格式验证中间件
 */
