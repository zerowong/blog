import { useLayoutEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import useStore from '../store'
import classNames from 'classnames'

/**
 * 移动端全局消息提示
 */
export function GlobalMessage() {
  const message = useStore((s) => s.globalMessage)
  const setMessage = useStore((s) => s.setGlobalMessage)
  const id = useRef(-1)

  useLayoutEffect(() => {
    if (message.value && id.current === -1) {
      id.current = setTimeout(() => {
        setMessage('')
        id.current = -1
      }, 3000)
    }
  }, [message.value, setMessage])

  return (
    <div className="fixed inset-0 overflow-hidden flex justify-center items-center pointer-events-none z-[var(--blog-global-zindex)]">
      <Transition
        show={!!message.value}
        unmount={false}
        appear
        enter="transform transition ease-in-out duration-500"
        enterFrom="scale-0 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-0 opacity-0"
      >
        <div
          className={classNames(
            'bg-white shadow-xl h-12 min-w-[3rem] max-w-[20rem] rounded-lg flex justify-center items-center',
            {
              'bg-red-400': message.type === 'error',
            }
          )}
        >
          <span
            className={classNames('max-h-6 overflow-hidden px-2', {
              'text-white': message.type === 'error',
            })}
          >
            {message.value}
          </span>
        </div>
      </Transition>
    </div>
  )
}
