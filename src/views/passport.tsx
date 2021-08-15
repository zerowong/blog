import React, { useState } from 'react'
import { Button, Dialog } from 'src/components'

/**
 * 登录及注册模态框
 */
export default function Passport() {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    return setIsOpen(false)
  }

  const openModal = () => {
    return setIsOpen(true)
  }

  return (
    <div>
      <Button onClick={openModal}>登录/注册</Button>
      <Dialog
        open={isOpen}
        onClose={(value) => setIsOpen(value)}
        centered
        title="标题"
        description="描述"
      >
        <form>
          <input></input>
          <input></input>
        </form>
        <Button onClick={closeModal}>测试</Button>
      </Dialog>
    </div>
  )
}
