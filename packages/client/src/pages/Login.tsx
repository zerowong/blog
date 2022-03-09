import { Brand } from '../views'
import { useFormik } from 'formik'
import { Button, Input } from '@waterui/react'
import { ErrorMessage, Label } from '../components'
import classNames from 'classnames'
import { PassportService } from '../services'
import useStore from '../store'
import { useHistory } from 'react-router-dom'
import { useGlobalLoading } from '../hooks'

interface FormValues {
  name: string
  pass: string
}

const initialValues: FormValues = {
  name: '',
  pass: '',
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {}

  if (!values.name) {
    errors.name = '昵称不能为空'
  }
  if (!values.pass) {
    errors.pass = '密码不能为空'
  }

  return errors
}

export default function Login() {
  const auth = useStore((state) => state.auth)
  const history = useHistory()

  const [loading, setLoading] = useGlobalLoading()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      await PassportService.login(values)
      await auth()
      setLoading(false)
      return history.push('/')
    } catch {
      setLoading(false)
    }
  }

  const formik = useFormik({ initialValues, validate, onSubmit })

  const nameError = formik.touched.name && !!formik.errors.name
  const passError = formik.touched.pass && !!formik.errors.pass

  return (
    <div className="w-[70vw] mx-auto py-[20vh]">
      <Brand className="text-center block mb-20" size="large" />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Label htmlFor="name" requiredMark>
            昵称
          </Label>
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
          />
          <ErrorMessage show={nameError} value={formik.errors.name} />
        </div>
        <div>
          <Label htmlFor="pass" requiredMark>
            密码
          </Label>
          <Input
            id="pass"
            type="password"
            wrapperClassName={classNames('shadow-sm focus-within:bg-gray-100', {
              'border-red-500': passError,
            })}
            maxLength={30}
            {...formik.getFieldProps('pass')}
            borderColor={passError ? 'red' : undefined}
            className="focus:bg-gray-100"
          />
          <ErrorMessage show={passError} value={formik.errors.pass} />
        </div>
        <div>
          <Button block type="submit" disabled={loading}>
            登录
          </Button>
        </div>
      </form>
    </div>
  )
}
