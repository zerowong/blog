import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import MyIcon from '@/components/MyIcon/MyIcon'
import useUser from '@/hooks/useUser'
import classes from './NavLinks.module.css'

/**
 * 顶部导航栏路由表
 */
export default function NavLinks() {
  const initRouteMap = useRef([
    { to: '/', name: '首页', key: 'home' },
    { to: '/articles', name: '文章', key: 'articles' },
    { to: '/comments', name: '留言', key: 'comments' },
  ])
  const [routeMap, setRouteMap] = useState(initRouteMap.current)

  const user = useUser()

  useEffect(() => {
    if (user.value?.role === 'admin') {
      setRouteMap([...initRouteMap.current, { to: '/manager', name: '后台', key: 'manager' }])
    } else {
      setRouteMap(initRouteMap.current)
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
