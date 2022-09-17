import {ReactNode} from 'react'

export const LoginLayout = (props: { children: ReactNode }) => {
  const {children} = props
  return (
    <div className="App">
      <div className="container">
        <h2>登录</h2>
        <div className="login">{children}</div>
      </div>
    </div>
  )
}
