import create from 'zustand'
import { devtools } from 'zustand/middleware'
import type { User } from '../typings'
import { PassportService } from '../services'

interface Message {
  value: string
  type: 'error' | 'info'
}

interface State {
  user: User | null
  auth(): Promise<void>
  logout(): Promise<void>
  globalLoading: boolean
  setGlobalLoading(arg: boolean): void
  navTitle: string
  setNavTitle(arg: string): void
  globalMessage: Message
  setGlobalMessage(value: string, type?: Message['type']): void
  isDesktop: boolean
  setIsDesktop(arg: boolean): void
}

const useStore = create<State>(
  devtools((set) => ({
    user: null,
    async auth() {
      try {
        const user = await PassportService.auth()
        return set({ user })
      } catch {}
    },
    async logout() {
      try {
        await PassportService.logout()
        return set({ user: null })
      } catch {}
    },
    globalLoading: false,
    setGlobalLoading(arg) {
      return set({ globalLoading: arg })
    },
    navTitle: '',
    setNavTitle(arg) {
      return set({ navTitle: arg })
    },
    globalMessage: { value: '', type: 'info' },
    setGlobalMessage(value, type = 'error') {
      return set({ globalMessage: { value, type } })
    },
    isDesktop: window.matchMedia('(min-width: 1024px)').matches,
    setIsDesktop(arg) {
      return set({ isDesktop: arg })
    },
  }))
)

export default useStore
