import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import MyIcon from '@/components/MyIcon/MyIcon'
import useUser from '@/hooks/useUser'
import classes from './NavLinks.module.css'

/**
 * 顶部导航栏路由表
 */
export default function NavLinks() {
  const [routeMap, setRouteMap] = useState([
    { to: '/', name: '首页', key: 'home' },
    { to: '/articles', name: '文章', key: 'articles' },
    { to: '/comments', name: '留言', key: 'comments' },
  ])

  const user = useUser()

  useEffect(() => {
    if (user.value?.role === 'admin') {
      setRouteMap((prev) => [...prev, { to: '/manager', name: '后台', key: 'manager' }])
    } else {
      setRouteMap((prev) => {
        if (prev.length > 3) {
          prev.pop()
        }
        return prev
      })
    }
  }, [user])

  return (
    <div className={classes['nav-links']}>
      {routeMap.map((route) => (
        <NavLink
          exact
          to={route.to}
          key={route.to}
          className={`${classes['nav-link']} ${classes[`nav-link-${route.key}`]}`}
          activeClassName={classes[`nav-link-${route.key}-active`]}
        >
          <MyIcon
            name={route.key}
            iconfontClassName={classes['iconfont']}
            className={classes[`icon-${route.key}`]}
          />
          {route.name}
        </NavLink>
      ))}
    </div>
  )
}
