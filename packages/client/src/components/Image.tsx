import type { ComponentProps } from 'react'

interface ImageProps extends ComponentProps<'img'> {}

export function Image(props: ImageProps) {
  const { width, height, style, ...rest } = props

  return <img style={{ height, width, ...style }} {...rest} />
}
