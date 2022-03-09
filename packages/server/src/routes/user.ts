import Router from '@koa/router'
import { UserModel } from '../db'
import type { User, UserTokenPayload } from '../typings'
import { signToken, hash, verify, USER_TOKEN_OPTION, errors } from '../utils'
import { userTokenAuth, bodyValidator } from '../middlewares'

const router = new Router({ prefix: '/user' })

router.post(
  '/register',
  bodyValidator({ name: 'String', pass: 'String', avatar: 'String' }),
  async (ctx) => {
    const { name, pass, avatar } = <User>ctx.request.body
    const user = await UserModel.findOne({ name }).lean()
    if (user) {
      return ctx.throw(403, errors.USER_EXISTS)
    }
    const hashedPass = await hash(pass)
    const newUser = await UserModel.create({ name, pass: hashedPass, avatar })
    const token = await signToken({ id: newUser._id, isAdmin: newUser.isAdmin })
    ctx.cookies.set('user_token', token, USER_TOKEN_OPTION)
    ctx.status = 200
  }
)

router.post('/login', bodyValidator({ name: 'String', pass: 'String' }), async (ctx) => {
  const { name, pass } = <User>ctx.request.body
  const user = await UserModel.findOne({ name }).lean()
  if (!user) {
    return ctx.throw(404, errors.USER_NOT_EXISTS)
  }
  const passMatched = await verify(pass, user.pass)
  if (!passMatched) {
    return ctx.throw(403, errors.PASS_WRONG)
  }
  const token = await signToken({ id: user._id, isAdmin: user.isAdmin })
  ctx.cookies.set('user_token', token, USER_TOKEN_OPTION)
  ctx.status = 200
})

router.get('/logout', (ctx) => {
  ctx.cookies.set('user_token', null)
  ctx.status = 200
})

router.get('/auth', userTokenAuth, async (ctx) => {
  const { id, isAdmin } = <UserTokenPayload>ctx.state.user
  const user = await UserModel.findById(id).lean().select('-pass')
  if (!user) {
    return ctx.throw(404, errors.USER_NOT_EXISTS)
  }
  const token = await signToken({ id, isAdmin })
  ctx.cookies.set('user_token', token, USER_TOKEN_OPTION)
  ctx.status = 200
  ctx.body = user
})

/**
 * @todo 用户头像审核
 */
router.patch(
  '/profile',
  userTokenAuth,
  bodyValidator({
    name: { type: 'String', optional: true },
    avatar: { type: 'String', optional: true },
  }),
  async (ctx) => {
    const { id } = ctx.state.user
    const user = await UserModel.findById(id).select('-pass')
    if (!user) {
      return ctx.throw(404, errors.USER_NOT_EXISTS)
    }
    user.set(ctx.request.body)
    await user.save()
    ctx.body = user
    ctx.status = 200
  }
)

router.patch('/pass', userTokenAuth, bodyValidator({ pass: 'String' }), async (ctx) => {
  const { id } = ctx.state.user
  const user = await UserModel.findById(id)
  if (!user) {
    return ctx.throw(404, errors.USER_NOT_EXISTS)
  }
  const newHash = await hash(ctx.request.body.pass)
  user.pass = newHash
  await user.save()
  ctx.cookies.set('user_token', null)
  ctx.status = 200
})

export default router.routes()
