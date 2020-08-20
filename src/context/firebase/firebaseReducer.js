import {SHOW_LOADER, HIDE_LOADER, FETCH_NOTES, ADD_NOTE, REMOVE_NOTE} from '../types'

const handlers = {
  DEFAULT: state => state,
  [ADD_NOTE]: (state, {payload}) => ({
    ...state,
    notes: [...state.notes, payload]
  }),
  [REMOVE_NOTE]: (state, {payload}) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== payload)
  }),
  [FETCH_NOTES]: (state, {payload}) => ({
    ...state, notes: payload, loading: false
  }),
  [SHOW_LOADER]: state => ({...state, loading: true}),
}

const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}

export default firebaseReducer