import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  remitosRequest: ['hoja'],
  remitoEstadoRequest: ['body'],
  remitosSuccess: ['payload'],
  remitosFailure: null,
})

export const RemitosTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, payload: null })

// request the data from an api
export const request_estado = (state, action) =>
state.merge({ fetching: true, payload: null })


// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMITOS_REQUEST]: request,
  [Types.REMITOS_SUCCESS]: success,
  [Types.REMITOS_FAILURE]: failure,
  [Types.REMITO_ESTADO_REQUEST]: request_estado,
})
