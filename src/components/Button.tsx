import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Icon from './Icon'
import type { Colors } from 'src/typings'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  loading?: boolean
  color?: Colors
}

function getColorClass(color?: Colors) {
  if (color) {
    // 不需要purge
    return `bg-${color}-100 text-${color}-900 hover:bg-${color}-200 focus:ring-${color}-200`
  }
  return 'bg-teal-100 text-teal-900 hover:bg-teal-200 focus:ring-teal-200'
}

/**
 * 按钮组件
 * @param loading 加载态
 * @param color 颜色
 */
export default function Button(props: ButtonProps) {
  const { loading, children, className, color, ...rest } = props

  const [colorClass, setColorClass] = useState(getColorClass(color))

  useEffect(() => {
    setColorClass(getColorClass(color))
  }, [color])

  return (
    <button
      className={classNames(
        'inline-flex justify-center items-center rounded-md text-base px-4 py-2 select-none  focus:outline-none focus:ring-2 shadow-sm transition-colors',
        colorClass,
        className
      )}
      {...rest}
    >
      {/* todo: 加载时的样式 */}
      {loading ? <Icon name="loading" className="animate-spin" /> : children}
    </button>
  )
}
