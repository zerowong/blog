/* eslint-disable no-console */
import { toast } from 'react-toastify'
import type { ApiResponse, RequestRUL } from 'src/typings/request'

interface MyRequestConfig {
  baseURL: string
}

interface MyRequestInit extends RequestInit {
  /**
   * 禁用通用错误处理
   */
  noCommonErrorHanlde?: boolean
}

class MyRequest {
  private headers: Headers
  private requestInit: MyRequestInit
  public config: MyRequestConfig

  constructor(config: MyRequestConfig) {
    this.config = config
    this.headers = new Headers({
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    })
    this.requestInit = {
      headers: this.headers,
      mode: 'cors',
      credentials: 'include',
      cache: 'default',
      redirect: 'follow',
      referrerPolicy: 'strict-origin-when-cross-origin',
    }
  }

  private responseRejected(err: TypeError) {
    toast.error('网络错误/服务器挂了')
    if (import.meta.env.DEV) {
      console.dir(err)
    }
  }

  private responseResolvedButNotOK(response: Response) {
    response.text().then((value) => toast.error(value))
  }

  async request<T extends RequestRUL>(url: T, config: MyRequestInit): Promise<ApiResponse[T]> {
    const completeUrl = `${this.config.baseURL}${url}`
    try {
      const response = await fetch(completeUrl, config)
      if (response.ok) {
        return response.json()
      }
      throw response
    } catch (reason) {
      if (!config.noCommonErrorHanlde) {
        if (reason instanceof Response) {
          this.responseResolvedButNotOK(reason)
        } else if (reason instanceof TypeError) {
          this.responseRejected(reason)
        }
      }
      return Promise.reject(reason)
    }
  }

  get<T extends RequestRUL>(url: T, config?: MyRequestInit) {
    return this.request(url, { method: 'GET', ...this.requestInit, ...config })
  }

  post<T extends RequestRUL>(url: T, data?: unknown, config?: MyRequestInit) {
    return this.request(url, {
      body: JSON.stringify(data),
      method: 'POST',
      ...this.requestInit,
      ...config,
    })
  }
}

const request = new MyRequest({
  baseURL: import.meta.env.DEV ? 'https://localhost:3000' : 'https://api.apasser.xyz',
})

export default request
