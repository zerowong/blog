import Router from '@koa/router'
import { BookModel } from '../db'
import { errors } from '../utils'
import { userTokenAuth, adminAuth, pageAndSort, bodyValidator } from '../middlewares'

const router = new Router({ prefix: '/book' })

router.post(
  '/',
  userTokenAuth,
  adminAuth,
  bodyValidator({
    title: 'String',
    doubanUrl: 'String',
  }),
  async (ctx) => {
    const book = await BookModel.create(ctx.request.body)
    ctx.body = book
    ctx.status = 200
  }
)

router.delete('/:id', userTokenAuth, adminAuth, async (ctx) => {
  const { id } = ctx.params
  const book = await BookModel.findById(id)
  if (!book) {
    return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
  }
  await book.deleteOne()
  ctx.status = 200
})

router.get(
  '/',
  async (ctx, next) => {
    const books = await BookModel.find({}, '-__v').lean()
    ctx.state.body = books
    return next()
  },
  pageAndSort
)

router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  const book = await BookModel.findById(id, '-__v').lean()
  if (!book) {
    return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
  }
  ctx.body = book
  ctx.status = 200
})

router.patch(
  '/:id',
  userTokenAuth,
  adminAuth,
  bodyValidator({
    titel: { type: 'String', optional: true },
    doubanUrl: { type: 'String', optional: true },
    isReaded: { type: 'Boolean', optional: true },
  }),
  async (ctx) => {
    const { id } = ctx.params
    const book = await BookModel.findById(id)
    if (!book) {
      return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
    }
    book.set(ctx.request.body)
    await book.save()
    ctx.body = book
    ctx.status = 200
  }
)

export default router.routes()
