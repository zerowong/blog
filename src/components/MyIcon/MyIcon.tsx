import React from 'react'
import classNames from 'classnames'

interface MyIconProps {
  name: string
  className?: string
  style?: React.CSSProperties
  iconfontClassName?: string
}

/**
 * iconfont组件
 */
export default function MyIcon(props: MyIconProps) {
  return (
    <svg className={classNames('iconfont', props.iconfontClassName)} aria-hidden>
      <use xlinkHref={`#icon-${props.name}`} style={props.style} className={props.className}></use>
    </svg>
  )
}
