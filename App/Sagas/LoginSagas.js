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
import AsyncStorage from 'AsyncStorage';
import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import AlertActions from '../Redux/AlertRedux'

import { NavigationActions } from 'react-navigation'

export function * check () {
    // Async information
    console.tron.display({preview:'reading from async'})
    const serializedState = yield AsyncStorage.getItem('account')
    const account = JSON.parse(serializedState)
    if (account) {
      //TODO evaluate date
      console.tron.log("Already have a login saved")
      yield put(LoginActions.loginSuccess(account))
      yield put(NavigationActions.navigate({routeName: 'HomeScreen'}))
    } 
}

export function * logout () {
  console.tron.log("Logout requested")
  AsyncStorage.multiRemove(['expire','username','password','account'])
  //navigate to login indeed
  yield put(NavigationActions.navigate({routeName: 'LoginScreen'}))
}

export function * login (api, action) {
  const { username, password, saveasync } = action
  // make the call to the api
  const response = yield call(api.postLogin, username, password)
  // console.tron.log({status:'SAGA_LOGINREQUEST', value: response})
  // success?
  if (response.ok && response.data.success) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // Async Storage
    const { data } = response.data
    // console.tron.log(newProps.logged)
    console.tron.log({ name: "Saving to async storage saveasync", value:saveasync})
    if (saveasync) {
      const serializedState = JSON.stringify(data);
      // console.tron.log({ name: "Saving to async storage data ", value:serializedState})
      AsyncStorage.setItem('account', serializedState);
      // AsyncStorage.multiSet([
      //   ['expire', Date.now().toString()],
      //   ['data', serializedState]
      // ])
    } else
      AsyncStorage.multiRemove(['expire','username','password','account'])

    //yield put(LoginActions.loginSuccess(response.data.data))
    yield put(LoginActions.loginSuccess(data))
    //TODO
    //remove navigate from saga
    yield put(NavigationActions.navigate({routeName: 'HomeScreen'}))
  } else {
    // network error
    // console.tron.log({status:'SAGA_LOGINFAIL', value: response}) 
    let { problem } = response
    if (problem == null)
      problem = response.data.message

    yield put(LoginActions.loginFailure())
    yield put(AlertActions.alertError(problem))
  }
}
