import React from 'react'
import type { SVGProps } from 'react'
import classNames from 'classnames'

interface MyIconProps extends SVGProps<SVGSVGElement> {
  name: string
}

/**
 * iconfont组件
 */
export default function MyIcon(props: MyIconProps) {
  const { name, className, ...otherProps } = props
  return (
    <svg className={classNames('iconfont', className)} aria-hidden {...otherProps}>
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  )
}
