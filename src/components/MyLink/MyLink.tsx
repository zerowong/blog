import React from 'react'
import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames/bind'
import classes from './MyLink.module.css'

export default function MyLink(
  props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  return (
    <a
      className={classNames('hvr-underline-from-center', classes['my-link'], props.className)}
      {...props}
    ></a>
  )
}
