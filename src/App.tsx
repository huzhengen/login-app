import './App.scss'
import {Login} from './components/Login'
import {LoginLayout} from "./layouts/LoginLayout";
import {useState} from "react";
import {Code} from "./components/Code";

export const App = () => {
  const [showCodeComponent, setShowCodeComponent] = useState(false)

  return (
    <LoginLayout>{showCodeComponent
      ? <Code/>
      : <Login change={(isShow: boolean) => {
        setShowCodeComponent(isShow)
      }}/>}</LoginLayout>
  )
}
