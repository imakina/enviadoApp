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

import { call, put, select } from 'redux-saga/effects'
import RemitosActions from '../Redux/RemitosRedux'

export const login = (state) => state.login.payload

//todo
//remove
//import { Alert } from 'react-native'

export function * getRemitos (api, action) {
  //const { token } = action
  const { token } = yield select(login)
  const { hoja } = action

  console.tron.log({status:'STATE_LOGIN', value: token})

  // make the call to the api
  const response = yield call(api.getRemitos, hoja, token)
  console.tron.log({status:'REMITOS_REQUEST',response: response})

  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { data } = response
    yield put(RemitosActions.remitosSuccess(data))
  } else {
    // todo put the messages in a unified place
    // network error
    const { problem } = response
    if (problem == null)
      problem = response.data.message

    //yield call(Alert.alert, problem)
    yield put(RemitosActions.remitosFailure({fething: false}))
  }
}
