import Router from '@koa/router'
import { CommentModel, ArticleModel, TweetModel } from '../db'
import { errors } from '../utils'
import { userTokenAuth, bodyValidator, adminAuth, pageAndSort } from '../middlewares'

const router = new Router({ prefix: '/comment' })

/**
 * @todo 评论敏感词屏蔽
 */
router.post(
  '/to-article',
  userTokenAuth,
  bodyValidator({
    articleId: 'String',
    content: 'String',
    replyTo: { type: 'String', optional: true },
  }),
  async (ctx) => {
    const { id } = ctx.state.user
    const body = ctx.request.body
    const article = await ArticleModel.findById(body.articleId)
    if (!article) {
      return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
    }
    const comment = await CommentModel.create({
      user: id,
      ...body,
    })
    await comment.populate([
      { path: 'user', select: '-pass' },
      { path: 'replyTo', select: '-pass' },
    ])
    article.comments.push(comment._id)
    await article.save()
    ctx.body = comment
    ctx.status = 200
  }
)

router.post(
  '/to-tweet',
  userTokenAuth,
  bodyValidator({
    tweetId: 'String',
    content: 'String',
    replyTo: { type: 'String', optional: true },
  }),
  async (ctx) => {
    const { id } = ctx.state.user
    const body = ctx.request.body
    const tweet = await TweetModel.findById(body.tweetId)
    if (!tweet) {
      return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
    }
    const comment = await CommentModel.create({
      user: id,
      ...body,
    })
    await comment.populate([
      { path: 'user', select: '-pass' },
      { path: 'replyTo', select: '-pass' },
    ])
    tweet.comments.push(comment._id)
    await tweet.save()
    ctx.body = comment
    ctx.status = 200
  }
)

router.delete('/:id', userTokenAuth, adminAuth, async (ctx) => {
  const { id } = ctx.params
  const comment = await CommentModel.findById(id)
  if (!comment) {
    return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
  }
  await comment.deleteOne()
  if (comment.articleId) {
    const article = await ArticleModel.findById(comment.articleId)
    if (article) {
      await article.removeComment(comment.id)
    }
  }
  if (comment.tweetId) {
    const tweet = await TweetModel.findById(comment.tweetId)
    if (tweet) {
      await tweet.removeComment(comment.id)
    }
  }
  ctx.status = 200
})

router.get(
  '/from-article/:id',
  async (ctx, next) => {
    const { id } = ctx.params
    const comments = await CommentModel.find({ articleId: id }, '-__v')
      .lean()
      .populate([
        {
          path: 'user',
          select: '-pass -__v',
        },
        {
          path: 'replyTo',
          select: '-pass -__v',
        },
      ])
    ctx.state.body = comments
    return next()
  },
  pageAndSort
)

router.get(
  '/from-tweet/:id',
  async (ctx, next) => {
    const { id } = ctx.params
    const comments = await CommentModel.find({ tweetId: id }, '-__v')
      .lean()
      .populate([
        {
          path: 'user',
          select: '-pass -__v',
        },
        {
          path: 'replyTo',
          select: '-pass -__v',
        },
      ])
    ctx.state.body = comments
    return next()
  },
  pageAndSort
)

router.patch(
  '/:id',
  userTokenAuth,
  adminAuth,
  bodyValidator({
    content: { type: 'String', optional: true },
    isDeleted: { type: 'Boolean', optional: true },
  }),
  async (ctx) => {
    const { id } = ctx.params
    const comment = await CommentModel.findById(id)
    if (!comment) {
      return ctx.throw(404, errors.RESOURCE_NOT_EXISTS)
    }
    comment.set(ctx.request.body)
    await comment.save()
    ctx.body = comment
    ctx.status = 200
  }
)

export default router.routes()
