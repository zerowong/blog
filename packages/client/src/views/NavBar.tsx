import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalEffect, useShowLeftArrow } from '../hooks'
import { Avatar, Drawer, IconFont, MobileRender } from '../components'
import { Button } from '@waterui/react'
import useStore from '../store'
import { Pages } from '../utils/config'
import { ThemeSwitch } from './ThemeSwitch'

/**
 * 顶部导航栏(移动端)
 */
export function NavBar() {
  const history = useHistory()

  useGlobalEffect()

  const [drawerVisible, setDrawerVisible] = useState(false)

  const user = useStore((s) => s.user)
  const logout = useStore((s) => s.logout)
  const navTitle = useStore((s) => s.navTitle)

  const [logoutLoading, setLogoutLoading] = useState(false)

  const showLeftArrow = useShowLeftArrow()

  const toUserProfile = () => {
    if (user) {
      setDrawerVisible(false)
      return history.push(`${Pages.user}/${user._id}`)
    }
  }

  const toPage = (page: string) => {
    setDrawerVisible(false)
    return history.push(page)
  }

  const handleLogout = async () => {
    setLogoutLoading(true)
    try {
      await logout()
      setDrawerVisible(false)
    } finally {
      setLogoutLoading(false)
    }
  }

  return (
    <div className="sticky top-0 inset-x-0 h-12 px-5 flex items-center justify-between backdrop-blur-md bg-white/[0.85] z-[var(--blog-nav-zindex)]">
      <span className="inline-flex items-center flex-grow">
        {showLeftArrow && (
          <IconFont
            name="arrow-left-fill"
            size="large"
            onClick={() => history.goBack()}
            className="mr-5 lg:cursor-pointer"
          />
        )}
        <MobileRender>
          {!showLeftArrow && (
            <Avatar
              src={user?.avatar}
              onClick={() => setDrawerVisible(true)}
              containerClassName="mr-5"
              fallback={
                <IconFont
                  name="user"
                  className="mr-5"
                  onClick={() => setDrawerVisible(true)}
                />
              }
            />
          )}
        </MobileRender>
        <span
          className="font-bold text-lg truncate w-40 flex-grow lg:cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {navTitle}
        </span>
      </span>
      <ThemeSwitch />
      <MobileRender>
        <Drawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          title="账号信息"
          width="65vw"
        >
          {user ? (
            <div className="divide-y">
              <div className="p-5 flex items-center gap-x-5" onClick={toUserProfile}>
                <Avatar src={user.avatar} size={50} />
                <span className="font-bold">{user.name}</span>
              </div>
              <div className="p-5">
                <Button
                  block
                  onClick={toUserProfile}
                  icon={<IconFont name="user" size={20} />}
                  iconWrapperClassName="mr-1"
                >
                  个人资料
                </Button>
                <Button
                  block
                  color="red"
                  loading={logoutLoading}
                  onClick={handleLogout}
                  icon={<IconFont name="signout" size={20} />}
                  iconWrapperClassName="mr-1"
                >
                  登出
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <Button
                block
                onClick={() => toPage(Pages.login)}
                icon={<IconFont name="signin" size={20} />}
                iconWrapperClassName="mr-1"
              >
                登录
              </Button>
              <Button
                block
                color="green"
                onClick={() => toPage(Pages.register)}
                icon={<IconFont name="register" size={20} />}
                iconWrapperClassName="mr-1"
              >
                注册
              </Button>
            </div>
          )}
          <div className="px-5 border-t">
            <Button block color="teal" onClick={() => toPage(Pages.about)}>
              关于
            </Button>
          </div>
        </Drawer>
      </MobileRender>
    </div>
  )
}
