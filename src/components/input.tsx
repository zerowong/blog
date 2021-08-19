import React, { useState } from 'react'
import classNames from 'classnames'
import { Icon } from './icon'

type InputProps = JSX.IntrinsicElements['input'] & {
  /**
   * 是否有边框，默认`true`
   */
  bordered?: boolean
  /**
   * 可以点击清除图标删除内容
   */
  allowClear?: boolean
}

export function Input(props: InputProps) {
  const {
    bordered = true,
    allowClear,
    value,
    onChange,
    type,
    defaultValue,
    ...rest
  } = props

  const [innerValue, setInnerValue] = useState(() => {
    if (typeof defaultValue === 'string') {
      return defaultValue
    }
    if (typeof defaultValue === 'number') {
      return defaultValue.toString()
    }
    if (Array.isArray(defaultValue)) {
      return defaultValue.join('')
    }
    return ''
  })
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value)
  }

  const [innerType, setInnerType] = useState(type)

  const renderIcon = (type?: string) => {
    switch (type) {
      case 'password':
        return (
          <Icon
            name={innerType === 'password' ? 'eye-close' : 'eye'}
            className="text-gray-400 cursor-pointer hover:text-gray-500 text-lg"
            onClick={() => {
              setInnerType(innerType === 'password' ? 'text' : 'password')
            }}
          />
        )
      default:
        return (
          <Icon
            name="close-fill"
            className={classNames(
              'text-gray-400 cursor-pointer hover:text-gray-500',
              { 'invisible': !allowClear || innerValue.length <= 0 }
            )}
            onClick={() => {
              setInnerValue('')
            }}
          />
        )
    }
  }

  return (
    <span
      className={classNames(
        'transition duration-300 px-3 py-2 hover:border-teal-500',
        {
          'border rounded': bordered,
        }
      )}
    >
      <input
        className={classNames(
          'outline-none disabled:cursor-not-allowed disabled:opacity-70 mr-1'
        )}
        value={value || innerValue}
        onChange={onChange || handleValueChange}
        type={innerType}
        {...rest}
      />
      {renderIcon(type)}
    </span>
  )
}
