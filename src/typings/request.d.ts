import type { User } from './index'

export interface ApiResponse {
  '/user/auth': User
  '/logout': void
  '/login': { message: string }
  '/register': { message: string }
}

export type RequestRUL = keyof ApiResponse
