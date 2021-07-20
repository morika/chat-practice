import React, {useState} from 'react'
import AppContext from './app-context'

const AppState = ({children}) => {
  const [jwt, setJwt] = useState('')

  return (
    <AppContext.Provider
      value={{
        jwt: jwt,
        setJwt: setJwt,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppState