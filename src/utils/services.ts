import Axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.DEV ? 'https://localhost:3000' : 'https://api.apasser.xyz',
  withCredentials: true,
  timeout: 10000,
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
    if (err.isAxiosError) {
      if (err.response) {
        console.error(err.response.data)
      } else {
        console.dir(err)
      }
    }
  }

  async request<T>(config: ServiceRequestConfig) {
    try {
      const res = await axios(config)
      return res.data as T
    } catch (err) {
      if (!config.doNothing) {
        this.commonErrorHanlder(err)
      }
      return Promise.reject(err)
    }
  }

  async get<T>(url: string, config?: ServiceRequestConfig) {
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

  async post<T>(url: string, data?: unknown, config?: ServiceRequestConfig) {
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
