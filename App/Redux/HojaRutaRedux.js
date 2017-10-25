import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hojaRutaRequest: ['car_id','estado'],
  hojaRutaSuccess: ['payload'],
  hojaRutaFailure: null,
  hojaRutaSelected: ['hojaruta']
})

export const HojaRutaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  selected: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { car_id, estado }) =>
  state.merge({ fetching: true, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
state.merge({ fetching: false, error: true, payload: null })

// select a hoja ruta
export const selected = (state, action) =>
state.merge({ fetching: false, error: false, selected: action.hojaruta })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HOJA_RUTA_REQUEST]: request,
  [Types.HOJA_RUTA_SUCCESS]: success,
  [Types.HOJA_RUTA_FAILURE]: failure,
  [Types.HOJA_RUTA_SELECTED]: selected
})
