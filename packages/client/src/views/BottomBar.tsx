import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { IconFont } from '../components'
import { Pages, shouldHideBottomBar } from '../utils/config'

const actions = [
  { to: Pages.home },
  { to: Pages.articles },
  // { to: Pages.search },
  // { to: Pages.notification },
]

const actionStyles = [
  {
    icon: 'home',
    hover: 'hover:bg-teal-100 hover:text-teal-500',
    active: 'bg-teal-100 text-teal-500',
    fill: 'text-teal-500',
  },
  {
    icon: 'articles',
    hover: 'hover:bg-green-100 hover:text-green-500',
    active: 'bg-green-100 text-green-500',
    fill: 'text-green-500',
  },
  {
    icon: 'search',
    hover: 'hover:bg-blue-100 hover:text-blue-500',
    active: 'bg-blue-100 text-blue-500',
    fill: 'text-blue-500',
  },
  {
    icon: 'notify',
    hover: 'hover:bg-purple-100 hover:text-purple-500',
    active: 'bg-purple-100 text-purple-500',
    fill: 'text-purple-500',
  },
]

/**
 * 底部操作栏(移动端)
 */
export function BottomBar() {
  const location = useLocation()
  const isHide = useMemo(
    () => shouldHideBottomBar(location.pathname),
    [location.pathname]
  )

  return (
    <div
      className={classNames(
        'sticky bottom-0 inset-x-0 justify-center gap-x-10 border-t border-gray-100 bg-white',
        isHide ? 'hidden' : 'flex'
      )}
    >
      {actions.map((item, index) => {
        const style = actionStyles[index]
        return (
          <NavLink
            exact
            to={item.to}
            key={item.to}
            className={classNames(
              'p-3 rounded-xl transition-colors inline-flex',
              style.hover
            )}
            activeClassName={style.active}
          >
            <IconFont name={style.icon} className={classNames('text-2xl', style.fill)} />
          </NavLink>
        )
      })}
    </div>
  )
}
