import { useState, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useGlobalEffect } from '../hooks'
import { Avatar, Drawer, IconFont } from '../components'
import { Button } from '@waterui/react'
import useStore from '../store'
import { Pages, shouldShowLeftArrow } from '../utils/config'

/**
 * 顶部导航栏(移动端)
 */
export function NavBar() {
  const location = useLocation()
  const history = useHistory()

  useGlobalEffect()

  const [drawerVisible, setDrawerVisible] = useState(false)

  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)
  const navTitle = useStore((s) => s.navTitle)

  const [logoutLoading, setLogoutLoading] = useState(false)

  const showLeftArrow = useMemo(
    () => shouldShowLeftArrow(location.pathname),
    [location.pathname]
  )

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

  return (
    <div className="fixed top-0 inset-x-0 h-12 px-5 flex items-center justify-between backdrop-blur-md bg-white/[0.85] z-[var(--blog-nav-zindex)]">
      <span className="inline-flex items-center flex-grow">
        {showLeftArrow ? (
          <IconFont
            name="arrow-left-fill"
            size="large"
            onClick={() => history.goBack()}
            className="mr-5"
          />
        ) : (
          <Avatar
            src={user?.avatar}
            onClick={() => setDrawerVisible(true)}
            containerClassName="mr-5"
            feedback={
              <IconFont
                name="user"
                className="mr-5"
                onClick={() => setDrawerVisible(true)}
              />
            }
          />
        )}
        <span
          className="font-bold text-lg truncate w-40 flex-grow"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {navTitle}
        </span>
      </span>
      <div className="rounded-full">
        {/* @todo 主题 */}
        {/* <IconFont name="like-fill" /> */}
      </div>
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
                onClick={async () => {
                  setLogoutLoading(true)
                  try {
                    await logout()
                    setDrawerVisible(false)
                  } finally {
                    setLogoutLoading(false)
                  }
                }}
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
    </div>
  )
}
