import React from 'react'
import classes from './NavBar.module.css'
import NavLinks from 'src/views/NavLinks/NavLinks'
import PassportModal from 'src/views/Passport/Passport'
import UserProfile from 'src/views/UserPorfile/UserProfile'
import useUser from 'src/hooks/useUser'

/**
 * 顶部导航栏
 */
export default function NavBar() {
  const user = useUser()

  const isLogin = user.value !== null

  return (
    <nav className={classes['nav-bar']}>
      <a className={classes['brand']} href="/">
        ApassEr
      </a>
      <NavLinks />
      <div hidden={!isLogin}>
        <UserProfile user={user} />
      </div>
      <div hidden={isLogin}>
        <PassportModal />
      </div>
    </nav>
  )
}
