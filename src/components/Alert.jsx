import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import AlertContext from '../context/alert/AlertContext'

const Alert = () => {
  const { alertState, hide } = useContext(AlertContext)

  return (
    <CSSTransition
      in={alertState.visible}
      timeout={350}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={`alert alert-${
          alertState.type || 'warning'
        } alert-dismissible`}
      >
        <strong>Внимание! </strong> {alertState.message}
        <button
          onClick={() => hide()}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </CSSTransition>
  )
}

export default Alert
