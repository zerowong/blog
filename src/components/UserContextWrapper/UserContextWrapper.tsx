import React, { createContext, useState, useEffect } from 'react'
import request from 'src/utils/request'
import type { User, UserContextType } from 'src/typings'

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
        const user = await request
          .get('/user/auth', { noCommonErrorHandle: true })
          .catch(() => null)
        setUser(user)
        break
      }
      case 'reset': {
        await request.get('/user/logout', { noCommonErrorHandle: true }).catch(() => {})
        setUser(null)
        break
      }
      default: {
        if (import.meta.env.DEV) {
          throw new Error('type invalid')
        }
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
