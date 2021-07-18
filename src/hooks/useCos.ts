import COS from 'cos-js-sdk-v5'
import Service from 'src/utils/services'

export default function useCos() {
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
