import { useState, useEffect } from 'react'
import type { FormEventHandler } from 'react'
import { ArticleService } from '../services'
import type { Article } from '../typings'
import {
  Tabs,
  Drawer,
  IconFont,
  AdminRender,
  MobileRender,
  Label,
  Input,
} from '../components'
import { format, formHelper } from '../utils'
import { useHistory } from 'react-router-dom'
import { Pages } from '../utils/config'
import { useForceUpdate } from '../hooks'
import { Button } from '@waterui/react'

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

  const addArticle: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const values = await formHelper.getValues(e.target, ['title', 'content', 'cover'])
    await ArticleService.add(values)
    forceUpdate()
    formHelper.reset(e.target)
  }

  return (
    <div>
      <MobileRender reverse>
        <AdminRender>
          <details className="border-t p-4 cursor-pointer">
            <summary className="select-none text-sky-500">新增文章</summary>
            <form className="px-5" onSubmit={addArticle}>
              <Label htmlFor="title" requiredMark>
                标题
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                className="block w-full"
              />
              <Label htmlFor="content" requiredMark>
                MD文件
              </Label>
              <Input
                id="content"
                name="content"
                type="file"
                accept=".md"
                className="block w-full"
                required
              />
              <Label htmlFor="cover">封面</Label>
              <Input id="cover" name="cover" type="url" className="block w-full" />
              <div className="flex justify-end">
                <Button type="submit" className="w-32">
                  提交
                </Button>
              </div>
            </form>
          </details>
        </AdminRender>
      </MobileRender>
      <div className="flex justify-between items-center border-b-8 lg:border-b border-t px-5 py-2">
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
      <div className="divide-y-8 lg:divide-y">
        {articles.map((article) => {
          return (
            <div
              key={article._id}
              className="px-5 py-2 w-full lg:cursor-pointer lg:transition-colors lg:hover:bg-gray-100"
              onClick={() => history.push(`${Pages.article}/${article._id}`)}
            >
              <div className="font-bold text-xl lg:text-2xl py-1 select-none">
                {article.title}
              </div>
              <div className="flex space-x-2">
                {article.cover && (
                  <img
                    src={article.cover}
                    className="rounded-lg w-[100px] h-[72px] lg:w-[200px] lg:h-[144px] border"
                  />
                )}
                <div className="text-slate-500 line-clamp-3 lg:line-clamp-6 select-none">
                  {article.content}
                </div>
              </div>
              <div className="pt-1 text-slate-500">
                {format.relativeTime(article.createdAt)}
              </div>
            </div>
          )
        })}
      </div>
      <MobileRender>
        <AdminRender>
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
            <form onSubmit={addArticle}>
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
        </AdminRender>
      </MobileRender>
    </div>
  )
}
