// import React, { useState, useEffect } from 'react'
// import { Menu, Button, Form, List, Popup } from 'semantic-ui-react'
// import type { MenuProps, FormProps } from 'semantic-ui-react'
// import { toast } from 'react-toastify'
// import classes from './Manager.module.css'
// import Service from '../../utils/services'
// import type { Article } from '../../typings'
// import Card from '../../components/Card/Card'
// import {Refresh} from '../../views'
// import Modal from '../../components/MyModal/MyModal'
// import {Icon} from '../../components'
// import buildTree from '../../utils/build-tree'
// import type { ANode } from '../../utils/build-tree'
// import { removeExt } from '../../utils'
// import {useCos} from '../../hooks'

// export default function Manager() {
//   const [selectItem, setSelectItem] = useState('dashboard')

//   const items = [
//     { key: 'dashboard', name: 'dashboard', content: '看板' },
//     { key: 'articles', name: 'articles', content: '文章' },
//     { key: 'books', name: 'books', content: '书单' },
//   ]

//   const handleItemClick: MenuProps['onItemClick'] = (event, data) => {
//     if (data.name) {
//       setSelectItem(data.name)
//     }
//   }

//   const renderContent = () => {
//     switch (selectItem) {
//       case 'dashboard':
//         return <DashboardManager />
//       case 'articles':
//         return <ArticleManager />
//       case 'books':
//         return <BooksManager />
//       default:
//         break
//     }
//   }

//   return (
//     <main className={classes['main']}>
//       <Menu
//         vertical
//         pointing
//         color="blue"
//         className={classes['menu']}
//         items={items}
//         defaultActiveIndex={0}
//         onItemClick={handleItemClick}
//       />
//       <Card>{renderContent()}</Card>
//     </main>
//   )
// }

// function DashboardManager() {
//   return <div>dashboard</div>
// }

// function ArticleManager() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [articles, setArticles] = useState<Article[]>([])
//   const [modifyModalOpen, setModifyModalOpen] = useState(false)
//   const [selectArticleId, setSelectArticleId] = useState('')

//   const cos = useCos()

//   const fetchArticles = async () => {
//     const data = await Service.getAllArticles().catch(() => [])
//     setArticles(data)
//   }

//   useEffect(() => {
//     fetchArticles()
//   }, [])

//   const handleAddArticleSubmit: FormProps['onSubmit'] = async (event) => {
//     const formData = new FormData(event.currentTarget)
//     const data: Record<string, string> = {}
//     for (const [key, value] of formData) {
//       if (value instanceof File) {
//         if (/^image\//.test(value.type)) {
//           const path = `article-cover/${value.name}`
//           const result = await cos.putObject(path, value).catch(() => {
//             toast.error('上传失败')
//           })
//           if (result && result.statusCode === 200) {
//             data[key] = `cdn.apasser.xyz/${path}`
//           }
//         } else {
//           data.title = removeExt(value.name)
//           data.date = new Date(value.lastModified).toISOString()
//           const content = await value.text()
//           data[key] = content
//         }
//       } else {
//         data[key] = value
//       }
//     }
//     // @ts-ignore
//     const response = await Service.addArticle(data).catch(() => {})
//     if (response) {
//       toast.success(response.message)
//       setModalOpen(false)
//       fetchArticles()
//     }
//   }

//   const handleArticleDelete = async (id?: string) => {
//     if (!id) {
//       return
//     }
//     const response = await Service.deleteArticleById({ _id: id }).catch(() => {
//       toast.error('删除失败')
//     })
//     if (response) {
//       toast.success(response.message)
//       fetchArticles()
//     }
//   }

//   const handleArticleModifySubmit: FormProps['onSubmit'] = async (event) => {
//     const formData = new FormData(event.currentTarget)
//     const data: Record<string, string> = {}
//     for (const [key, value] of formData) {
//       if (value instanceof File) {
//         if (/^image\//.test(value.type)) {
//           const path = `article-cover/${value.name}`
//           const result = await cos.putObject(path, value).catch(() => {
//             toast.error('上传失败')
//           })
//           if (result && result.statusCode === 200) {
//             data[key] = `cdn.apasser.xyz/${path}`
//           }
//         } else {
//           const content = await value.text()
//           data[key] = content
//           data.date = new Date(value.lastModified).toISOString()
//         }
//       } else {
//         data[key] = value
//       }
//     }
//     // @ts-ignore
//     const response = await Service.modifyArticleById({ _id: selectArticleId }, data).catch(() => {})
//     if (response) {
//       toast.success(response.message)
//       setModifyModalOpen(false)
//       fetchArticles()
//     }
//   }

//   const renderNode = (node: ANode) => {
//     if (node.type === 'dir' && node.children.length > 0) {
//       return (
//         <List.Item key={node.name}>
//           <List.Icon name="folder" color="teal" />
//           <List.Content>
//             <List.Header className="fontsize-large">{node.name}</List.Header>
//             <List.List>{node.children.map((child) => renderNode(child))}</List.List>
//           </List.Content>
//         </List.Item>
//       )
//     }
//     return (
//       <List.Item key={node.name}>
//         <List.Icon name="file text" color="blue" />
//         <List.Content>
//           <List.Header>
//             <span className="margin-right-20 fontsize-large">{node.name}</span>
//             <span>
//               <Icon
//                 name="modify"
//                 className="cursor-pointer fontsize-large margin-right-10"
//                 onClick={() => {
//                   setModifyModalOpen(true)
//                   if (node.id) {
//                     setSelectArticleId(node.id)
//                   }
//                 }}
//               />
//               <Popup
//                 basic
//                 trigger={<Icon name="delete" className="cursor-pointer fontsize-large" />}
//                 on="click"
//                 eventsEnabled={false}
//                 hideOnScroll
//                 size="mini"
//               >
//                 <h4>确认删除?</h4>
//                 <Button size="mini" color="red" onClick={document.body.click}>
//                   取消
//                 </Button>
//                 <Button size="mini" color="teal" onClick={() => handleArticleDelete(node.id)}>
//                   确定
//                 </Button>
//               </Popup>
//             </span>
//           </List.Header>
//         </List.Content>
//       </List.Item>
//     )
//   }

//   const renderAricleTree = (articles: Article[]) => {
//     const tree = buildTree(articles)
//     return <List>{tree.children.map((node) => renderNode(node))}</List>
//   }

//   return (
//     <div>
//       <div className={classes['article-manager-header']}>
//         <Refresh onClick={fetchArticles} />
//         <Modal
//           trigger={
//             <Button primary onClick={() => setModalOpen(true)}>
//               上传文章
//             </Button>
//           }
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           size="tiny"
//         >
//           <Modal.DefaultHeader onCloseClick={() => setModalOpen(false)}>
//             上传文章
//           </Modal.DefaultHeader>
//           <Modal.Content>
//             <Form onSubmit={handleAddArticleSubmit}>
//               <Form.Field required>
//                 <label htmlFor="path">分类路径</label>
//                 <input id="path" type="text" name="path" required></input>
//               </Form.Field>
//               <Form.Field required>
//                 <label htmlFor="coverUrl">封面</label>
//                 <input id="coverUrl" type="file" name="coverUrl" accept="image/*" required></input>
//               </Form.Field>
//               <Form.Field required>
//                 <label htmlFor="content">md文件</label>
//                 <input id="content" type="file" name="content" accept=".md" required></input>
//               </Form.Field>
//               <Button color="teal">确认上传</Button>
//             </Form>
//           </Modal.Content>
//         </Modal>
//         <Modal open={modifyModalOpen} size="tiny">
//           <Modal.DefaultHeader onCloseClick={() => setModifyModalOpen(false)}>
//             修改文章
//           </Modal.DefaultHeader>
//           <Modal.Content>
//             <Form onSubmit={handleArticleModifySubmit}>
//               <Form.Field>
//                 <label htmlFor="title">标题</label>
//                 <input id="title" name="title"></input>
//               </Form.Field>
//               <Form.Field>
//                 <label htmlFor="path">分类路径</label>
//                 <input id="path" type="text" name="path" required></input>
//               </Form.Field>
//               <Form.Field>
//                 <label htmlFor="coverUrl">封面</label>
//                 <input id="coverUrl" type="file" name="coverUrl" accept="image/*" required></input>
//               </Form.Field>
//               <Form.Field>
//                 <label htmlFor="content">md文件</label>
//                 <input id="content" type="file" name="content" accept=".md" required></input>
//               </Form.Field>
//               <Button color="teal">确认修改</Button>
//             </Form>
//           </Modal.Content>
//         </Modal>
//       </div>
//       <div className={classes['article-manager-body']}>{renderAricleTree(articles)}</div>
//     </div>
//   )
// }

// function BooksManager() {
//   return <div>books</div>
// }
