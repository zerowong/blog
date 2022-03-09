import type { ComponentProps } from 'react'
import { IconFont } from '../components/IconFont'
import classNames from 'classnames'

interface LoadingProps extends ComponentProps<'div'> {
  loading?: boolean
}

export function Loading(props: LoadingProps) {
  const { loading, children, className, ...rest } = props

  if (children) {
    return (
      <div
        className={classNames(
          {
            'flex justify-center items-center': loading,
          },
          className
        )}
        {...rest}
      >
        {loading ? (
          <IconFont
            name="loading"
            className="animate-spin rounded-full text-violet-500"
          />
        ) : (
          children
        )}
      </div>
    )
  }

  return <IconFont name="loading" className="rounded-full text-violet-500 animate-spin" />
}
