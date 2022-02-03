import type { Article } from '../typings/index'

export interface ANode {
  type: 'dir' | 'file'
  name: string
  children: ANode[]
  // if type is 'file'
  id?: string
}

// 在当前深度搜索节点
function searchNode(children: ANode[], dir: string): ANode | null {
  let node = null
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.name === dir) {
      node = child
      break
    }
  }
  return node
}

// 将一维结构转换为树结构
export default function buildTree(articles: Article[]) {
  // 根节点
  const root: ANode = {
    type: 'dir',
    name: 'root',
    children: [],
  }
  if (!articles.length) {
    return root
  }
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]
    // 重新指向根节点
    let pointer: ANode = root
    // 取得路径层级
    const dirs = article.path.split('/')
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i]
      const targetNode = searchNode(pointer.children, dir)
      if (targetNode) {
        // 指向已存在节点
        pointer = targetNode
      } else {
        const dirNode: ANode = {
          type: 'dir',
          name: dir,
          children: [],
        }
        // 增加子节点
        pointer.children.push(dirNode)
        // 指向该子节点
        pointer = dirNode
      }
    }
    // 分支构建完成，推入文件节点
    const fileNode: ANode = {
      type: 'file',
      name: article.title,
      children: [],
      id: article._id,
    }
    pointer.children.push(fileNode)
  }
  return root
}
