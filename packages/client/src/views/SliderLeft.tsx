import { useGlobalEffect } from '../hooks'
import { Brand } from '../views'
import { Pages } from '../utils/config'
import { NavLink } from 'react-router-dom'
import useStore from '../store'
import { Avatar, IconFont } from '../components'
import classNames from 'classnames'

const actions = [
  { to: Pages.home },
  { to: Pages.articles },
  // { to: Pages.notification },
]

const configs = [
  {
    icon: 'home',
    text: '主页',
  },
  {
    icon: 'articles',
    text: '文章',
  },
  // {
  //   icon: 'notify',
  //   text: '通知',
  // },
]

const LinkStyle = {
  static: 'hover:bg-sky-100 px-7 py-3 rounded-full cursor-pointer',
  active: 'bg-sky-100 text-sky-500',
  text: 'ml-5 font-bold',
  flex: 'hover:bg-sky-100 px-7 py-3 rounded-full cursor-pointer flex justify-start items-center',
}

export function SliderLeft() {
  useGlobalEffect()

  const user = useStore((s) => s.user)
  const logout = useStore((s) => s.logout)

  return (
    <div className="relative">
      <div className="w-[300px] h-full flex justify-center pt-2">
        <div className="fixed space-y-1">
          <div className={'px-7 py-3 cursor-pointer'}>
            <Brand size="large" />
          </div>
          {user ? (
            <NavLink
              exact
              to={`${Pages.user}/${user._id}`}
              className={classNames(LinkStyle.static, 'flex items-center gap-x-5')}
              activeClassName={LinkStyle.active}
            >
              <Avatar src={user.avatar} size={50} />
              <span className="font-bold select-none">{user.name}</span>
            </NavLink>
          ) : (
            <>
              <NavLink
                exact
                to={Pages.login}
                className={LinkStyle.flex}
                activeClassName={LinkStyle.active}
              >
                <IconFont name="signin" />
                <span className={LinkStyle.text}>登录</span>
              </NavLink>
              <NavLink
                exact
                to={Pages.register}
                className={LinkStyle.flex}
                activeClassName={LinkStyle.active}
              >
                <IconFont name="register" />
                <span className={LinkStyle.text}>注册</span>
              </NavLink>
            </>
          )}
          {actions.map((item, index) => {
            const config = configs[index]
            return (
              <NavLink
                exact
                to={item.to}
                key={item.to}
                className={LinkStyle.flex}
                activeClassName={LinkStyle.active}
              >
                <IconFont name={config.icon} />
                <span className={LinkStyle.text}>{config.text}</span>
              </NavLink>
            )
          })}
          {user && (
            <button className={classNames(LinkStyle.flex, 'w-full')} onClick={logout}>
              <IconFont name="signout" />
              <span className={LinkStyle.text}>登出</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
