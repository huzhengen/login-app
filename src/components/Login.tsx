import {ChangeEvent, useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Title} from "./Title";
import {Button} from "./Button";
import {Message} from './Message'
import {Input} from "./Input";
import {request} from "../request";
import {debounce} from "lodash";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showUsernameErrorMessage, setShowUsernameErrorMessage] = useState(false)
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false)
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false)
  const [hasVerified, setHasVerified] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const regUsername = /^[A-Za-z0-9]{4,16}$/
  const regPassword =
    /^[A-Za-z0-9(`~!@#$%^&*\(\)_+-=\{\}\[\];\'\\:\"|,./<>?)]{8,32}$/

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setUsername(value)
    verifyUsername(value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setPassword(value)
    verifyPassword(value)
  }

  // 校验 username
  const verifyUsername = (u: string) => {
    if (!regUsername.test(u)) {
      setShowUsernameErrorMessage(true)
      return true
    }
    setShowUsernameErrorMessage(false)
    return false
  }

  // 校验 password
  const verifyPassword = (p: string) => {
    if (!regPassword.test(p)) {
      setShowPasswordErrorMessage(true)
      return true
    }
    setShowPasswordErrorMessage(false)
    return false
  }

  const isHasVerified = useRef(true)
  useEffect(() => {
    if (isHasVerified.current) {
      isHasVerified.current = false
    } else {
      setHasVerified(!showUsernameErrorMessage && !showPasswordErrorMessage)
    }
  }, [password])


  const login = async () => {
    if (verifyUsername(username)) {
      return
    }
    if (verifyPassword(password)) {
      return
    }
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    const res = await request.post('/api/demo/login.php?phase=1', params).catch((error) => {
      setShowLoginErrorMessage(true)
      setErrorMessage(error.message)
      throw error
    })
    if (res.data.status === 0) {
      localStorage.setItem('token', res.data.data.token)
      navigate("/verify");
    } else {
      setShowLoginErrorMessage(true)
      setErrorMessage(res.data.message)
    }
  }

  const debounceLogin = debounce(() => login(), 200)

  return (
    <>
      <Title/>
      <div className="input_wrap username">
        <i></i>
        <Input type="text" placeholder="请输入用户名" onChange={onChangeUsername}
               maxLength={16} isError={showUsernameErrorMessage}/>
      </div>
      {showUsernameErrorMessage && (
        <Message className="input_error_message">用户名只允许包含数字，大小写字母，长度为4~16</Message>
      )}
      <div className="input_wrap password">
        <i></i>
        <Input type="password" placeholder="请输入密码" onChange={onChangePassword}
               maxLength={32} isError={showPasswordErrorMessage}/>
      </div>
      {showPasswordErrorMessage && (
        <Message className="input_error_message">密码只允许包含数字，大小写字母，以及标点符号，长度为8~32</Message>
      )}
      <Button disabled={!hasVerified} onClick={debounceLogin}>下一步</Button>
      {showLoginErrorMessage && (<Message className='login_error_message'>{errorMessage}</Message>)}
      <hr/>
      <Link to="/login" className="other">
        其他方式登录
      </Link>
    </>
  )
}
