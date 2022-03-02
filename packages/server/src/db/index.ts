import { Schema, model } from 'mongoose'
import type { SchemaDefinition, SchemaDefinitionType, HydratedDocument } from 'mongoose'
import type { User, Comment, Article, Book, Tweet, Test } from '../typings'

function createSchema<DocType = any>(
  definition: SchemaDefinition<SchemaDefinitionType<DocType>>
) {
  return new Schema<DocType>(definition, {
    timestamps: true,
    toObject: { versionKey: false },
    toJSON: { versionKey: false },
  })
}

const TestSchema = createSchema<Test>({
  a: { type: String, required: true },
  b: String,
  c: Number,
  d: [String],
  e: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  f: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const UserSchema = createSchema<User>({
  name: { type: String, required: true },
  pass: { type: String, required: true },
  avatar: String,
  lastActiveAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
})

const CommentSchema = createSchema<Comment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  replyTo: { type: Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },
  articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
  tweetId: { type: Schema.Types.ObjectId, ref: 'Tweet' },
})

const ArticleSchema = createSchema<Article>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  cover: String,
  tags: [String],
  views: { type: Number, default: 0 },
})

ArticleSchema.method<HydratedDocument<Article>>(
  'removeComment',
  async function (id: string) {
    let target = -1
    for (let i = 0, l = this.comments.length; i < l; i++) {
      if (this.comments[i].toString() === id) {
        target = i
        break
      }
    }
    if (target !== -1) {
      this.comments.splice(target, 1)
      await this.save()
    }
  }
)

const BookSchema = createSchema<Book>({
  title: { type: String, required: true },
  doubanUrl: { type: String, required: true },
  isReaded: { type: Boolean, default: false },
})

const TweetSchema = createSchema<Tweet>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

TweetSchema.method<HydratedDocument<Tweet>>('removeComment', async function (id: string) {
  let target = -1
  for (let i = 0, l = this.comments.length; i < l; i++) {
    if (this.comments[i].toString() === id) {
      target = i
      break
    }
  }
  if (target !== -1) {
    this.comments.splice(target, 1)
    await this.save()
  }
})

export const TestModel = model('Test', TestSchema)
export const UserModel = model('User', UserSchema)
export const CommentModel = model('Comment', CommentSchema)
export const ArticleModel = model('Article', ArticleSchema)
export const BookModel = model('Book', BookSchema)
export const TweetModel = model('Tweet', TweetSchema)
