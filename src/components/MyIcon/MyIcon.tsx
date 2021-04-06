import React from 'react'

interface IconProps {
  name: string
  className?: string
  style?: React.CSSProperties
  iconfontClassName?: string
}

/**
 * iconfont组件
 */
export default function MyIcon(props: IconProps) {
  return (
    <svg className={`iconfont ${props.iconfontClassName ?? ''}`} aria-hidden>
      <use xlinkHref={`#icon-${props.name}`} style={props.style} className={props.className}></use>
    </svg>
  )
}
