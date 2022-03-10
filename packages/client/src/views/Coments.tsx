import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Tabs, Avatar, Input } from '../components'
import { format, formHelper } from '../utils'
import type { Comment, User } from '../typings'
import useSotre from '../store'
import { CommentService } from '../services'
import { Button } from '@waterui/react'

interface CommentsProps {
  comments: Comment[]
  onTabChange: (key: 'desc' | 'asc') => void
  loading?: boolean
  targetId: string
  onUpdate?: () => void
  to: 'article' | 'tweet'
  className?: string
}

const orders = [
  { key: 'desc', text: '最新' },
  { key: 'asc', text: '倒序' },
] as const

export function Comments(props: CommentsProps) {
  const { comments, onTabChange, targetId, onUpdate, to, loading, className } = props

  const user = useSotre((s) => s.user)
  const showMessage = useSotre((s) => s.setGlobalMessage)

  const [replyTo, setReplyTo] = useState<User | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      return showMessage('未登录')
    }
    const values: { content: string } = await formHelper.getValues(e.target, ['content'])
    if (!values.content) {
      return
    }
    setSubmitLoading(true)
    const data = {
      content: values.content,
      replyTo: replyTo?._id ?? undefined,
    }
    let promise: Promise<Comment> | null = null
    if (to === 'article') {
      promise = CommentService.addToArticle({
        articleId: targetId,
        ...data,
      })
    }
    if (to === 'tweet') {
      promise = CommentService.addToTweet({
        tweetId: targetId,
        ...data,
      })
    }
    if (promise) {
      return promise
        .then(() => {
          onUpdate?.()
          formHelper.reset(e.target)
        })
        .finally(() => setSubmitLoading(false))
    }
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center px-3 sticky top-0 bg-white z-10">
        <span>{comments.length} 评论</span>
        <span>
          <Tabs
            onChange={(idx) => {
              return onTabChange(orders[idx].key)
            }}
          >
            {orders.map((val) => {
              return <Tabs.Tab key={val.key}>{val.text}</Tabs.Tab>
            })}
          </Tabs>
        </span>
      </div>
      <div className="px-3 pb-2">
        {comments.map((item) => {
          return (
            <div key={item._id} className="flex gap-x-2 py-1 group">
              <div>
                <Avatar
                  src={item.user.avatar}
                  text={item.user.avatar ? undefined : item.user.name}
                  size="large"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-lg space-x-1">
                  <span>{item.user.name}</span>
                  {item.replyTo && (
                    <>
                      <span className="text-slate-500 select-none">➤</span>
                      <span>{item.replyTo.name}</span>
                    </>
                  )}
                </div>
                <div>{item.content}</div>
                <div className="text-xs lg:text-base text-slate-500 space-x-3">
                  <span>{format.relativeTime(item.createdAt)}</span>
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500"
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.focus()
                        setReplyTo(item.user)
                      }
                    }}
                  >
                    回复
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <form
        className="sticky bottom-0 h-14 inset-x-0 px-3 pt-2 flex bg-white items-center gap-1"
        onSubmit={onSubmit}
        onBlur={(e) => {
          if (!e.relatedTarget) {
            return setReplyTo(null)
          }
        }}
      >
        <Input
          ref={inputRef}
          name="content"
          className="grow"
          type="text"
          placeholder={replyTo ? `回复 @${replyTo.name}` : '评论'}
        />
        <Button type="submit" disabled={submitLoading}>
          发布
        </Button>
      </form>
    </div>
  )
}
