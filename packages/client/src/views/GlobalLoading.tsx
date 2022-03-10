import { Transition } from '@headlessui/react'
import useStore from '../store'
import { IconFont } from '../components'

/**
 * 移动端全局加载提示
 */
export function GlobalLoading() {
  const loading = useStore((s) => s.globalLoading)

  return (
    <div
      className="fixed inset-0 overflow-hidden flex justify-center items-center pointer-events-none z-[var(--blog-global-zindex)]"
      role="dialog"
    >
      <Transition
        show={loading}
        unmount={false}
        appear
        enter="transform transition ease-in-out duration-500"
        enterFrom="scale-0 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-0 opacity-0"
      >
        <div className="bg-white shadow-xl h-12 w-12 rounded-lg flex justify-center items-center">
          <IconFont
            name="loading"
            className="animate-spin rounded-full text-violet-500"
          />
        </div>
      </Transition>
    </div>
  )
}
