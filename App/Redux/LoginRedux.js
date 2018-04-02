import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username','password', 'saveasync'],
  loginSuccess: ['payload'],
  loginFailure: ['message'],
  loginOut: null,
  loginCheck: null,
  loginPicture: ['picture'],
  loginPictureSuccess: ['picture'],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  account: null,
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true, payload: null })

// successful api lookup
export const success = (state, data) => {
  console.tron.log("Login succesfull", data)
  const { payload } = data
  return state.merge({ fetching: false, error: null, account : payload })
}

// Something went wrong somewhere.
export const failure = (state) => {
  // console.tron.log(action)
  // const { message } = action
  return state.merge({ fetching: false, error: true, account: null })
}

// Logout cleaning
export const logout = (state) =>
  state.merge({ fetching: false, account : null, picture : null })

// Check async storage for the token
export const check = (state) =>
  state.merge({ account: null })

// Check async storage for the token
export const picture = (state) =>
  state.merge({ fetching: true })

export const pictureSuccess = (state, data) => {
  const { picture } = data
  // console.tron.log("pciture sucess", picture)
  return state.merge({ picture : picture })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_OUT]: logout,
  [Types.LOGIN_CHECK]: check,
  [Types.LOGIN_PICTURE]: picture,
  [Types.LOGIN_PICTURE_SUCCESS]: pictureSuccess,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const getToken = (state) => state.account

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = accountState => accountState.account !== null