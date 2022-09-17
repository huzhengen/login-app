import {ChangeEvent, useState} from 'react'
import {Title} from './Title'
import {Button} from "./Button";
import {Message} from "./Message";
import {Input} from "./Input";
import {request} from "../request";
import {debounce} from "lodash";

export const Code = () => {
  const [code, setCode] = useState('')
  const [showVerifyErrorMessage, setShowVerifyErrorMessage] = useState(false)
  const [showCodeErrorMessage, setShowCodeErrorMessage] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const regCode = /^[0-9]{6}$/

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setCode(value)
    verifyCode(value)
  }

  const verifyCode = (value: string) => {
    if (regCode.test(value)) {
      setShowCodeErrorMessage(false)
      setButtonDisabled(false)
      return false
    } else {
      setShowCodeErrorMessage(true)
      setButtonDisabled(true)
      return true
    }
  }

  const submit = async () => {
    if (verifyCode(code)) {
      return
    }

    const params = new URLSearchParams()
    params.append('tfa', code)

    const res = await request.post('/api/demo/login.php?phase=2', params).catch((error) => {
      setErrorMessage(error.message)
      setShowVerifyErrorMessage(true)
      throw error
    })
    if (res.data.status === 0) {
      window.location.href = 'https://www.lizhi.io'
    } else {
      setErrorMessage(res.data.message)
      setShowVerifyErrorMessage(true)
    }
  }

  const debounceSubmit = debounce(() => submit(), 200)

  return (
    <>
      <Title/>
      <span className="avatar"></span>
      <div className="input_wrap password">
        <i></i>
        <Input type="text" placeholder="请输入你的两步认证验证码" onChange={onChangeCode}
               maxLength={6} isError={showCodeErrorMessage}/>
      </div>
      {showCodeErrorMessage && (
        <Message className="input_error_message">验证码只允许包含数字，长度为6</Message>
      )}
      <Button disabled={buttonDisabled} onClick={debounceSubmit}>确定</Button>
      {showVerifyErrorMessage && (
        <Message className="login_error_message">{errorMessage}</Message>
      )}
    </>
  )
}
