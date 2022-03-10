import type { ReactNode } from 'react'
import useStore from '../store'

interface AdminAccessProps {
  children: ReactNode
}

export function AdminRender(props: AdminAccessProps) {
  const user = useStore((s) => s.user)

  if (user?.isAdmin) {
    return <>{props.children}</>
  }

  return null
}
