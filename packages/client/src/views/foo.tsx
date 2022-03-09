import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { IconFont } from '../components'

enum Page {
  home,
  articles,
  comments,
}

const navigation = [
  { to: '/', page: Page.home },
  { to: '/articles', page: Page.articles },
  { to: '/comments', page: Page.comments },
]

const routeConfigurations = [
  {
    color: 'teal',
    icon: 'home',
    title: '首页',
  },
  {
    color: 'green',
    icon: 'articles',
    title: '文章',
  },
  {
    color: 'blue',
    icon: 'comments',
    title: '留言',
  },
]

const titles = ['', '文章 - ', '留言 - ']

/**
 * 顶部导航栏
 */
export function NavBar() {
  const location = useLocation<{ page: number }>()

  useEffect(() => {
    if (location.state) {
      document.title = `${titles[location.state.page]}ApassEr`
    }
  }, [location])

  return (
    <nav className="px-4 md:px-10 shadow">
      <div className="h-16 flex items-center justify-between md:justify-around">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold flex-shrink-0 text-sky-500">
            ApassEr
          </a>
        </div>
        <div className="flex items-baseline space-x-3">
          {navigation.map((item) => {
            const config = routeConfigurations[item.page]
            return (
              <NavLink
                exact
                to={{ pathname: item.to, state: { page: item.page } }}
                key={item.to}
                className={classNames(
                  'p-3 text-2xl rounded-xl transition-colors inline-flex items-center',
                  `hover:bg-${config.color}-100 hover:text-${config.color}-500`
                )}
                activeClassName={`bg-${config.color}-100 text-${config.color}-500`}
              >
                <IconFont
                  name={config.icon}
                  className={classNames('text-2xl mr-1', `text-${config.color}-500`)}
                />
                {config.title}
              </NavLink>
            )
          })}
        </div>
        <div className="flex items-center space-x-8">
          <button className="text-gray-500 hover:text-gray-600">
            <IconFont name="notify" className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  )
}
