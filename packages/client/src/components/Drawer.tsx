import { Fragment, forwardRef } from 'react'
import type { ReactNode, ForwardedRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IconFont } from '../components'
import classNames from 'classnames'

interface DrawerProps {
  visible: boolean
  onClose: () => void
  placement?: 'top' | 'right' | 'bottom' | 'left'
  width?: number | string
  height?: number | string
  children?: ReactNode
  title?: string
  className?: string
  containerClassName?: string
}

const classMap = {
  top: {
    placement: 'top-0 inset-x-0',
    translate: {
      start: '-translate-y-full',
      end: 'translate-y-0',
    },
    content: 'w-full',
  },
  right: {
    placement: 'right-0 inset-y-0',
    translate: {
      start: 'translate-x-full',
      end: 'translate-x-0',
    },
    content: 'h-full',
  },
  bottom: {
    placement: 'bottom-0 inset-x-0',
    translate: {
      start: 'translate-y-full',
      end: 'translate-y-0',
    },
    content: 'w-full',
  },
  left: {
    placement: 'left-0 inset-y-0',
    translate: {
      start: '-translate-x-full',
      end: 'translate-x-0',
    },
    content: 'h-full',
  },
}

function _Drawer(props: DrawerProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    visible = false,
    onClose,
    placement = 'left',
    width,
    height,
    title,
    children,
    className,
    containerClassName,
  } = props

  const _class = classMap[placement]

  let _width
  let _height
  if (placement === 'left' || placement === 'right') {
    _width = width ?? 200
  } else if (placement === 'top' || placement === 'bottom') {
    _height = height ?? 200
  }

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        className="fixed inset-0 overflow-hidden z-[var(--blog-drawer-zindex)]"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="absolute inset-0 bg-opacity-75 transition backdrop-blur-sm" />
        </Transition.Child>
        <div className={classNames('fixed', _class.placement)}>
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom={_class.translate.start}
            enterTo={_class.translate.end}
            leave="transform transition ease-in-out duration-500"
            leaveFrom={_class.translate.end}
            leaveTo={_class.translate.start}
          >
            <div
              className={classNames(
                'relative bg-white shadow-xl',
                _class.content,
                containerClassName
              )}
              style={{ height: _height, width: _width }}
            >
              <div className="flex justify-between items-center py-4 px-5 border-b">
                <Dialog.Title className="text-lg font-bold">
                  {title}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="btn btn-circle btn-ghost btn-active btn-sm"
                >
                  <IconFont name="close" className="text-2x" />
                </button>
              </div>
              <div
                className={classNames(
                  'relative overflow-y-scroll h-[calc(100%-60px)]',
                  className
                )}
                ref={ref}
              >
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export const Drawer = forwardRef(_Drawer)
