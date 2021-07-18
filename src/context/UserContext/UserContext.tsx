import React, { createContext, useState, useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import Service from 'src/utils/services'
import type { UserContextType } from 'src/typings'

export const UserContext = createContext<UserContextType>({
  value: null,
  dispatch: async () => {},
})

/**
 * 用户上下文组件
 */
export default function UserContextProvider(props: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<UserContextType['value']>(null)

  const dispatch: UserContextType['dispatch'] = async (action) => {
    switch (action) {
      case 'fetch': {
        const user = await Service.userAuth().catch(() => null)
        setUser(user)
        break
      }
      case 'reset': {
        await Service.userLogout().catch(() => {})
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
