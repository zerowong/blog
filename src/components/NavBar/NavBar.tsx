import React, { useMemo } from 'react'
import classes from './NavBar.module.css'
import NavLinks from '@/components/NavLinks/NavLinks'
import PassportModal from '@/components/Passport/Passport'
import UserProfile from '@/components/UserPorfile/UserProfile'
import useUser from '@/hooks/useUser'

/**
 * 顶部导航栏
 */
export default function NavBar() {
  const user = useUser()
  const profileOrPassport = useMemo(() => {
    return user.value ? <UserProfile user={user.value} /> : <PassportModal />
  }, [user.value])

  return (
    <nav className={classes['nav-bar']}>
      <a className={classes['brand']} href="/">
        ApassEr
      </a>
      <NavLinks />
      <div>{profileOrPassport}</div>
    </nav>
  )
}
