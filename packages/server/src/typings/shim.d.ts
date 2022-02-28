import type Koa from 'koa'
import type Koajwt from 'koa-jwt'

declare module 'koa' {
  interface Request {
    body?: any
    rawBody: string
  }
  return Koa
}

declare module 'koa-jwt' {
  interface Middleware extends Koa.Middleware {
    unless: Koajwt.UnlessOptions
  }
  return Koajwt
}
