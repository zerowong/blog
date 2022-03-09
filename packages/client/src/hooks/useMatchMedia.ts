import { useState, useEffect } from 'react'

/**
 * 监听媒体查询
 * @example const match = useMatchMedia('(min-width: 1024px)')
 */
export function useMatchMedia(query: string) {
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
