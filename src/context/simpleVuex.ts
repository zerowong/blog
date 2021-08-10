/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @module 简版`vuex`
 */

import { useReducer, useCallback } from 'react'

interface Mutations<State> {
  [key: string]: (state: State, ...payload: any[]) => State
}

interface Actions<State> {
  [key: string]: (
    context: Pick<Store<State>, 'state' | 'commit'>,
    ...payload: any[]
  ) => Promise<void>
}

interface Option<State> {
  state: State
  mutations: Mutations<State>
  actions: Actions<State>
}

export interface Store<State> {
  state: State
  commit: (type: string, ...payload: any[]) => void
  dispatch: (type: string, ...payload: any[]) => Promise<void>
}

export default function CreateStore<State>(option: Option<State>): Store<State> {
  const [state, _commit] = useReducer((state: State, action: { type: string; payload: any[] }) => {
    const targetMutation = option.mutations[action.type]
    if (typeof targetMutation === 'function') {
      // 外部做一次浅拷贝，mutation里可直接返回state
      const newState = { ...state }
      return targetMutation(newState, ...action.payload)
    }
    return state
  }, option.state)

  const commit = useCallback<Store<State>['commit']>((type, ...payload) => {
    return _commit({ type, payload })
  }, [])

  const dispatch = useCallback<Store<State>['dispatch']>(
    (type, ...payload) => {
      const targetAction = option.actions[type]
      if (typeof targetAction === 'function') {
        return targetAction({ state, commit }, ...payload)
      }
      return Promise.resolve()
    },
    [state, commit, option.actions]
  )

  return {
    state,
    commit,
    dispatch,
  }
}
