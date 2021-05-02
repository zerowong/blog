import type { User } from './index'

interface CommonResponse {
  message: string
}

export interface ApiResponse {
  '/user/auth': User
  '/user/logout': void
  '/user/login': CommonResponse
  '/user/register': CommonResponse
}

export type RequestRUL = keyof ApiResponse
