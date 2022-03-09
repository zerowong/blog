import { useState, useCallback } from 'react'

export function useForceUpdate(): [boolean, () => void] {
  const [value, setValue] = useState(false)

  const forceUpdate = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  return [value, forceUpdate]
}
