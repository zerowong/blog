import React, { useState } from 'react'
import { Popup, Menu } from 'semantic-ui-react'
import c from './UserProfile.module.css'
import type { UserContextType } from '@/typings'
import MyIcon from '@/components/MyIcon/MyIcon'

interface UserPorfileProps {
  user: UserContextType
}

export default function UserProfile(props: UserPorfileProps) {
  const { value: user, dispatch } = props.user

  const [avatarClassNames, setAvatarClassNames] = useState(c['avatar'])

  const items = [
    {
      name: 'user',
      text: '我的主页',
      clickHandler: () => {
        /** todo */
      },
    },
    { name: 'signout', text: '退出', clickHandler: () => dispatch('reset') },
  ]

  const handleOpen = () => {
    setAvatarClassNames(`${c['avatar']} ${c['avatar-active']}`)
  }

  const handleClose = () => {
    setAvatarClassNames(c['avatar'])
  }

  return (
    <Popup
      trigger={
        <img src={user?.avatar} alt={`${user?.name}'s avatar`} className={avatarClassNames} />
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
      className={c['popup-modal-override']}
    >
      <>
        <img src={user?.avatar} alt={`${user?.name}'s avatar`} className={c['popup-avatar']} />
        <div className={c['content']}>
          <h2 className={c['popup-name']}>{user?.name}</h2>
          <Menu vertical secondary fluid compact>
            {items.map((item) => (
              <Menu.Item key={item.name} name={item.name} onClick={item.clickHandler}>
                <span className={c['menu-item']}>
                  <MyIcon name={item.name} />
                  <span className={c['menu-item-text']}>{item.text}</span>
                </span>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </>
    </Popup>
  )
}
