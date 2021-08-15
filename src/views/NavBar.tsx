import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { Disclosure, Transition } from '@headlessui/react'
import { Icon } from 'src/components'
import { useMatchQuery } from 'src/hooks'
import UserProfile from './UserPorfile/UserProfile'
import Passport from './passport'
import { useStore } from 'src/context'

interface LocationState {
  name: string
}

interface Navigation {
  to: string
  name: string
  key: 'home' | 'articles' | 'comments'
}

const navigation: Navigation[] = [
  { to: '/', name: '首页', key: 'home' },
  { to: '/articles', name: '文章', key: 'articles' },
  { to: '/comments', name: '留言', key: 'comments' },
]

const iconClassMap = {
  'home': 'text-teal-500',
  'articles': 'text-green-500',
  'comments': 'text-blue-500',
}

const navLinkHoverClassMap = {
  'home': 'hover:bg-teal-100 hover:text-teal-500',
  'articles': 'hover:bg-green-100 hover:text-green-500',
  'comments': 'hover:bg-blue-100 hover:text-blue-500',
}

const navLinkActiveClassMap = {
  'home': 'bg-teal-100 text-teal-500',
  'articles': 'bg-green-100 text-green-500',
  'comments': 'bg-blue-100 text-blue-500',
}

/**
 * 顶部导航栏
 */
export default function NavBar() {
  const location = useLocation<LocationState | undefined>()
  const mediumScreen = useMatchQuery('screen and (min-width: 768px)')
  const store = useStore()

  useEffect(() => {
    if (location.state) {
      document.title = `${location.state.name} - ApassEr`
    }
  }, [location])

  return (
    <Disclosure>
      {({ open }) => (
        <nav className="px-4 md:px-8 shadow">
          <div className="h-16 flex items-center justify-between md:justify-around">
            <div className="flex items-center">
              <a
                href="/"
                className="text-2xl font-bold flex-shrink-0 text-sky-500"
              >
                ApassEr
              </a>
            </div>
            {mediumScreen && (
              <>
                <div className="flex items-baseline space-x-3">
                  {navigation.map((item) => (
                    <NavLink
                      exact
                      to={{ pathname: item.to, state: { name: item.name } }}
                      key={item.to}
                      className={classNames(
                        'p-3 text-2xl rounded-xl transition-colors inline-flex items-center',
                        navLinkHoverClassMap[item.key]
                      )}
                      activeClassName={navLinkActiveClassMap[item.key]}
                    >
                      <Icon
                        name={item.key}
                        className={classNames(
                          'text-2xl mr-1',
                          iconClassMap[item.key]
                        )}
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="flex items-center space-x-8">
                  <button className="text-gray-500 hover:text-gray-600">
                    <Icon name="notify" className="text-2xl" />
                  </button>
                  {store.state.user ? (
                    <UserProfile user={store.state.user} />
                  ) : (
                    <Passport />
                  )}
                </div>
              </>
            )}
            {!mediumScreen && (
              <Disclosure.Button>
                <Icon name={open ? 'close' : 'menu'} className="text-4xl" />
              </Disclosure.Button>
            )}
          </div>
          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="transform-gpu -translate-y-1/2 opacity-0"
            enterTo="transform-gpu translate-y-0 opacity-100"
            leave="transition duration-300 ease-in"
            leaveFrom="transform-gpu translate-y-0 opacity-100"
            leaveTo="transform-gpu translate-y-4 opacity-0"
          >
            <Disclosure.Panel className="md:hidden">
              <div className="pb-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    as={NavLink}
                    exact
                    to={{ pathname: item.to, state: { name: item.name } }}
                    key={item.to}
                    className={classNames(
                      'p-3 text-xl rounded-xl transition-colors flex justify-center items-center',
                      navLinkHoverClassMap[item.key]
                    )}
                    activeClassName={navLinkActiveClassMap[item.key]}
                  >
                    <Icon
                      name={item.key}
                      className={classNames(
                        'text-2xl mr-1',
                        iconClassMap[item.key]
                      )}
                    />
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-300 py-3">
                {/* TODO: 用户头像、操作，通知 */}
              </div>
            </Disclosure.Panel>
          </Transition>
        </nav>
      )}
    </Disclosure>
  )
}
