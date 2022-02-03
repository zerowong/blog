import { useState, useEffect } from 'react'

/**
 * 监听媒体查询
 */
export function useMatchQuery(query: string) {
  const [match, setMatch] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const listener = (event: MediaQueryListEvent) => {
      setMatch(event.matches)
    }
    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [query])

  return match
}
