/**
 * input元素的ChangeEventHandler钩子
 * @param items Record<'xxx', setXxx>
 * @returns onChange回调函数
 */
export default function useInputChangeHandler(items: Record<string, (newVal: string) => void>) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    items[event.target.name](event.target.value)
  }
}
