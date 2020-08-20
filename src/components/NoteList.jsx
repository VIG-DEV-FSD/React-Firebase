import React, { useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AlertContext from '../context/alert/AlertContext'
import FirebaseContext from '../context/firebase/firebaseContext'

const NoteList = ({ notes }) => {
  const { show } = useContext(AlertContext)
  const { removeNote } = useContext(FirebaseContext)

  const removeHandler = (id) => {
    removeNote(id).then(
      () => {
        show({
          message: 'Заметка успешно удалена',
          type: 'success',
        })
      },
      () => {
        show({
          message: 'Что-то пошло не так',
          type: 'danger',
        })
      }
    )
  }

  return (
    <>
      {notes.length ? (
        <TransitionGroup component="ul" className="list-group">
          {notes.map((note) => (
            <CSSTransition key={note.id} timeout={500} classNames="note">
              <li className="list-group-item">
                <span>{note.name + ' | ' + note.date}</span>
                <button
                  onClick={() => removeHandler(note.id)}
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                >
                  &times;
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p>Заметок пока нет</p>
      )}
    </>
  )
}

export default NoteList
