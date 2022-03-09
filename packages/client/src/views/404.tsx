import { useHistory } from 'react-router-dom'

export function NotFound() {
  const history = useHistory()

  return (
    <div className="absolute top-[40%] w-full text-center">
      <div className="text-5xl font-bold text-red-500 mb-1">404</div>
      <div className="text-2xl font-bold mb-3">Not Found</div>
      <div className="text-sky-500" onClick={() => history.push('/')}>
        回到主页
      </div>
    </div>
  )
}
