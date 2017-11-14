import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  alertError: ['message'],
  alertSuccess: ['message'],
  alertClear: null
})

export const AlertTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  // fetching: null,
  // payload: null,
  // error: null,
  type : '',
  message: '',
  show : false
})

/* ------------- Reducers ------------- */

// error message
export const error = (state, action) =>
  state.merge({ type: 'alert-danger', message : action.message , show : true })

// sucess message
export const success = (state, action) =>
state.merge({ type: 'alert-success', message : action.message, show : true  })

// Something went wrong somewhere.
export const clear = state =>
  state.merge({ type : '', message : '', show : false})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALERT_ERROR]: error,
  [Types.ALERT_SUCCESS]: success,
  [Types.ALERT_CLEAR]: clear
})
