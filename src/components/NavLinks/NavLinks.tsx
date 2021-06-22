import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import MyIcon from 'src/components/MyIcon/MyIcon'
import useUser from 'src/hooks/useUser'
import classes from './NavLinks.module.css'

interface LocationState {
  name: string
}

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

  // 首次渲染时无state属性
  const location = useLocation<LocationState | undefined>()
  useEffect(() => {
    if (location.state) {
      document.title = `${location.state.name} - ApassEr`
    }
  })

  return (
    <div className={classes['nav-links']}>
      {routeMap.map((route) => (
        <NavLink
          exact
          to={{ pathname: route.to, state: { name: route.name } }}
          key={route.to}
          className={`${classes['nav-link']} ${classes[`nav-link-${route.key}`]}`}
          activeClassName={classes[`nav-link-${route.key}-active`]}
        >
          <MyIcon
            name={route.key}
            className={`${classes['iconfont']} ${classes[`icon-${route.key}`]}`}
          />
          {route.name}
        </NavLink>
      ))}
    </div>
  )
}
