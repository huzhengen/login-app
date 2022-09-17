import {CSSProperties} from 'React'
import {Link} from 'react-router-dom'

export const OtherWaysToLogin = () => {
  const styles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '50px',
    flexDirection: 'column',
  }

  return (
    <div style={styles}>
      <h3>其他方式登录</h3>
      <Link to="/" className="other">
        返回登录
      </Link>
    </div>
  )
}
