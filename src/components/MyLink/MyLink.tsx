import React from 'react'
import classNames from 'classnames/bind'
import classes from './MyLink.module.css'

interface MyLinkProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export default function MyLink(props: MyLinkProps) {
  return (
    <a
      className={classNames('hvr-underline-from-center', classes['my-link'], props.className)}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  )
}
