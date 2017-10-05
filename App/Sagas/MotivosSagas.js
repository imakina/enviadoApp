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
import MotivosActions from '../Redux/MotivosRedux'

export function * getMotivos (api, action) {
  // const { data } = action
  let token = 'NGtyTmxJaDlDSHNla3BBZTVZTm12RVEybjRoVTZFdlcwYnlBMTJZQi9iMD06MA=='
  // make the call to the api
  const response = yield call(api.getMotivos, token)

  //console.tron.log(response)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { motivos } = response.data
    yield put(MotivosActions.motivosSuccess(motivos))
  } else {
    // todo put the messages in a unified place
    // network error
    const { problem } = response
    if (problem == null)
      problem = response.data.message

    //yield call(Alert.alert, problem)
    yield put(MotivosActions.motivosFailure({fething: false}))
  }
}
