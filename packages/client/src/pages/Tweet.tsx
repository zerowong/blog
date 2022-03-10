import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TweetService, CommentService } from '../services'
import { Tweet, Comment } from '../typings'
import { useForceUpdate } from '../hooks'
import { Avatar } from '../components'
import { format } from '../utils'
import { Comments } from '../views'

export default function TweetPage() {
  const params = useParams<{ id: string }>()

  const [loading, setLoading] = useState(false)
  const [tweet, settweet] = useState<Tweet | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [signal, forceUpdate] = useForceUpdate()

  useEffect(() => {
    if (params.id) {
      setLoading(true)
      Promise.all([
        TweetService.getById(params.id),
        CommentService.getAllFromTweet(params.id, { sort: 'createdAt', order }),
      ])
        .then((data) => {
          settweet(data[0])
          setComments(data[1])
        })
        .finally(() => setLoading(false))
    }
  }, [params.id, order, signal])

  if (!tweet) {
    return <div></div>
  }

  return (
    <div>
      <div className="flex gap-x-2 p-5 border-b">
        <div>
          <Avatar src={tweet.user.avatar} size="large" />
        </div>
        <div className="space-y-3">
          <div>
            <span className="font-bold text-md">{tweet.user.name}</span>
            <span className="text-sm text-slate-500">
              ・{format.relativeTime(tweet.createdAt)}
            </span>
          </div>
          <div className="min-h-[100px]">{tweet.content}</div>
        </div>
      </div>
      <Comments
        comments={comments}
        onUpdate={() => forceUpdate()}
        onTabChange={(key) => setOrder(key)}
        targetId={params.id}
        to="tweet"
      />
    </div>
  )
}
