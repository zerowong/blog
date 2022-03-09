import { useState, useEffect } from 'react'
import { PageContainer, AdminAccess } from '../views'
import { ArticleService } from '../services'
import type { Article } from '../typings'
import { Image, Tabs, Drawer, IconFont } from '../components'
import { format } from '../utils'
import { useHistory } from 'react-router-dom'
import { Pages } from '../utils/config'
import { useForceUpdate } from '../hooks'

const orders = [
  { key: 'desc', text: '最新' },
  { key: 'asc', text: '倒序' },
] as const

/**
 * 文章页
 */
export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')

  const [signal, forceUpdate] = useForceUpdate()

  useEffect(() => {
    ArticleService.getAll({ order, sort: 'createdAt' }).then(setArticles)
  }, [order, signal])

  const history = useHistory()

  const [newArticleDrawerVisible, setNewArticleDrawerVisible] = useState(false)

  return (
    <PageContainer>
      <div className="flex justify-between items-center border-b-8 border-t px-5 py-2">
        <span>
          <span className="font-bold">{articles.length}</span> 篇
        </span>
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
      <div className="divide-y-8">
        {articles.map((article) => {
          return (
            <div
              key={article._id}
              className="px-5 py-2 w-full"
              onClick={() => history.push(`${Pages.article}/${article._id}`)}
            >
              <header className="font-bold text-xl py-1">{article.title}</header>
              <div className="flex">
                {article.cover && (
                  <Image
                    src={article.cover}
                    width={100}
                    height={72}
                    className="rounded-lg mr-2"
                  />
                )}
                <div className="text-slate-500 line-clamp-3">{article.content}</div>
              </div>
              <div className="pt-1 text-slate-500">
                {format.relativeTime(article.createdAt)}
              </div>
            </div>
          )
        })}
      </div>
      <AdminAccess>
        <button
          className="btn btn-circle fixed right-5 bottom-20"
          onClick={() => setNewArticleDrawerVisible(true)}
        >
          <IconFont name="modify" />
        </button>
        <Drawer
          visible={newArticleDrawerVisible}
          onClose={() => setNewArticleDrawerVisible(false)}
          placement="bottom"
          title="添加文章"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const values: Record<string, string> = {}
              const formData = new FormData(e.currentTarget)
              for (const [name, value] of formData) {
                if (value instanceof File) {
                  const content = await value.text()
                  values[name] = content
                } else {
                  values[name] = value
                }
              }
              try {
                // @ts-ignore
                await ArticleService.add(values)
                forceUpdate()
              } catch {}
            }}
          >
            <div>
              <label htmlFor="title">标题: </label>
              <input id="title" name="title" type="text" className="border" />
            </div>
            <div>
              <label htmlFor="content">MD文件: </label>
              <input id="content" name="content" type="file" accept=".md" />
            </div>
            <button type="submit" className="border p-2 shadow">
              提交
            </button>
          </form>
        </Drawer>
      </AdminAccess>
    </PageContainer>
  )
}
