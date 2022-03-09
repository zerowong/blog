import { useMemo } from 'react'
import { hasProp } from '../../utils'

export function useSize(
  size: string | number,
  sizeMap: Record<string, number>,
  defaultSize = 24
) {
  const sizeNum = useMemo(() => {
    let num = defaultSize
    if (typeof size === 'string' && hasProp(sizeMap, size)) {
      num = sizeMap[size]
    } else if (typeof size === 'number') {
      num = size
    }
    return num
  }, [size, sizeMap, defaultSize])

  return sizeNum
}
