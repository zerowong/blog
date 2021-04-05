import React from 'react'
import { Popup } from 'semantic-ui-react'
import classes from './UserProfile.module.css'
import type { User } from '@/typings'

interface UserPorfileProps {
  user: User
}

export default function UserProfile(props: UserPorfileProps) {
  return (
    <Popup
      trigger={
        <img
          src={props.user.avatar}
          alt={`${props.user.name}'s avatar`}
          className={classes['avatar']}
        />
      }
      basic
      position="bottom center"
      on="hover"
    />
  )
}
