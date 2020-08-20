import React, { useReducer } from 'react'
import AlertContext from './AlertContext'
import alertReducer from './alertReducer'
import { SHOW_ALERT, HIDE_ALERT } from '../types'

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, { visible: false })

  const show = ({message, type = 'warning'}) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        type,
        message,
      },
    })
  }

  const hide = () => {
    dispatch({
      type: HIDE_ALERT,
    })
  }

  return (
    <AlertContext.Provider value={{ show, hide, alertState: state }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider
