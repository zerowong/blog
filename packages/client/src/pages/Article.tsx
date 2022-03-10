import { useState, useEffect, useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { ArticleService, CommentService } from '../services'
import type { Article, Comment } from '../typings'
import { IconFont, MobileRender, Dialog } from '../components'
import { format } from '../utils'
import useStore from '../store'
import { CommentsDrawer, Comments } from '../views'
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
  const [commentsVisible, setCommentsVisible] = useState(false)
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
    <div className="py-1">
      <div
        hidden={loading}
        className="bg-fixed overflow-hidden bg-contain bg-center lg:bg-cover lg:bg-left"
        style={{
          backgroundImage: article.cover && `url(${article.cover})`,
        }}
      >
        <div
          className={classNames('bg-white px-6 pb-6 space-y-3', {
            'mt-[200px] lg:mt-[30vh]': article.cover,
          })}
        >
          <header className="font-bold text-3xl lg:text-5xl text-center">
            {article.title}
          </header>
          <section className="mt-1 text-slate-500 text-center">
            最后编辑于 {format.dateTime(article.updatedAt)}
          </section>
          {/* @todo 代码语法高亮 */}
          <main
            className="prose lg:prose-lg overflow-x-clip break-all"
            dangerouslySetInnerHTML={{ __html }}
          />
        </div>
        <MobileRender reverse>
          <div className="fixed bottom-0 bg-white w-[698px] px-5 h-10 flex items-center justify-end border-t">
            <div className="p-1 rounded-md hover:bg-gray-100 cursor-pointer text-slate-500 space-x-2 select-none">
              <span>
                <IconFont name="replies" />
                <span className="align-bottom ml-1">{article.comments.length}</span>
              </span>
              <span className="align-bottom" onClick={() => setCommentsVisible(true)}>
                添加评论
              </span>
            </div>
          </div>
          <Dialog
            visible={commentsVisible}
            onClose={() => setCommentsVisible(false)}
            title="全部评论"
            width="600px"
            height="80vh"
          >
            <Comments
              comments={comments}
              onTabChange={(key) => setOrder(key)}
              onUpdate={() => forceUpdate()}
              targetId={params.id}
              to="article"
            />
          </Dialog>
        </MobileRender>
        <MobileRender>
          <button
            className="btn btn-circle fixed right-5 bottom-10 shadow"
            onClick={() => setCommentsVisible(true)}
          >
            <IconFont name="replies" />
          </button>
          <CommentsDrawer
            visible={commentsVisible}
            onClose={() => setCommentsVisible(false)}
            comments={comments}
            onTabChange={(key) => setOrder(key)}
            targetId={article._id}
            onUpdate={forceUpdate}
            to="article"
          />
        </MobileRender>
      </div>
    </div>
  )
}
