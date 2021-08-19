/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useStore } from 'src/context'

/**
 * 初始化应用全局数据
 */
export function InitialEffect() {
  const { dispatch } = useStore()

  useEffect(() => {
    dispatch('fetchUser')
  }, [])

  return null
}
