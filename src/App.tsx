import './App.scss'
import {Login} from './components/Login'
import {LoginLayout} from "./layouts/LoginLayout";

export const App = () => {
  return (
    <LoginLayout><Login/></LoginLayout>
  )
}
