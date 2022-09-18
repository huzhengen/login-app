import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import {OtherWaysToLogin} from './OtherWaysToLogin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/otherWaysToLogin" element={<OtherWaysToLogin/>}/>
      <Route
        path="*"
        element={
          <main style={{padding: "1rem"}}>
          <p>There's nothing here!</p>
        </main>
        }
      />
    </Routes>
  </BrowserRouter>
)
