import { useRef } from 'react'
import COS from 'cos-js-sdk-v5'
import Service from '../utils/services'

const cos = new COS({
  getAuthorization(options, callback) {
    Service.getSTS().then(
      (tempCred) => {
        callback({
          TmpSecretId: tempCred.credentials.tmpSecretId,
          TmpSecretKey: tempCred.credentials.tmpSecretKey,
          SecurityToken: tempCred.credentials.sessionToken,
          StartTime: tempCred.startTime,
          ExpiredTime: tempCred.expiredTime,
          ScopeLimit: true,
        })
      },
      () => {}
    )
  },
})

/**
 * 腾讯云cos存储
 */
export function useCos() {
  const cosRef = useRef({
    putObject(key: string, body: File) {
      return cos.putObject({
        Bucket: 'blog-1302895217',
        Region: 'ap-nanjing',
        Key: key,
        Body: body,
      })
    },
  })

  return cosRef.current
}
