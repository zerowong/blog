import { toast } from 'react-toastify'

interface Config {
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
  public config: Config

  constructor(config: Config) {
    this.config = config
    this.headers = new Headers({
      'Accept': 'application/json, text/plain, */*',
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

  private errorHandler(reason: unknown) {
    if (reason instanceof Response) {
      reason.text().then((value) => toast.error(value))
    } else if (reason instanceof TypeError) {
      toast.error('网络错误/服务挂了')
    }
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
      if (!response.ok) {
        throw response
      }
      return response.json()
    } catch (reason) {
      if (!config?.noCommonErrorHandle) {
        this.errorHandler(reason)
      }
      return Promise.reject(reason)
    }
  }

  get<T = void>(url: string, config?: MyRequestInit) {
    return this.fetch<T>(url, 'GET', undefined, config)
  }

  post<T = void>(url: string, data: unknown, config?: MyRequestInit) {
    return this.fetch<T>(url, 'POST', data, config)
  }

  delete<T = void>(url: string, config?: MyRequestInit) {
    return this.fetch<T>(url, 'DELETE', undefined, config)
  }

  patch<T = void>(url: string, data: unknown, config?: MyRequestInit) {
    return this.fetch<T>(url, 'PATCH', data, config)
  }

  put<T = void>(url: string, data: unknown, config?: MyRequestInit) {
    return this.fetch<T>(url, 'PUT', data, config)
  }
}

export default MyRequest
