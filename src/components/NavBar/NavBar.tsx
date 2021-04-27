import React from 'react'
import classNames from 'classnames'
import c from './NavBar.module.css'
import NavLinks from '@/components/NavLinks/NavLinks'
import PassportModal from '@/components/Passport/Passport'
import UserProfile from '@/components/UserPorfile/UserProfile'
import useUser from '@/hooks/useUser'

/**
 * 顶部导航栏
 */
export default function NavBar() {
  const user = useUser()

  return (
    <nav className={c['nav-bar']}>
      <a className={c['brand']} href="/">
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
