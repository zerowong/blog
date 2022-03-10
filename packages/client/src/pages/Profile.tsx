import useStore from '../store'
import { useHistory } from 'react-router-dom'
import { Avatar, IconFont } from '../components'
import { Button } from '@waterui/react'
import { Pages } from '../utils/config'

function getDateDesc(dateStr: string) {
  const date = new Date(dateStr)
  const y = date.getFullYear()
  const m = date.getMonth()
  return `${y}年${m}月 加入`
}

export default function Profile() {
  const user = useStore((s) => s.user)
  const history = useHistory()

  if (!user) {
    return null
  }

  return (
    <div>
      <div className="h-[250px] bg-gradient-to-br from-sky-500 to-fuchsia-500">
        <Button
          className="absolute right-2 top-[240px]"
          onClick={() => {
            return history.push(Pages.settingProfile)
          }}
        >
          编辑资料
        </Button>
      </div>
      <div className="flex px-8 gap-x-10">
        <Avatar src={user.avatar} size={100} containerClassName="-translate-y-1/2" />
        <div className="font-bold text-xl">{user.name}</div>
      </div>
      <div className="px-8">
        <div className="flex items-center gap-x-1">
          <IconFont name="calendar" className="text-2xl text-gray-500" />
          <span className="text-gray-500">{getDateDesc(user.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
