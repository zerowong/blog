import React, { useState } from 'react'
import { Button } from 'src/components'
import { Icon } from 'src/components'

/**
 * 主页
 */
export default function Home() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="space-x-1">
      <Button
        color="teal"
        loading={loading}
        onClick={() => {
          setLoading(!loading)
        }}
        // block
        // disabled
        // text
      >
        测试
        {/* <Icon name="home" /> */}
      </Button>
      <Button
        color="blue"
        onClick={() => {
          setLoading(!loading)
        }}
      >
        文本
      </Button>
      <Button color="sky" icon={<Icon name="home" />}>
        文本
      </Button>
      <Button color="green">文本</Button>
      <Button color="gray">文本</Button>
      <Button color="red">文本</Button>
    </div>
  )
}
