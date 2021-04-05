import React, { createContext, useState, useEffect, useCallback } from 'react'
import service from '@/utils/services'
import type { User } from '@/typings'

async function fetchUser() {
  try {
    const user = await service.get<User>('/user/auth', { doNothing: true })
    return user
  } catch {
    return null
  }
}

interface UserContextType {
  value: User | null
  dispatch: (action: 'fetch' | 'reset') => Promise<void>
}

export const UserContext = createContext<UserContextType>({
  value: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: async () => {},
})

interface UserContextWrapperProps {
  children?: React.ReactNode
}

/**
 * 用户上下文组件
 */
export default function UserContextWrapper(props: UserContextWrapperProps) {
  const [user, setUser] = useState<User | null>(null)
  const dispatch = useCallback<UserContextType['dispatch']>(async (action) => {
    switch (action) {
      case 'fetch':
        setUser(await fetchUser())
        break
      case 'reset':
        setUser(null)
        break
      default:
        throw new Error('type invalid')
    }
  }, [])

  useEffect(() => {
    fetchUser().then((user) => setUser(user))
  }, [])

  return (
    <UserContext.Provider value={{ value: user, dispatch }}>{props.children}</UserContext.Provider>
  )
}
