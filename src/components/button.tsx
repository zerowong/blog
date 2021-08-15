import React from 'react'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import Icon from './icon'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  loading?: boolean
  color?: 'teal' | 'green' | 'sky' | 'blue' | 'gray' | 'red'
  icon?: React.ReactNode
  block?: boolean
  text?: boolean
}

const colorClassMap = {
  'teal': 'bg-teal-100 text-teal-900',
  'green': 'bg-green-100 text-green-900',
  'sky': 'bg-sky-100 text-sky-900',
  'blue': 'bg-blue-100 text-blue-900',
  'gray': 'bg-gray-100 text-gray-900',
  'red': 'bg-red-100 text-red-900',
}

const focusColorClassMap = {
  'teal': 'hover:bg-teal-200 focus:ring-teal-200',
  'green': 'hover:bg-green-200 focus:ring-green-200',
  'sky': 'hover:bg-sky-200 focus:ring-sky-200',
  'blue': 'hover:bg-blue-200 focus:ring-blue-200',
  'gray': 'hover:bg-gray-200 focus:ring-gray-200',
  'red': 'hover:bg-red-200 focus:ring-red-200',
}

const textColorClassMap = {
  'teal': 'text-teal-500',
  'green': 'text-green-500',
  'sky': 'text-sky-500',
  'blue': 'text-blue-500',
  'gray': 'text-gray-500',
  'red': 'text-red-500',
}

/**
 * 按钮
 * @param loading 加载态，加载中不响应单击事件
 * @param color 颜色
 * @param icon 图标，置于左侧
 * @param block 适应容器宽度
 * @param text 文本模式，该模式下将只有`color`,`block`生效
 */
export default function Button(props: ButtonProps) {
  const {
    loading = false,
    children,
    className,
    color = 'teal',
    icon,
    block,
    text,
    ...rest
  } = props

  return (
    <button
      className={classNames(
        {
          'inline-flex justify-center items-center rounded-md px-4 py-2 shadow-sm transition-colors duration-300 text-center':
            !text,
          // 文本模式无背景色和文字颜色加深
          [colorClassMap[color]]: !text,
          // 文本模式、加载中、禁用时没有聚焦边框
          [`focus:ring-2 ${focusColorClassMap[color]}`]:
            !text && !(loading || rest.disabled),
          // 文本模式颜色
          [textColorClassMap[color]]: text,
          // 不是文本模式且为加载中或禁用时
          'cursor-not-allowed opacity-40': !text && (loading || rest.disabled),
          'w-full': block,
        },
        className
      )}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {text ? (
        children
      ) : (
        <>
          <Transition
            show={loading && !icon}
            enter="transition-all duration-300"
            enterFrom="transform-gpu opacity-0 scale-0 w-0"
            enterTo="transform-gpu opacity-100 scale-100 w-5"
            leave="transition-all duration-300"
            leaveFrom="transform-gpu opacity-100 scale-100 w-5"
            leaveTo="transform-gpu opacity-0 scale-0 w-0"
          >
            <Icon name="loading" className="animate-spin mr-1" />
          </Transition>
          <div>
            {icon && (
              <span className={classNames({ 'mr-1': children })}>
                {loading ? (
                  <Icon name="loading" className="animate-spin" />
                ) : (
                  icon
                )}
              </span>
            )}
            {children}
          </div>
        </>
      )}
    </button>
  )
}
