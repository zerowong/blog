import React, { createContext, useState, useEffect } from 'react'
import service from '@/utils/services'
import type { User, UserContextType } from '@/typings'

export const UserContext = createContext<UserContextType>({
  value: null,
  dispatch: async () => {},
})

interface UserContextWrapperProps {
  children: React.ReactNode
}

/**
 * 用户上下文组件
 */
export default function UserContextWrapper(props: UserContextWrapperProps) {
  const [user, setUser] = useState<User | null>(null)

  const dispatch: UserContextType['dispatch'] = async (action) => {
    switch (action) {
      case 'fetch': {
        try {
          const user = await service.get<User>('/user/auth', { doNothing: true })
          setUser(user)
        } catch {}
        break
      }
      case 'reset': {
        try {
          await service.get('/logout')
        } finally {
          setUser(null)
        }
        break
      }
      default:
        if (import.meta.env.DEV) {
          throw new Error('type invalid')
        }
    }
  }

  useEffect(() => {
    dispatch('fetch')
  }, [])

  return (
    <UserContext.Provider value={{ value: user, dispatch }}>{props.children}</UserContext.Provider>
  )
}
