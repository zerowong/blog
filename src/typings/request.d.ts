import type { User, Article, TempCredential } from './index'

interface CommonResponse {
  message: string
}

export interface ApiResponseOfGet {
  '/user/auth': User
  '/user/logout': void
  '/articles': Article[]
  '/article': Article
  '/sts': TempCredential
}

export interface ApiResponseOfPost {
  '/user/login': CommonResponse
  '/user/register': CommonResponse
  '/article': CommonResponse
}

export interface ApiResponseOfPatch {
  '/article': CommonResponse
}

export interface ApiResponseOfDelete {
  '/article': CommonResponse
}
