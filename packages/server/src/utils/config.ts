import path from 'path'
import fs from 'fs'
import type { ServerConfig } from '../typings'

export const errors = {
  PERMISSION_DENIED: 'permission denied',
  PARAMS_MISSING: 'missing parameter',
  PARAMS_TYPE_ERROR: 'parameter type error',
  CAPTCHA_INVALID: 'captcha verification failed',
  COS_TEMP_CRED_GET_FAIL: 'failed to obtain Tencent COS temporary credentials',
  RESOURCE_NOT_EXISTS: 'resource does not exist',
  RESOURCE_EXISTS: 'resource already exists',
  PASS_WRONG: '密码错误',
  USER_NOT_EXISTS: '用户不存在',
  USER_EXISTS: '用户已存在',
} as const

function getPath(relativePath: string) {
  return path.join(process.cwd(), relativePath)
}

export const ONE_DAY = 86400000

export const USER_TOKEN_OPTION = {
  maxAge: ONE_DAY * 30,
  sameSite: 'none',
} as const

export const CORS_ORIGIN =
  process.env.NODE_ENV === 'prod' ? 'https://apasser.xyz' : undefined

export const SERVER_KEY_PATH = getPath('/assets/api.apasser.xyz.key')

export const SERVER_CRT_PATH = getPath('/assets/api.apasser.xyz.crt')

export const PRIVATE_KEY_PATH = getPath('/assets/private.pem')

export const PUBLIC_KEY_PATH = getPath('/assets/public.pem')

export const serverConfig: ServerConfig = JSON.parse(
  fs.readFileSync(getPath('/assets/config.json'), 'utf8')
)
