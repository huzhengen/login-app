import {ReactNode} from 'react'
import {Link} from "react-router-dom";

export const LoginLayout = (props: { children: ReactNode }) => {
  const {children} = props
  return (
    <div className="App">
      <div className="container">
        <h2>登录</h2>
        <div className="login">
          {children}
          <hr/>
          <Link to="/otherWaysToLogin" className="other">其他方式登录</Link>
        </div>
      </div>
    </div>
  )
}
