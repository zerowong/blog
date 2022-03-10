import type { ReactNode } from 'react'
import useStore from '../store'

interface MobileRenderProps {
  children: ReactNode
  /**
   * 反转判定条件: 移动端才渲染 -> 移动端不渲染
   */
  reverse?: boolean
}

export function MobileRender(props: MobileRenderProps) {
  const isDesktop = useStore((s) => s.isDesktop)

  if (isDesktop === !props.reverse) {
    return null
  }
  return <>{props.children}</>
}
