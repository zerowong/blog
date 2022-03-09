import { useState } from 'react'
import classNames from 'classnames'
import { IconFont } from '../components'

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
    <IconFont
      name="refresh"
      className={classNames('cursor-pointer', 'text-3xl', {
        'animate-spin': loading,
      })}
      onClick={handleClick}
    />
  )
}
