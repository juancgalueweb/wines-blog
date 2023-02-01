import { createContext, useState } from 'react'

export const LoginContext = createContext()

export const LoginProvider = props => {
  const [isLogin, setIsLogin] = useState()

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {props.children}
    </LoginContext.Provider>
  )
}
