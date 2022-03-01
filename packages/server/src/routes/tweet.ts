import Router from '@koa/router'
import { TweetModel } from '../db'
import { errors } from '../utils'
import { userTokenAuth, adminAuth, bodyValidator, pageAndSort } from '../middlewares'

const router = new Router({ prefix: '/tweet' })

router.post(
  '/',
  userTokenAuth,
  adminAuth,
  bodyValidator({
    content: 'String',
  }),
  async (ctx) => {
    const { id } = ctx.state.user
    const body = ctx.request.body
    const tweet = await TweetModel.create({
      user: id,
      ...body,
    })
    ctx.body = tweet
    ctx.status = 200
  }
)

router.delete('/:id', userTokenAuth, adminAuth, async (ctx) => {
  const { id } = ctx.params
  const tweet = await TweetModel.findById(id)
  if (!tweet) {
    return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
  }
  await tweet.deleteOne()
  ctx.status = 200
})

router.get(
  '/',
  async (ctx, next) => {
    const tweets = await TweetModel.find({}, '-__v').lean().populate('user', '-pass -__v')
    ctx.state.body = tweets
    return next()
  },
  pageAndSort
)

router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  const tweet = await TweetModel.findById(id).lean().populate('user', '-pass -__v')
  if (!tweet) {
    return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
  }
  ctx.body = tweet
  ctx.status = 200
})

router.patch(
  '/:id',
  userTokenAuth,
  adminAuth,
  bodyValidator({ content: 'String' }),
  async (ctx) => {
    const { id } = ctx.params
    const body = ctx.request.body
    const tweet = await TweetModel.findById(id)
    if (!tweet) {
      return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
    }
    tweet.set(body)
    await tweet.save()
    ctx.body = tweet
    ctx.status = 200
  }
)

export default router.routes()
