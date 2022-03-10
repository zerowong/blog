import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { shouldShowLeftArrow } from '../utils/config'

export function useShowLeftArrow() {
  const location = useLocation()
  const showLeftArrow = useMemo(
    () => shouldShowLeftArrow(location.pathname),
    [location.pathname]
  )
  return showLeftArrow
}
