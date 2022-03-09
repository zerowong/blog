import useStore from '../store'
import shallow from 'zustand/shallow'

export function useGlobalLoading(): [boolean, (arg: boolean) => void] {
  return useStore((s) => [s.globalLoading, s.setGlobalLoading], shallow)
}
