import Router from '@koa/router'
import STS from 'qcloud-cos-sts'
import { userTokenAuth, adminAuth } from '../middlewares'
import { serverConfig, errors } from '../utils'

const router = new Router()

router.use(['/sts'], userTokenAuth, adminAuth)

/**
 * 临时密钥服务
 */
router.get('/sts', async (ctx) => {
  const policy = STS.getPolicy([
    {
      action: 'name/cos:PutObject',
      bucket: 'blog-1302895217',
      region: 'ap-nanjing',
      prefix: '*',
    },
  ])
  const tempCred = await STS.getCredential({
    secretId: serverConfig.credential.secretId,
    secretKey: serverConfig.credential.secretKey,
    policy,
  }).catch(() => null)
  if (!tempCred) {
    return ctx.throw(404, errors.COS_TEMP_CRED_GET_FAIL)
  }
  ctx.body = tempCred
  ctx.status = 200
})

export default router.routes()
