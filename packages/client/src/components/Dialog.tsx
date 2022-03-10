import { Fragment, useRef } from 'react'
import type { ReactNode } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { IconFont } from '../components'
import classNames from 'classnames'

interface DialogProps {
  visible: boolean
  onClose: () => void
  width?: number | string
  height?: number | string
  children?: ReactNode
  title?: string
  className?: string
}

/**
 * 对话框
 */
export function Dialog(props: DialogProps) {
  const {
    visible = false,
    children,
    title = '',
    width,
    height,
    className,
    onClose,
  } = props

  const ref = useRef<HTMLDivElement>(null)

  return (
    <Transition show={visible} as={Fragment}>
      <HeadlessDialog className="fixed inset-0 overflow-hidden" onClose={onClose}>
        <div className="min-h-screen flex justify-center items-center">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay className="absolute inset-0 bg-opacity-75 transition backdrop-blur-sm" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={classNames(
                'relative bg-white shadow-xl min-w-[200px] rounded-2xl',
                className
              )}
              style={{ width }}
            >
              <div className="flex justify-between items-center py-4 px-5 border-b cursor-pointer">
                <HeadlessDialog.Title
                  className="text-lg font-bold grow"
                  onClick={() => {
                    if (ref.current) {
                      ref.current.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                >
                  {title}
                </HeadlessDialog.Title>
                <button
                  onClick={onClose}
                  className="btn btn-circle btn-ghost btn-active btn-sm"
                >
                  <IconFont name="close" className="text-2xl" />
                </button>
              </div>
              <div className="overflow-y-scroll" style={{ height }} ref={ref}>
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}
