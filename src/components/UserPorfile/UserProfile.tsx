import React, { useState } from 'react'
import { Popup, Menu } from 'semantic-ui-react'
import classes from './UserProfile.module.css'
import type { User } from '@/typings'
import MyIcon from '@/components/MyIcon/MyIcon'

interface UserPorfileProps {
  user: User
}

export default function UserProfile(props: UserPorfileProps) {
  const [avatarClassNames, setAvatarClassNames] = useState(classes['avatar'])

  const items = [
    { name: 'user', text: '个人中心', clickHandler: () => console.log('foo') },
    { name: 'signout', text: '退出', clickHandler: () => console.log('bar') },
  ]

  const handleOpen = () => {
    setAvatarClassNames(`${classes['avatar']} ${classes['avatar-active']}`)
  }

  const handleClose = () => {
    setAvatarClassNames(classes['avatar'])
  }

  return (
    <Popup
      trigger={
        <img
          src={props.user.avatar}
          alt={`${props.user.name}'s avatar`}
          className={avatarClassNames}
        />
      }
      basic
      hoverable
      hideOnScroll
      on="hover"
      position="bottom center"
      mouseEnterDelay={200}
      offset={[0, -40]}
      onOpen={handleOpen}
      onClose={handleClose}
      className={classes['popup-modal-override']}
    >
      <>
        <img
          src={props.user.avatar}
          alt={`${props.user.name}'s avatar`}
          className={classes['popup-avatar']}
        />
        <div className={classes['content']}>
          <h2 className={classes['popup-name']}>{props.user.name}</h2>
          <Menu vertical secondary fluid compact>
            {items.map((item) => (
              <Menu.Item key={item.name} name={item.name} onClick={item.clickHandler}>
                <span className={classes['menu-item']}>
                  <MyIcon name={item.name} />
                  <span className={classes['menu-item-text']}>{item.text}</span>
                </span>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </>
    </Popup>
  )
}
