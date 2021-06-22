import COS from 'cos-js-sdk-v5'
import request from 'src/utils/request'

export default function useCos() {
  const cos = new COS({
    getAuthorization(options, callback) {
      request.get('/sts').then(
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
  return {
    putObject(key: string, body: File) {
      return cos.putObject({
        Bucket: 'blog-1302895217',
        Region: 'ap-nanjing',
        Key: key,
        Body: body,
      })
    },
  }
}
