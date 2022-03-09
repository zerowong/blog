import { useState, useEffect, useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { ArticleService, CommentService } from '../services'
import type { Article, Comment } from '../typings'
import { IconFont } from '../components'
import { format } from '../utils'
import useStore from '../store'
import { CommentsDrawer } from '../views'
import { useForceUpdate } from '../hooks'
import classNames from 'classnames'
import { marked } from 'marked'

export default function Aritcle() {
  const params = useParams<{ id: string }>()
  const setNavTitle = useStore((s) => s.setNavTitle)

  const [article, setArticle] = useState<Article | null>(null)
  const [notFound, setNotFound] = useState(false)
  /**
   * @todo 骨架屏
   */
  const [loading, setLoading] = useState(false)

  const [signal, forceUpdate] = useForceUpdate()

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - ApassEr`
    }
  }, [article])

  useEffect(() => {
    if (params.id) {
      setLoading(true)
      ArticleService.getById(params.id)
        .then(
          (data) => {
            setArticle(data)
            setNavTitle(data.title)
          },
          () => setNotFound(true)
        )
        .finally(() => setLoading(false))
    }
  }, [params, setLoading, setNavTitle])

  const [comments, setComments] = useState<Comment[]>([])
  const [showComments, setShowComments] = useState(false)
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  /**
   * @todo 骨架屏
   */
  const [commentsLoading, setCommentsLoading] = useState(false)

  useEffect(() => {
    if (article?._id) {
      setCommentsLoading(true)
      CommentService.getAllFromArticle(article._id, { sort: 'createdAt', order })
        .then(setComments)
        .finally(() => setCommentsLoading(false))
    }
  }, [order, article, signal])

  const __html = useMemo(() => {
    if (article?.content) {
      return marked(article.content)
    }
    return ''
  }, [article?.content])

  if (notFound) {
    return <Redirect to="/articles" />
  }

  if (!article) {
    return null
  }

  return (
    <div className="pb-1 pt-[var(--blog-nav-height)]">
      <div
        hidden={loading}
        className="bg-fixed bg-cover bg-center h-full overflow-y-scroll"
        style={{
          backgroundImage: article.cover && `url(${article.cover})`,
        }}
      >
        <div className={classNames('bg-white px-6', { 'mt-52': article.cover })}>
          <header className="font-bold text-3xl text-center">{article.title}</header>
          <section className="mt-1 text-slate-500 text-center">
            最后编辑于 {format.dateTime(article.updatedAt)}
          </section>
          <main
            className="text-lg prose overflow-x-hidden"
            dangerouslySetInnerHTML={{ __html }}
          />
        </div>
        <button
          className="btn btn-circle fixed right-5 bottom-10 shadow"
          onClick={() => setShowComments(true)}
        >
          <IconFont name="replies" />
        </button>
        <CommentsDrawer
          visible={showComments}
          onClose={() => setShowComments(false)}
          comments={comments}
          onTabChange={(key) => setOrder(key)}
          loading={commentsLoading}
          targetId={article._id}
          onUpdate={forceUpdate}
          to="article"
        />
      </div>
    </div>
  )
}
