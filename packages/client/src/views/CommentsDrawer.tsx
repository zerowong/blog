import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Drawer, Tabs, Avatar, Input } from '../components'
import { format } from '../utils'
import type { Comment, User } from '../typings'
import useSotre from '../store'
import { CommentService } from '../services'
import { Button } from '@waterui/react'

interface CommentsDrawerProps {
  visible: boolean
  onClose: () => void
  comments: Comment[]
  onTabChange: (key: 'desc' | 'asc') => void
  loading?: boolean
  targetId: string
  onUpdate?: () => void
  to: 'article' | 'tweet'
}

const orders = [
  { key: 'desc', text: '最新' },
  { key: 'asc', text: '倒序' },
] as const

/**
 * 移动端
 */
export function CommentsDrawer(props: CommentsDrawerProps) {
  const { visible, onClose, comments, onTabChange, targetId, onUpdate, to, loading } =
    props

  const user = useSotre((s) => s.user)
  const showMessage = useSotre((s) => s.setGlobalMessage)

  const [replyTo, setReplyTo] = useState<User | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      return showMessage('未登录')
    }
    const formData = new FormData(e.target)
    const content = formData.get('content')
    if (!content || typeof content !== 'string') {
      return
    }
    setSubmitLoading(true)
    const data = {
      content,
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
          ;(e.target[0] as HTMLInputElement).value = ''
          drawerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
        })
        .finally(() => setSubmitLoading(false))
    }
  }

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      height="90vh"
      placement="bottom"
      title="全部评论"
      containerClassName="rounded-lg"
      ref={drawerRef}
    >
      <div className="flex justify-between items-center px-2">
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
      <div className="px-2 pb-2">
        {comments.map((item) => {
          return (
            <div
              key={item._id}
              className="flex gap-x-2 py-1"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.focus()
                  setReplyTo(item.user)
                }
              }}
            >
              <div>
                <Avatar
                  src={item.user.avatar}
                  text={item.user.avatar ? undefined : item.user.name}
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold space-x-1">
                  <span>{item.user.name}</span>
                  {item.replyTo && (
                    <>
                      <span className="text-slate-500">➤</span>
                      <span>{item.replyTo.name}</span>
                    </>
                  )}
                </div>
                <div>{item.content}</div>
                <div className="text-xs text-slate-500">
                  {format.relativeTime(item.createdAt)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <form
        className="fixed bottom-0 h-12 inset-x-0 pl-3 border-t flex bg-white items-center gap-x-2"
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
        <Button type="submit" className="" disabled={submitLoading}>
          发布
        </Button>
      </form>
    </Drawer>
  )
}
