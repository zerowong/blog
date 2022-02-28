import Router from '@koa/router'
import { TestModel } from '../db'
import { userTokenAuth, adminAuth, bodyValidator, pageAndSort } from '../middlewares'

const router = new Router({ prefix: '/test' })

router.post(
  '/',
  userTokenAuth,
  adminAuth,
  bodyValidator({
    a: 'String',
    b: { type: 'String', optional: true },
    c: { type: 'Number', optional: true },
    d: { type: 'Array', optional: true },
  }),
  async (ctx) => {
    const newDoc = await TestModel.create({ f: ctx.state.user.id, ...ctx.request.body })
    ctx.body = newDoc
    ctx.status = 200
  }
)

router.get(
  '/',
  userTokenAuth,
  adminAuth,
  async (ctx, next) => {
    const res = await TestModel.find({}).lean()
    ctx.state.body = res
    return next()
  },
  pageAndSort
)

router.patch(
  '/:id',
  userTokenAuth,
  adminAuth,
  bodyValidator({
    a: { type: 'String', optional: true },
    b: { type: 'String', optional: true },
    c: { type: 'Number', optional: true },
    d: { type: 'Array', optional: true },
  }),
  async (ctx) => {
    const { id } = ctx.params
    const doc = await TestModel.findById(id)
    if (!doc) {
      return ctx.throw(404)
    }
    console.log(ctx.request.body)
    doc.set(ctx.request.body)
    await doc.save()
    ctx.body = doc
    ctx.status = 200
  }
)

export default router.routes()
