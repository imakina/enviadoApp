/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

import { NavigationActions } from 'react-navigation'

export function * login (api, action) {
  const { username, password } = action
  // make the call to the api
  const response = yield call(api.postLogin, username, password)
  //console.tron.log({status:'LOGIN_REQUEST',response: response})
  // success?
  if (response.ok && response.data.success) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { car_id, token,car_first_nm,car_last_nm, mail } = response.data.data
    yield put(LoginActions.loginSuccess({car_id, token, car_first_nm, car_last_nm, mail}))
    yield put(NavigationActions.navigate({routeName: 'HomeScreen'}))
  } else {
    // network error
    // console.tron.log({status:'LOGIN_FAIL', response: response}) 
    const { problem } = response
    if (problem == null)
      problem = response.data.message

    yield put(LoginActions.loginFailure( problem ))
  }
}
