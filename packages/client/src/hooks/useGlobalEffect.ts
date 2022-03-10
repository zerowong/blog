import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useStore from '../store'
import { titleMap } from '../utils/config'

export function useGlobalEffect() {
  const location = useLocation()
  const setNavTitle = useStore((s) => s.setNavTitle)

  useEffect(() => {
    const title = titleMap.get(location.pathname)
    setNavTitle(title ?? '')
    if (location.pathname === '/' || !title) {
      document.title = 'ApassEr'
    } else {
      document.title = `${title} - ApassEr`
    }
  }, [location.pathname, setNavTitle])
}
