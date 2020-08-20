import React, { useContext, useEffect } from 'react'
import Form from '../components/Form'
import NoteList from '../components/NoteList'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import FirebaseContext from '../context/firebase/firebaseContext'

const HomePage = () => {
  const { notes, loading, fetchNotes } = useContext(FirebaseContext)

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <>
      <Alert />
      <Form />
      <hr />
      {loading ? <Loader /> : <NoteList notes={notes} />}
    </>
  )
}

export default HomePage
