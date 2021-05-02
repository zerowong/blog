import { useContext } from 'react'
import { UserContext } from 'src/components/UserContextWrapper/UserContextWrapper'

/**
 * 用户钩子
 * @returns 用户对象
 */
export default function useUser() {
  return useContext(UserContext)
}
