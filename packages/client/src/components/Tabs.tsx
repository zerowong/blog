import classNames from 'classnames'
import { Tab } from '@headlessui/react'

type TabsProps = Parameters<typeof Tab.Group>[0]

export function Tabs(props: TabsProps) {
  const { children, ...rest } = props

  return (
    <Tab.Group {...rest}>
      <Tab.List className="tabs tabs-boxed">{children}</Tab.List>
    </Tab.Group>
  )
}

type TabProps = Parameters<typeof Tab>[0]

Tabs.Tab = function _Tab(props: TabProps) {
  const { className, children, ...rest } = props

  return (
    <Tab
      className={({ selected }) => {
        return classNames(
          'tab tab-sm',
          {
            'tab-active': selected,
          },
          className
        )
      }}
      {...rest}
    >
      {children}
    </Tab>
  )
}
