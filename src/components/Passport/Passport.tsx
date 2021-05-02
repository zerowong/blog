import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import c from './passport.module.css'
import MyLink from 'src/components/MyLink/MyLink'
import SignInForm from './SignInForm'
import RegisterForm from './RegisterForm'

/**
 * 登录及注册模态框
 */
export default function PassportModal() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formSwitch, setFormSwitch] = useState({
    key: 'signin',
    header: '登录',
    link: '还没有账号？前往注册',
  })

  const handleFormSwitch = () => {
    if (formSwitch.key === 'signin') {
      setFormSwitch({
        key: 'register',
        header: '注册',
        link: '已有账号？前往登录',
      })
    } else {
      setFormSwitch({
        key: 'signin',
        header: '登录',
        link: '还没有账号？前往注册',
      })
    }
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <Modal
      trigger={<Button color="teal">登录</Button>}
      open={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={closeModal}
      dimmer={<Modal.Dimmer className={c['dimmer-override']} />}
      style={{ width: 400, height: 550 }}
    >
      <Modal.Header className={c['modal-header']}>{formSwitch.header}</Modal.Header>
      <Modal.Content>
        {formSwitch.key === 'register' ? (
          <RegisterForm closeModal={closeModal} />
        ) : (
          <SignInForm closeModal={closeModal} />
        )}
      </Modal.Content>
      <Modal.Description className={c['modal-description']}>
        <MyLink style={{ fontSize: 'large' }} onClick={handleFormSwitch}>
          {formSwitch.link}
        </MyLink>
      </Modal.Description>
    </Modal>
  )
}
