import Axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'

const axios = Axios.create({
  baseURL: import.meta.env.DEV ? 'https://localhost:3000' : 'https://api.apasser.xyz',
  withCredentials: true,
})

interface ServiceRequestConfig extends AxiosRequestConfig {
  /**
   * 禁用通用错误处理，默认为false
   */
  doNothing?: boolean
}

class Service {
  // 通用错误处理
  private commonErrorHanlder(err: AxiosError<string>) {
    if (err.isAxiosError && err.response) {
      toast.error(err.response.data)
    } else {
      toast.error('网络错误')
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.dir(err)
      }
    }
  }

  async get<T = void>(url: string, config?: ServiceRequestConfig) {
    try {
      const res = await axios.get(url, config)
      return res.data as T
    } catch (err) {
      if (!config?.doNothing) {
        this.commonErrorHanlder(err)
      }
      return Promise.reject(err)
    }
  }

  async post<T = void>(url: string, data?: unknown, config?: ServiceRequestConfig) {
    try {
      const res = await axios.post(url, data, config)
      return res.data as T
    } catch (err) {
      if (!config?.doNothing) {
        this.commonErrorHanlder(err)
      }
      return Promise.reject(err)
    }
  }
}

const service = new Service()

export default service
