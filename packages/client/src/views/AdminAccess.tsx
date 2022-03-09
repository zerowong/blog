import type { ReactNode } from 'react'
import useStore from '../store'

interface AdminAccessProps {
  children: ReactNode
}

export function AdminAccess(props: AdminAccessProps) {
  const user = useStore((s) => s.user)

  if (!user?.isAdmin) {
    return null
  }

  return <>{props.children}</>
}
