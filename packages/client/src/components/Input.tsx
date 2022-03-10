import { forwardRef } from 'react'
import type { ComponentProps, ForwardedRef } from 'react'
import classNames from 'classnames'

function _Input(props: ComponentProps<'input'>, ref: ForwardedRef<HTMLInputElement>) {
  const { className, ...rest } = props

  return (
    <input
      ref={ref}
      className={classNames(
        'py-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 caret-sky-500 lg:hover:border-sky-500 transition-colors',
        className
      )}
      {...rest}
    />
  )
}

export const Input = forwardRef(_Input)
