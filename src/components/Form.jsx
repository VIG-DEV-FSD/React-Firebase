import React, { useRef, useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'
import FirebaseContext from '../context/firebase/firebaseContext'

const Form = () => {
  const ref = useRef('')
  const { show } = useContext(AlertContext)
  const { addNote } = useContext(FirebaseContext)

  const submitHandler = (event) => {
    event.preventDefault()
    if (ref.current.value.trim()) {
      addNote(ref.current.value.trim()).then(() => {
        show({
          message: 'Заметка успешно добавлена',
          type: 'success',
        })
        ref.current.value = ''
      }).catch(e => {
        show({
          message: 'Что-то пошло не так',
          type: 'danger'
        })
      })
    } else {
      show({
        message: 'Вы не ввели название заметки',
      })
    }
  }

  return (
    <form className="mt-4" onSubmit={submitHandler}>
      <input
        ref={ref}
        type="text"
        className="form-control"
        placeholder="Введите название заметки"
      />
      <button type="submit" className="btn btn-dark mt-3">
        Добавить заметку
      </button>
    </form>
  )
}

export default Form
