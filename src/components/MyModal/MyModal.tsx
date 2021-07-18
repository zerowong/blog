import React from 'react'
import { Modal } from 'semantic-ui-react'
import type { ModalProps, ModalHeaderProps } from 'semantic-ui-react'
import MyIcon from 'src/components/MyIcon/MyIcon'
import classes from './MyModal.module.css'
// TODO: 支持ESC键关闭
export default function MyModal(props: ModalProps) {
  return (
    <Modal dimmer={<Modal.Dimmer className="dimmer" />} closeOnDimmerClick={false} {...props} />
  )
}

function DefaultHeader(props: ModalHeaderProps & { onCloseClick?: () => void }) {
  const { children, onCloseClick, ...otherProps } = props
  return (
    <Modal.Header className={classes['modal-text']} {...otherProps}>
      {children}
      <MyIcon name="close-fill" className={classes['modal-close-icon']} onClick={onCloseClick} />
    </Modal.Header>
  )
}

MyModal.Header = Modal.Header
MyModal.Content = Modal.Content
MyModal.Description = Modal.Description
MyModal.Actions = Modal.Actions
MyModal.Dimmer = Modal.Dimmer

MyModal.DefaultHeader = DefaultHeader
