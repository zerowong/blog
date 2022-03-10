import { useState, useEffect } from 'react'
import type { ComponentProps, SyntheticEvent } from 'react'
import classNames from 'classnames'
import { useSize } from './hooks'

interface AvatarProps extends ComponentProps<'img'> {
  /**
   * 形状
   */
  shape?: 'circle' | 'square'
  /**
   * 大小, 长 x 宽
   */
  size?: 'small' | 'medium' | 'large' | number
  fallback?: JSX.Element
  text?: string
  containerClassName?: string
}

const sizeMap = {
  small: 24,
  medium: 32,
  large: 40,
}

export function Avatar(props: AvatarProps) {
  const {
    shape = 'circle',
    size = 'medium',
    onError,
    src,
    fallback,
    text,
    containerClassName,
    ...rest
  } = props

  const sizeNum = useSize(size, sizeMap, 32)

  const [isLoadError, setIsLoadError] = useState(false)
  useEffect(() => {
    setIsLoadError(false)
  }, [src])

  const _onError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (fallback) {
      setIsLoadError(true)
    }
    onError?.(e)
  }

  if (fallback && (isLoadError || !src)) {
    return fallback
  }

  const isTextMode = text !== undefined && text !== null

  return (
    <div
      className={classNames(
        'avatar',
        {
          'placeholder': isTextMode,
        },
        containerClassName
      )}
    >
      <div
        style={{ width: sizeNum }}
        className={classNames({
          'rounded-full': shape === 'circle',
          'rounded-xl': shape === 'square',
          'bg-neutral-focus text-neutral-content': isTextMode,
        })}
      >
        {isTextMode ? (
          <span {...rest}>{text}</span>
        ) : (
          <img src={src} onError={_onError} {...rest} />
        )}
      </div>
    </div>
  )
}
