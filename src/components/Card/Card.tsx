import React from 'react'
import type { PropsWithChildren } from 'react'
import classes from './Card.module.css'

export default function Card(props: PropsWithChildren<unknown>) {
  return <div className={classes['card']}>{props.children}</div>
}
