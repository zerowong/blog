import Router from '@koa/router'
import { ArticleModel } from '../db'
import { errors } from '../utils'
import { userTokenAuth, adminAuth, pageAndSort, bodyValidator } from '../middlewares'

const router = new Router({ prefix: '/article' })

router.post(
  '/',
  userTokenAuth,
  adminAuth,
  bodyValidator({
    title: 'String',
    content: 'String',
    cover: { type: 'String', optional: true },
    tags: { type: 'Array', optional: true },
  }),
  async (ctx) => {
    const article = await ArticleModel.exists({ title: ctx.request.body.title })
    if (article) {
      return ctx.throw(403, errors.RESOURCE_EXISTS)
    }
    const newArticle = await ArticleModel.create({
      user: ctx.state.user.id,
      ...ctx.request.body,
    })
    ctx.body = newArticle
    ctx.status = 200
  }
)

router.delete('/:id', userTokenAuth, adminAuth, async (ctx) => {
  const { id } = ctx.params
  const article = await ArticleModel.findById(id)
  if (!article) {
    return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
  }
  await article.deleteOne()
  ctx.status = 200
})

router.get(
  '/',
  async (ctx, next) => {
    const articles = await ArticleModel.find({}, '-__v')
      .lean()
      .populate('user', '-pass -__v')
    ctx.state.body = articles
    return next()
  },
  pageAndSort
)

router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  const article = await ArticleModel.findById(id, '-__v')
    .lean()
    .populate('user', '-pass -__v')
  if (!article) {
    return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
  }
  ctx.body = article
  ctx.status = 200
})

router.patch(
  '/:id',
  userTokenAuth,
  adminAuth,
  bodyValidator({
    title: { type: 'String', optional: true },
    content: { type: 'String', optional: true },
    cover: { type: 'String', optional: true },
    tags: { type: 'Array', optional: true },
  }),
  async (ctx) => {
    const { id } = ctx.params
    const article = await ArticleModel.findById(id)
    if (!article) {
      return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
    }
    article.set(ctx.request.body)
    await article.save()
    ctx.body = article
    ctx.status = 200
  }
)

/**
 * @todo 文章点击数
 */

export default router.routes()
