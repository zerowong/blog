import type { PropsWithChildren, ComponentProps } from 'react'
import classNames from 'classnames'

interface LabelProps extends ComponentProps<'label'> {
  requiredMark?: boolean
  block?: boolean
}

export function Label(props: PropsWithChildren<LabelProps>) {
  const { className, requiredMark, children, block, ...rest } = props

  return (
    <label
      className={classNames('mb-1 text-gray-600', { 'block': block }, className)}
      {...rest}
    >
      {children}
      {requiredMark && <span className="text-red-500">*</span>}
    </label>
  )
}
