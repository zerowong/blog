import type { ComponentProps } from 'react'
import classNames from 'classnames'

interface PageContainerProps extends ComponentProps<'div'> {}

export function PageContainer(props: PageContainerProps) {
  const { className, children, ...rest } = props
  return (
    <div
      className={classNames(
        'pb-[var(--blog-bottom-height)] pt-[var(--blog-nav-height)]',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
