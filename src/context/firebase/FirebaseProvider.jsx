import React, { useReducer } from 'react'
import axios from 'axios'
import FirebaseContext from './firebaseContext'
import firebaseReducer from './firebaseReducer'
import {
  SHOW_LOADER,
  REMOVE_NOTE,
  HIDE_LOADER,
  FETCH_NOTES,
  ADD_NOTE,
} from '../types'

const url = process.env.REACT_APP_DB_URL

const FirebaseProvider = ({ children }) => {
  const initialState = {
    loading: false,
    notes: [],
  }
  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const fetchNotes = async () => {
    showLoader()
    const res = await axios.get(`${url}/notes.json`)

    let notes = []

    if (res.data) {
      notes = Object.keys(res.data).map((key) => {
        return {
          name: res.data[key].name,
          date: res.data[key].date,
          id: key,
        }
      })
    }

    dispatch({
      type: FETCH_NOTES,
      payload: notes,
    })
  }

  const addNote = async (name) => {
    const note = {
      name,
      date: new Date().toLocaleString(),
    }

    try {
      const res = await axios.post(`${url}/notes.json`, note)

      dispatch({
        type: ADD_NOTE,
        payload: {
          ...note,
          id: res.data.name,
        },
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const removeNote = async (id) => {
    try {
      await axios.delete(`${url}/notes/${id}.json`)

      dispatch({
        type: REMOVE_NOTE,
        payload: id,
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        removeNote,
        addNote,
        fetchNotes,
        notes: state.notes,
        loading: state.loading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider
