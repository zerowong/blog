import { Transition } from '@headlessui/react'

interface ErrorMessageProps {
  show?: boolean
  value?: string
}

export function ErrorMessage(props: ErrorMessageProps) {
  const { show = false, value } = props

  return (
    <div className="h-[1.5rem]">
      <Transition
        show={show}
        unmount={false}
        enter="transform transition duration-1000"
        enterFrom="scale-0 opaticy-0"
        enterTo="scale-100 opaticy-100"
        leave="transform transition duration-1000"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-0 opacity-0"
        className="origin-top-left will-change-transform"
      >
        <span className="text-red-500">{value}</span>
      </Transition>
    </div>
  )
}
