import React, { useState, useMemo } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import classes from './passport.module.css'
import MyLink from '@/components/MyLink/MyLink'
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

  const SignInOrRegister = useMemo(() => {
    const closeModal = () => setModalOpen(false)
    switch (formSwitch.key) {
      case 'signin':
        return <SignInForm closeModal={closeModal} />
      case 'register':
        return <RegisterForm closeModal={closeModal} />
      default:
        return <SignInForm closeModal={closeModal} />
    }
  }, [formSwitch.key])

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

  return (
    <Modal
      trigger={<Button color="teal">登录</Button>}
      open={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
      dimmer={<Modal.Dimmer className={classes['dimmer-override']} />}
      style={{ width: 400, height: 550 }}
    >
      <Modal.Header className={classes['modal-header']} content={formSwitch.header} />
      <Modal.Content content={SignInOrRegister} />
      <Modal.Description className={classes['modal-description']}>
        <MyLink style={{ fontSize: 'large' }} onClick={handleFormSwitch}>
          {formSwitch.link}
        </MyLink>
      </Modal.Description>
    </Modal>
  )
}
