import React, { useState } from 'react'
import classNames from 'classnames'
import MyIcon from 'src/components/MyIcon/MyIcon'

interface RefreshProps {
  onClick: () => Promise<unknown>
}

export default function Refresh(props: RefreshProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      props.onClick().then(
        () => setLoading(false),
        () => setLoading(false)
      )
    }, 500)
  }

  return (
    <MyIcon
      name="refresh"
      style={{ fontSize: 30 }}
      className={classNames('cursor-pointer', { spin: loading })}
      onClick={handleClick}
    ></MyIcon>
  )
}
