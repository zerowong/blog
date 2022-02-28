import fs from 'fs'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { PRIVATE_KEY_PATH, PUBLIC_KEY_PATH } from './config'

/**
 * 文本加密
 * @param rounds 默认为10
 */
export async function hash(data: string, rounds = 10) {
  const hash = await bcrypt.hash(data, rounds)
  return hash
}

/**
 * 文本验证
 */
export async function verify(data: string, hash: string) {
  const result = await bcrypt.compare(data, hash)
  return result
}

/**
 * token签发
 * @param expiresIn 默认30天
 */
export function signToken(payload: Record<string, any>, expiresIn = '30d') {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(PRIVATE_KEY_PATH, (err, key) => {
      if (err) {
        return reject(err)
      }
      jwt.sign(payload, key, { algorithm: 'RS256', expiresIn }, (err, token) => {
        if (err || !token) {
          return reject(err)
        }
        return resolve(token)
      })
    })
  })
}

/**
 * token验证
 */
export function verifyToken(token: string) {
  return new Promise<JwtPayload>((resolve, reject) => {
    fs.readFile(PUBLIC_KEY_PATH, (err, key) => {
      if (err) {
        return reject(err)
      }
      jwt.verify(token, key, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') {
          return reject(err)
        }
        return resolve(decoded)
      })
    })
  })
}

/**
 * 从cookie中取值
 */
export function getCookieValue(name: string, cookie: string) {
  for (let i = 0, cookies = cookie.split(';'); i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=')
    if (key === name) {
      return value
    }
  }
  return null
}

export function hasProp(obj: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * 处理排序查询
 * @param arr 对象数组
 * @param key 对象属性
 * @param order 顺序，默认为`desc`
 * @returns 原地排序无返回值
 */
export function sortQuery(
  arr: Record<string, any>[],
  key?: string | string[],
  order?: string | string[]
) {
  if (typeof key !== 'string' || !hasProp(arr[0], key)) {
    return
  }
  if (order !== 'asc') {
    order = 'desc'
  }
  let flag = 1
  if (order === 'asc') {
    flag = -1
  }
  arr.sort((a, b) => {
    if (a[key] < b[key]) {
      return flag
    }
    if (a[key] > b[key]) {
      return -flag
    }
    return 0
  })
}

/**
 * 处理分页查询
 * @param limit 默认为`'10'`
 */
export function pageQuery(
  arr: Record<string, any>[],
  page?: string | string[],
  limit?: string | string[]
) {
  if (typeof page !== 'string') {
    return arr
  }
  const _page = Number.parseInt(page, 10)
  if (Number.isNaN(_page)) {
    return arr
  }
  let _limit = 10
  if (typeof limit === 'string') {
    _limit = Number.parseInt(limit, 10)
    if (Number.isNaN(_limit)) {
      _limit = 10
    }
  }
  const start = (_page - 1) * _limit
  const end = start + _limit
  return arr.slice(start, end)
}

export function isStringArray(arr: unknown[]): arr is string[] {
  return arr.every((val) => typeof val === 'string')
}

export function type(obj: unknown) {
  const str: string = Object.prototype.toString.call(obj)
  const start = str.indexOf(' ')
  return str.slice(start + 1, str.length - 1)
}
