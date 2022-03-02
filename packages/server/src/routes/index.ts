import Router from '@koa/router'
import test from './test'
import user from './user'
import articles from './article'
import sts from './sts'
import comment from './comment'
import tweet from './tweet'
import book from './book'

const router = new Router()

router.use(test)

router.use(user)

router.use(articles)

router.use(sts)

router.use(comment)

router.use(tweet)

router.use(book)

export default router
