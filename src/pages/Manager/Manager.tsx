import React, { useState, useEffect } from 'react'
import { Menu, Button, Form, List, Popup } from 'semantic-ui-react'
import type { MenuProps, FormProps } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import classes from './Manager.module.css'
import request from 'src/utils/request'
import type { Article } from 'src/typings'
import Card from 'src/components/Card/Card'
import Refresh from 'src/components/Refresh/Refresh'
import Modal from 'src/components/MyModal/MyModal'
import MyIcon from 'src/components/MyIcon/MyIcon'
import buildTree from 'src/utils/build-tree'
import { removeExt } from 'src/utils'
import useCos from 'src/hooks/useCos'

export default function Manager() {
  const [selectItem, setSelectItem] = useState('dashboard')

  const items = [
    { key: 'dashboard', name: 'dashboard', content: '看板' },
    { key: 'articles', name: 'articles', content: '文章' },
    { key: 'books', name: 'books', content: '书单' },
  ]

  const handleItemClick: MenuProps['onItemClick'] = (event, data) => {
    if (data.name) {
      setSelectItem(data.name)
    }
  }

  const renderContent = () => {
    switch (selectItem) {
      case 'dashboard':
        return <DashboardManager />
      case 'articles':
        return <ArticleManager />
      case 'books':
        return <BooksManager />
      default:
        break
    }
  }

  return (
    <main className={classes['main']}>
      <Menu
        vertical
        pointing
        color="blue"
        className={classes['menu']}
        items={items}
        defaultActiveIndex={0}
        onItemClick={handleItemClick}
      />
      <Card>{renderContent()}</Card>
    </main>
  )
}

function DashboardManager() {
  return <div>dashboard</div>
}

function ArticleManager() {
  const [modalOpen, setModalOpen] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [modifyModalOpen, setModifyModalOpen] = useState(false)
  const [selectArticleId, setSelectArticleId] = useState('')

  const cos = useCos()

  const fetchArticles = async () => {
    const data = await request.get('/articles').catch(() => [])
    setArticles(data)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleAddArticleSubmit: FormProps['onSubmit'] = async (event) => {
    const formData = new FormData(event.currentTarget)
    const data: Record<string, string> = {}
    for (const [key, val] of formData) {
      if (val instanceof File) {
        if (/^image\//.test(val.type)) {
          const path = `article-cover/${val.name}`
          const result = await cos.putObject(path, val).catch(() => {
            toast.error('上传失败')
          })
          if (result && result.statusCode === 200) {
            data[key] = `cdn.apasser.xyz/${path}`
          }
        } else {
          data.title = removeExt(val.name)
          data.date = new Date(val.lastModified).toISOString()
          const content = await val.text()
          data[key] = content
        }
      } else {
        data[key] = val
      }
    }
    const response = await request.post('/article', data).catch(() => {})
    if (response) {
      toast.success(response.message)
      setModalOpen(false)
      fetchArticles()
    }
  }

  const handleArticleDelete = async (id: string) => {
    const response = await request.delete('/article', { id }).catch(() => {
      toast.error('删除失败')
    })
    if (response) {
      toast.success(response.message)
      fetchArticles()
    }
  }

  const handleArticleModifySubmit: FormProps['onSubmit'] = async (event) => {
    const formData = new FormData(event.currentTarget)
    const data: Record<string, string> = {}
    for (const [key, val] of formData) {
      if (val instanceof File) {
        if (/^image\//.test(val.type)) {
          const path = `article-cover/${val.name}`
          const result = await cos.putObject(path, val).catch(() => {
            toast.error('上传失败')
          })
          if (result && result.statusCode === 200) {
            data[key] = `cdn.apasser.xyz/${path}`
          }
        } else {
          const content = await val.text()
          data[key] = content
        }
      } else {
        data[key] = val
      }
    }
    data.id = selectArticleId
    const response = await request.patch('/article', data).catch(() => {})
    if (response) {
      toast.success(response.message)
      setModifyModalOpen(false)
      fetchArticles()
    }
  }

  const renderAricleTree = (articles: Article[]) => {
    const tree = buildTree(articles)
    const renderNode = (node: typeof tree) => {
      if (node.type === 'dir' && node.children.length > 0) {
        return (
          <List.Item key={node.name}>
            <List.Icon name="folder" color="teal" />
            <List.Content>
              <List.Header>{node.name}</List.Header>
              <List.List>{node.children.map((child) => renderNode(child))}</List.List>
            </List.Content>
          </List.Item>
        )
      }
      return (
        <List.Item key={node.name}>
          <List.Icon name="file text" color="blue" />
          <List.Content>
            <List.Header>{node.name}</List.Header>
            <List.Description>
              <MyIcon
                name="modify"
                className="cursor-pointer"
                onClick={() => {
                  setModifyModalOpen(true)
                  setSelectArticleId(node.id as string)
                }}
              />
              <Popup
                basic
                trigger={
                  <MyIcon name="delete" style={{ marginLeft: 5 }} className="cursor-pointer" />
                }
                on="click"
                eventsEnabled={false}
                hideOnScroll
                size="mini"
              >
                <h4>确认删除?</h4>
                <Button size="mini" color="red" onClick={() => document.body.click()}>
                  取消
                </Button>
                <Button
                  size="mini"
                  color="teal"
                  onClick={() => handleArticleDelete(node.id as string)}
                >
                  确定
                </Button>
              </Popup>
            </List.Description>
          </List.Content>
        </List.Item>
      )
    }
    return <List>{tree.children.map((node) => renderNode(node))}</List>
  }

  return (
    <div>
      <div className={classes['article-manager-header']}>
        <Refresh onClick={fetchArticles} />
        <Modal
          trigger={
            <Button primary onClick={() => setModalOpen(true)}>
              上传文章
            </Button>
          }
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          size="tiny"
        >
          <Modal.DefaultHeader onCloseClick={() => setModalOpen(false)}>
            上传文章
          </Modal.DefaultHeader>
          <Modal.Content>
            <Form onSubmit={handleAddArticleSubmit}>
              <Form.Field required>
                <label htmlFor="path">分类路径</label>
                <input id="path" type="text" name="path" required></input>
              </Form.Field>
              <Form.Field required>
                <label htmlFor="coverUrl">封面</label>
                <input id="coverUrl" type="file" name="coverUrl" accept="image/*" required></input>
              </Form.Field>
              <Form.Field required>
                <label htmlFor="content">md文件</label>
                <input id="content" type="file" name="content" accept=".md" required></input>
              </Form.Field>
              <Button color="teal">确认上传</Button>
            </Form>
          </Modal.Content>
        </Modal>
        <Modal open={modifyModalOpen} size="tiny">
          <Modal.DefaultHeader onCloseClick={() => setModifyModalOpen(false)}>
            修改文章
          </Modal.DefaultHeader>
          <Modal.Content>
            <Form onSubmit={handleArticleModifySubmit}>
              <Form.Field>
                <label htmlFor="title">标题</label>
                <input id="title" name="title"></input>
              </Form.Field>
              <Form.Field>
                <label htmlFor="path">分类路径</label>
                <input id="path" type="text" name="path" required></input>
              </Form.Field>
              <Form.Field>
                <label htmlFor="coverUrl">封面</label>
                <input id="coverUrl" type="file" name="coverUrl" accept="image/*" required></input>
              </Form.Field>
              <Form.Field>
                <label htmlFor="content">md文件</label>
                <input id="content" type="file" name="content" accept=".md" required></input>
              </Form.Field>
              <Button color="teal">确认修改</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
      <div className={classes['article-manager-body']}>{renderAricleTree(articles)}</div>
    </div>
  )
}

function BooksManager() {
  return <div>books</div>
}
