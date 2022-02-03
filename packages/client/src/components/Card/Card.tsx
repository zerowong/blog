import React from 'react'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import classNames from 'classnames'
import classes from './Card.module.css'

export default function Card(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  const { className, children, ...ohter } = props
  return (
    <div className={classNames(classes['card'], className)} {...ohter}>
      {children}
    </div>
  )
}
