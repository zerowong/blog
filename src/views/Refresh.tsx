import React, { useState } from 'react'
import classNames from 'classnames'
import { Icon } from 'src/components'

interface RefreshProps {
  onClick: () => Promise<unknown>
}

export function Refresh(props: RefreshProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    props.onClick().finally(() => setTimeout(() => setLoading(false), 500))
  }

  return (
    <Icon
      name="refresh"
      className={classNames('cursor-pointer', 'text-3xl', {
        'animate-spin': loading,
      })}
      onClick={handleClick}
    />
  )
}
