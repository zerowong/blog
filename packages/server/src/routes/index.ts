import Router from '@koa/router'
import test from './test'
import user from './user'
import articles from './article'
import sts from './sts'

const router = new Router()

router.use(test)

router.use(user)

router.use(articles)

router.use(sts)

export default router
