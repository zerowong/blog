/* eslint-disable no-console */
import { toast } from 'react-toastify'

interface MyRequestConfig {
  baseURL: string
}

interface MyRequestInit extends RequestInit {
  /**
   * 禁用通用错误处理
   */
  noCommonErrorHandle?: boolean
}

type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

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

  private responseRejected() {
    toast.error('网络错误/服务器挂了')
  }

  private responseResolvedButNotOK(response: Response) {
    response.text().then((value) => toast.error(value))
  }

  async fetch<T = void>(
    url: string,
    method: HTTPMethods = 'GET',
    data?: unknown,
    config?: MyRequestInit
  ): Promise<T> {
    const completeUrl = `${this.config.baseURL}${url}`
    try {
      const response = await fetch(completeUrl, {
        method,
        body: data ? JSON.stringify(data) : undefined,
        ...this.requestInit,
        ...config,
      })
      if (response.ok) {
        return response.json()
      }
      throw response
    } catch (reason) {
      if (!config?.noCommonErrorHandle) {
        if (reason instanceof Response) {
          this.responseResolvedButNotOK(reason)
        } else if (reason instanceof TypeError) {
          this.responseRejected()
        }
      }
      return Promise.reject(reason)
    }
  }
}

export default MyRequest
