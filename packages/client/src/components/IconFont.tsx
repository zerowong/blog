import classNames from 'classnames'
import type { ComponentProps } from 'react'
import { useSize } from './hooks'

interface IconProps extends ComponentProps<'svg'> {
  /**
   * 图标名
   */
  name: string
  size?: 'small' | 'medium' | 'large' | number
}

const sizeMap = {
  small: 16,
  medium: 24,
  large: 32,
}

/**
 * iconfont组件
 */
export function IconFont(props: IconProps) {
  const { name, className, size = 'medium', style, ...rest } = props

  const sizeNum = useSize(size, sizeMap)

  return (
    <svg
      aria-hidden
      className={classNames('iconfont inline-block', className)}
      style={{ height: sizeNum, width: sizeNum, ...style }}
      {...rest}
    >
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  )
}
