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

//todo
//remove
import { Alert } from 'react-native'

export function * login (api, action) {
  const { username, password } = action
  // make the call to the api
  // console.tron.log({d:'login_request',a:api, ac:action})
  const response = yield call(api.postLogin, username, password)
  // console.tron.log({status:'LOGIN_REQUEST',response: response})
  // success?
  if (response.ok && response.data.success) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { userName, token, grupoID } = response.data.data
    yield put(LoginActions.loginSuccess({userName, token, grupoID}))
    yield put(NavigationActions.navigate({routeName: 'RemitosListScreen'}))
  } else {
    // todo put the messages in a unified place
    // network error
    console.tron.log({status:'LOGIN_FAIL', response: response})
    const { problem } = response
    if (problem == null)
      problem = response.data.message

    yield call(Alert.alert, problem)
    yield put(LoginActions.loginFailure({fething: false}))
  }
}


// attempts to login
// export function * loginOld ({ username, password }) {
//
//   if (password === '') {
//     // dispatch failure
//     yield put(LoginActions.loginFailure('WRONG'))
//   } else {
//     let api = DebugConfig.useFixtures ? FixtureAPI : Api.create()
//     let responseLogin = yield call(api.postLogin, username, password)
//
//     console.tron.log({status:'LOGIN_REQUEST', data: responseLogin})
//
//     switch (responseLogin.data.success) {
//       case true:
//         console.tron.log({status:'SUCCESS_LOGIN',message: responseLogin})
//         // dispatch successful logins
//         yield put(LoginActions.loginSuccess(responseLogin.data.data.userName,responseLogin.data.data.token))
//         //todo agregar el token al store
//         yield put(NavigationActions.navigate({ routeName: 'RoutesScreen' }))
//         break
//       default:
//         console.tron.log({status:'ERROR_LOGIN',message: responseLogin})
//         yield call(Alert.alert, responseLogin.data.message)
//         yield put(LoginActions.loginFailure('WRONG'))
//         break
//     }
//
//   }
// }
