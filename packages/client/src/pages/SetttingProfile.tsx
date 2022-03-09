import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'
import { useFormik } from 'formik'
import { Button, Input } from '@waterui/react'
import { ErrorMessage, Label, Avatar, IconFont } from '../components'
import classNames from 'classnames'
import useStore from '../store'
import { useHistory } from 'react-router-dom'
import { useCos, useGlobalLoading } from '../hooks'
import { PassportService } from '../services'
import { getExt } from '../utils'

interface FormValues {
  name?: string
  avatar?: string
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {}

  if (values.name) {
    if (values.name.length < 1) {
      errors.name = '昵称过短'
    } else if (values.name.length > 15) {
      errors.name = '昵称过长'
    }
  }

  return errors
}

export default function SettingProfile() {
  const user = useStore((s) => s.user)
  const auth = useStore((s) => s.auth)
  const shwoMessage = useStore((s) => s.setGlobalMessage)
  const history = useHistory()
  const [loading, setLoading] = useGlobalLoading()
  const [src, setSrc] = useState(user?.avatar)
  const fileRef = useRef<File>()
  const cos = useCos()

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      return shwoMessage('无用户数据')
    }
    setLoading(true)
    if (fileRef.current instanceof File) {
      const ext = getExt(fileRef.current.name)
      if (!ext) {
        setLoading(false)
        return shwoMessage('无效文件类型')
      }
      const res = await cos
        .putObject(`avatar/${user._id}${ext}`, fileRef.current)
        .catch(() => null)
      if (!res) {
        setLoading(false)
        return shwoMessage('上传头像至服务器失败')
      }
      values.avatar = `https://${res.Location}`
    }
    try {
      await PassportService.updateProfile(values)
      await auth()
      setLoading(false)
      history.goBack()
    } catch (error) {
      setLoading(false)
      shwoMessage('保存失败，请稍后再试')
    }
  }

  const formik = useFormik({
    initialValues: {
      name: user?.name,
    },
    validate,
    onSubmit,
  })

  if (!user) {
    return null
  }

  const nameError = formik.touched.name && !!formik.errors.name

  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files.item(0)
      if (file) {
        fileRef.current = file
        const url = URL.createObjectURL(file)
        setSrc(url)
      }
    }
  }

  return (
    <div>
      <div className="h-[30vh] bg-gradient-to-br from-sky-500 to-fuchsia-500"></div>
      <div className="pl-8 relative">
        <Avatar
          src={src}
          size={100}
          onLoad={(e) => {
            return URL.revokeObjectURL(e.currentTarget.src)
          }}
          containerClassName="-translate-y-1/2"
        />
        <div className="absolute w-[100px] h-[100px] bg-black rounded-full top-0 left-8 opacity-50 flex justify-center items-center -translate-y-1/2">
          <label
            htmlFor="upload-avatar"
            className="z-10 h-1/2 w-1/2 bg-white/30 rounded-full flex justify-center items-center active:bg-white/60"
          >
            <IconFont name="camera" className="text-3xl text-white" />
          </label>
          <input
            id="upload-avatar"
            type="file"
            accept="image/*"
            className="opacity-0 h-0 w-0"
            onChange={uploadImg}
          />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="px-8">
        <div>
          <Label htmlFor="name">昵称</Label>
          <Input
            id="name"
            type="text"
            clearable
            wrapperClassName={classNames('shadow-sm focus-within:bg-gray-100', {
              'border-red-500': nameError,
            })}
            maxLength={30}
            {...formik.getFieldProps('name')}
            onClear={() => formik.setFieldValue('name', '')}
            borderColor={nameError ? 'red' : undefined}
            className="focus:bg-gray-100"
            placeholder="新昵称"
          />
          <ErrorMessage show={nameError} value={formik.errors.name} />
        </div>
        <div>
          <Button block type="submit" disabled={loading}>
            保存
          </Button>
        </div>
      </form>
    </div>
  )
}
