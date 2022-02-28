import { Schema, model } from 'mongoose'
import type { SchemaDefinition, SchemaDefinitionType } from 'mongoose'
import type { User, Comment, Article, Book, Tweet, Test } from '../typings'

function createSchema<DocType = any>(
  definition: SchemaDefinition<SchemaDefinitionType<DocType>>
) {
  return new Schema<DocType>(definition, { timestamps: true })
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

const BookSchema = createSchema<Book>({
  isbn: { type: String, required: true },
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  cover: { type: String, required: true },
  dobanUrl: { type: String, required: true },
  isReaded: { type: Boolean, default: false },
})

const TweetSchema = createSchema<Tweet>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

export const TestModel = model('Test', TestSchema)
export const UserModel = model('User', UserSchema)
export const CommentModel = model('Comment', CommentSchema)
export const ArticleModel = model('Article', ArticleSchema)
export const BookModel = model('Book', BookSchema)
export const TweetModel = model('Tweet', TweetSchema)
