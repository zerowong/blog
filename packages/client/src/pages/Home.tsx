import { useState, useEffect } from 'react'
import { ArticleService, TweetService, CommentService } from '../services'
import type { Article, Tweet, Comment } from '../typings'
import { useForceUpdate } from '../hooks'
import { Tabs, Avatar, IconFont, Drawer, AdminRender, MobileRender } from '../components'
import { format, hasProp } from '../utils'
import { useHistory } from 'react-router-dom'
import { Pages } from '../utils/config'
import { CommentsDrawer } from '../views'
import useStore from '../store'
import { Button, Form, TextArea } from '@waterui/react'
import type { FormValues } from '@waterui/react'

type Timeline = Article | Tweet
type Order = 'desc' | 'asc'

function isArticle(item: Timeline): item is Article {
  if (hasProp(item, 'title')) {
    return true
  }
  return false
}

function isTweet(item: Timeline): item is Tweet {
  return !isArticle(item)
}

async function fetchData(order: Order) {
  const articles = await ArticleService.getAll()
  const tweets = await TweetService.getAll()
  const states: Timeline[] = [...articles, ...tweets]
  let flag = 1
  if (order === 'asc') {
    flag = -1
  }
  states.sort((a, b) => {
    const dateA = Date.parse(a.createdAt)
    const dateB = Date.parse(b.createdAt)
    if (dateA < dateB) {
      return flag
    } else if (dateA > dateB) {
      return -flag
    } else {
      return 0
    }
  })
  return states
}

const orders = [
  { key: 'desc', text: '最新' },
  { key: 'asc', text: '倒序' },
] as const

function deleteTweet(id: string, isArticle: boolean) {
  if (isArticle) {
    return ArticleService.delete(id)
  }
  return TweetService.delete(id)
}

export default function Home() {
  const isDesktop = useStore((s) => s.isDesktop)
  const history = useHistory()

  const [timelines, setTimelines] = useState<Timeline[]>([])
  const [signal, forceUpdate] = useForceUpdate()
  const [order, setOrder] = useState<Order>('desc')
  /**
   * @todo
   */
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchData(order)
      .then(setTimelines)
      .finally(() => setLoading(false))
  }, [order, signal])

  const [comments, setComments] = useState<Comment[]>([])
  const [showComments, setShowComments] = useState(false)
  const [tweetId, setTweetId] = useState('')
  const [commentsOrder, setCommentsOrder] = useState<Order>('desc')
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [signal2, forceUpdate2] = useForceUpdate()

  useEffect(() => {
    if (tweetId) {
      setCommentsLoading(true)
      CommentService.getAllFromTweet(tweetId, {
        sort: 'createdAt',
        order: commentsOrder,
      })
        .then(setComments)
        .finally(() => setCommentsLoading(false))
    }
  }, [tweetId, commentsOrder, signal2])

  const [newTweetDrawerVisible, setNewTweetDrawerVisible] = useState(false)

  const addTweet = async (values: FormValues) => {
    if (!values.content) {
      return Promise.reject('empty content')
    }
    // @ts-ignore
    await TweetService.add(values)
    forceUpdate()
  }

  return (
    <div>
      <MobileRender reverse>
        <AdminRender>
          <Form onFinish={addTweet} className="p-5">
            <TextArea name="content" placeholder="推文" className="resize-none" />
            <div className="flex justify-end">
              <Button type="submit" className="float-right">
                发推
              </Button>
            </div>
          </Form>
        </AdminRender>
      </MobileRender>
      <div className="flex justify-end items-center border-b-8 lg:border-b border-t px-5 py-2">
        <span>
          <Tabs
            onChange={(idx) => {
              return setOrder(orders[idx].key)
            }}
          >
            {orders.map((val) => {
              return <Tabs.Tab key={val.key}>{val.text}</Tabs.Tab>
            })}
          </Tabs>
        </span>
      </div>
      <div className="divide-y-8 lg:divide-y">
        {timelines.map((item) => {
          let content = <div></div>
          if (isArticle(item)) {
            content = (
              <div
                className="border rounded-xl object-cover bg-white"
                onClick={() => history.push(`${Pages.article}/${item._id}`)}
              >
                {item.cover && (
                  <img src={item.cover} className="aspect-[2/1] w-full rounded-t-xl" />
                )}
                <div className="p-2 select-none space-y-1">
                  <div className="text-xl lg:text-2xl font-bold">{item.title}</div>
                  <div className="line-clamp-3 lg:line-clamp-6 text-slate-500">
                    {item.content}
                  </div>
                </div>
              </div>
            )
          }
          if (isTweet(item)) {
            content = (
              <div
                onClick={() => {
                  if (isDesktop) {
                    return history.push(`${Pages.tweet}/${item._id}`)
                  }
                  setTweetId(item._id)
                  setShowComments(true)
                }}
              >
                <div>{item.content}</div>
                <div className="text-slate-500">
                  <IconFont name="replies" size={20} />
                  <span className="text-sm ml-2 align-bottom">
                    {item.comments.length}
                  </span>
                </div>
              </div>
            )
          }
          return (
            <div
              key={item._id}
              className="flex gap-x-2 px-5 py-2 lg:transition-colors lg:hover:bg-gray-100 lg:cursor-pointer"
            >
              <div className="pt-1">
                <Avatar
                  src={item.user.avatar}
                  text={item.user.avatar ? undefined : item.user.name}
                  size="large"
                />
              </div>
              <div className="space-y-1 grow overflow-x-hidden">
                <div className="flex justify-between">
                  <div>
                    <span className="font-bold text-md">{item.user.name}</span>
                    <span className="text-sm text-slate-500">
                      ・{format.relativeTime(item.createdAt)}
                    </span>
                  </div>
                  <AdminRender>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0}>
                        <IconFont name="more" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content w-14 py-1 border shadow text-center bg-white"
                      >
                        <li
                          onClick={() =>
                            deleteTweet(item._id, isArticle(item)).then(forceUpdate)
                          }
                        >
                          删除
                        </li>
                      </ul>
                    </div>
                  </AdminRender>
                </div>
                {content}
              </div>
            </div>
          )
        })}
      </div>
      <MobileRender>
        <CommentsDrawer
          visible={showComments}
          onClose={() => setShowComments(false)}
          comments={comments}
          onTabChange={(key) => setCommentsOrder(key)}
          targetId={tweetId}
          to="tweet"
          onUpdate={() => {
            forceUpdate()
            forceUpdate2()
          }}
        />
        <AdminRender>
          <button
            className="btn btn-circle fixed right-5 bottom-20"
            onClick={() => setNewTweetDrawerVisible(true)}
          >
            <IconFont name="modify" />
          </button>
          <Drawer
            visible={newTweetDrawerVisible}
            onClose={() => setNewTweetDrawerVisible(false)}
            placement="bottom"
            title="发推"
          >
            <Form
              onFinish={async (values) => {
                await addTweet(values)
                return setNewTweetDrawerVisible(false)
              }}
              className="px-5 pt-1"
            >
              <TextArea name="content" placeholder="推文" className="resize-none" />
              <Button type="submit" block>
                发推
              </Button>
            </Form>
          </Drawer>
        </AdminRender>
      </MobileRender>
    </div>
  )
}
