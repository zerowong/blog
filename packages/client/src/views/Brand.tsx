import classNames from 'classnames'

interface BrandProps {
  className?: string
  size?: 'medium' | 'large'
}

const classMap = {
  medium: 'text-2xl',
  large: 'text-5xl',
}

export function Brand(props: BrandProps) {
  const { className, size = 'medium' } = props

  return (
    <a
      href="/"
      className={classNames(
        'font-bold flex-shrink-0 bg-gradient-to-r bg-clip-text from-green-400 to-blue-500 text-transparent underline decoration-cyan-500',
        classMap[size],
        className
      )}
    >
      ApassEr
    </a>
  )
}
