import React, { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import Service from 'src/utils/services'
import type { User, Nullable } from 'src/typings'
import createStore from './simpleVuex'
import type { Store } from './simpleVuex'

interface State {
  user: Nullable<User>
}

// @ts-ignore
const StoreContext = createContext<Store<State>>({})

export function StoreContextProvider(props: PropsWithChildren<unknown>) {
  const store = createStore<State>({
    state: {
      user: null,
    },
    mutations: {
      updateUser(state, uesr) {
        state.user = uesr
        return state
      },
    },
    actions: {
      async fetchUser({ commit }) {
        const res = await Service.userAuth().catch(() => null)
        commit('updateUser', res)
      },
    },
  })

  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}
