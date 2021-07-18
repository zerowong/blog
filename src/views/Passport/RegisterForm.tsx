import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import useCaptcha from 'src/hooks/useCaptcha'
import useInputChangeHandler from 'src/hooks/useInputChangeHandler'
import useUser from 'src/hooks/useUser'
import Service from 'src/utils/services'

interface RegisterFormProps {
  closeModal: () => void
}

/**
 * 注册表单
 */
export default function RegisterForm(props: RegisterFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [emailError, setEmailError] = useState<false | string>(false)
  const [passwordError, setPasswordError] = useState<false | string>(false)
  const [usernameError, setUsernameError] = useState<false | string>(false)

  const [loading, setLoading] = useState(false)

  const user = useUser()

  const captcha = useCaptcha(async (res) => {
    if (res.ret === 0) {
      setLoading(true)
      try {
        const registerRes = await Service.userRegister({
          Ticket: res.ticket,
          Randstr: res.randstr,
          mail: email,
          pass: password,
          name: username,
        })
        await user.dispatch('fetch')
        toast.success(registerRes.message)
        setLoading(false)
        props.closeModal()
      } catch {
        setLoading(false)
      }
    }
  })

  const handleInputChange = useInputChangeHandler({
    email: setEmail,
    password: setPassword,
    username: setUsername,
  })

  const checkEmailValidity = (validity: ValidityState) => {
    if (validity.valueMissing) {
      setEmailError('请输入邮箱')
    } else if (validity.typeMismatch) {
      setEmailError('请输入正确的邮箱格式')
    }
  }

  const checkPasswordValidity = (validity: ValidityState) => {
    if (validity.valueMissing) {
      setPasswordError('请输入密码')
    } else if (validity.patternMismatch) {
      setPasswordError('密码必须为6到20位的大小写字母、数字或特殊符号(<>?,./+=_-~!@#$%^*)的组合')
    }
  }

  const checkUsernameValidity = (validity: ValidityState) => {
    if (validity.valueMissing) {
      setUsernameError('请输入昵称')
    }
  }

  const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    event.preventDefault()
    const validity = event.target.validity
    switch (event.target.name) {
      case 'email':
        checkEmailValidity(validity)
        break
      case 'password':
        checkPasswordValidity(validity)
        break
      case 'username':
        checkUsernameValidity(validity)
        break
      default:
        break
    }
  }

  const handleRegister = () => {
    setEmailError(false)
    setPasswordError(false)
    setUsernameError(false)

    captcha.show()
  }

  return (
    <Form onSubmit={handleRegister}>
      <Form.Field
        id="register-email"
        label="邮箱"
        control="input"
        required
        name="email"
        type="email"
        maxLength={40}
        autoComplete="email"
        onChange={handleInputChange}
        error={emailError}
        onInvalid={handleInvalid}
        onFocus={() => setEmailError(false)}
      />
      <Form.Field
        id="register-username"
        label="昵称"
        control="input"
        required
        name="username"
        type="text"
        maxLength={20}
        onChange={handleInputChange}
        error={usernameError}
        onInvalid={handleInvalid}
        onFocus={() => setUsernameError(false)}
      />
      <Form.Field
        id="register-password"
        label="密码"
        control="input"
        required
        name="password"
        type="password"
        maxLength={20}
        pattern="[\w<>?,./+=_-~!@#$%^*]{6,20}"
        onChange={handleInputChange}
        error={passwordError}
        onInvalid={handleInvalid}
        onFocus={() => setPasswordError(false)}
      />
      <Form.Field>
        {/* Form设置了onSubmit后Button无需设置onClick，否则会导致重复调用，无论处理函数是否相同 */}
        <Button color="teal" fluid loading={loading}>
          注册
        </Button>
      </Form.Field>
    </Form>
  )
}
