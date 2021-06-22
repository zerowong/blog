import React from 'react'
import classNames from 'classnames'
import classes from './NavBar.module.css'
import NavLinks from 'src/components/NavLinks/NavLinks'
import PassportModal from 'src/components/Passport/Passport'
import UserProfile from 'src/components/UserPorfile/UserProfile'
import useUser from 'src/hooks/useUser'

/**
 * 顶部导航栏
 */
export default function NavBar() {
  const user = useUser()

  return (
    <nav className={classes['nav-bar']}>
      <a className={classes['brand']} href="/">
        ApassEr
      </a>
      <NavLinks />
      <div className={classNames({ hidden: !user.value })}>
        <UserProfile user={user} />
      </div>
      <div className={classNames({ hidden: user.value })}>
        <PassportModal />
      </div>
    </nav>
  )
}
