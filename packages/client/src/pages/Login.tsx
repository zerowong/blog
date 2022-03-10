import { Brand } from '../views'
import { useFormik } from 'formik'
import { Button } from '@waterui/react'
import { ErrorMessage, Label, Input } from '../components'
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
    <div className="h-[calc(100vh-48px)] flex items-center justify-center">
      <div className="w-full px-12 lg:px-24">
        <Brand
          className="text-center block mb-16 lg:mb-0 lg:text-7xl lg:absolute lg:top-[20vh] lg:left-[calc(50%-137px)]"
          size="large"
        />
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Label htmlFor="name" block className="text-slate-500">
              昵称
            </Label>
            <Input
              id="name"
              type="text"
              maxLength={30}
              {...formik.getFieldProps('name')}
              className="w-full"
            />
            <ErrorMessage show={nameError} value={formik.errors.name} />
          </div>
          <div>
            <Label htmlFor="pass" block className="text-slate-500">
              密码
            </Label>
            <Input
              id="pass"
              type="password"
              maxLength={30}
              {...formik.getFieldProps('pass')}
              className="w-full"
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
    </div>
  )
}
