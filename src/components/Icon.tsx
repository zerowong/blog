import React from 'react'
import type { SVGProps } from 'react'
import classNames from 'classnames'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string
}

/**
 * iconfont组件
 */
export default function Icon(props: IconProps) {
  const { name, className, ...rest } = props
  return (
    <svg aria-hidden className={classNames('iconfont', className)} {...rest}>
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  )
}
