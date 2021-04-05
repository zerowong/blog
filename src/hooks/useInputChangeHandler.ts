import { useCallback } from 'react'

/**
 * input元素的ChangeEventHandler钩子
 * @param items Map<'xxx', setXxx>
 * @returns onChange时间回调函数
 */
export default function useInputChangeHandler(items: Map<string, (newVal: string) => void>) {
  return useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      items.get(event.target.name)?.(event.target.value)
    },
    [items]
  )
}
