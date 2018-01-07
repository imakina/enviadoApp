import { put, select } from 'redux-saga/effects'
import AsyncStorage from 'AsyncStorage';
// import GithubActions from '../Redux/GithubRedux'
import { is } from 'ramda'
// import { AsyncResource } from 'async_hooks';
import LoginActions from '../Redux/LoginRedux'

// exported to make available for tests
// export const selectAvatar = (state) => state.github.avatar

//it is safe to store here
//export const selectToken = (state) => state.login.payload.token

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    // console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
    //
    // // logging an object for better clarity
    // console.tron.log({
    //   message: 'pass objects for better logging',
    //   // someGeneratorFunction: selectAvatar
    // })
    //
    // // fully customized!
    // const subObject = { a: 1, b: [1, 2, 3], c: true }
    // subObject.circularDependency = subObject // osnap!
    // console.tron.display({
    //   name: '🔥 IGNITE 🔥',
    //   preview: 'You should totally expand this',
    //   value: {
    //     '💃': 'Welcome to the future!',
    //     subObject,
    //     someInlineFunction: () => true,
    //     someGeneratorFunction: startup,
    //     // someNormalFunction: selectAvatar
    //   }
    // })
    console.tron.display({preview:'🔥 IGNITE 🔥'})
  


    // const serializedState = await AsyncStorage.getItem('account');
    // if (serializedState !== null) {
    //   const account = JSON.parse(serializedState)
    //   yield put(LoginActions.loginSuccess(account))
    // }
    // return ;

    // AsyncStorage.multiGet(['expire','username','password']).then((data) => {
    //   console.tron.display({preview:data})
    //   if (data[0][1]) {
    //     console.tron.display({name:'AsyncStorage', value:data})
    //   }
    // })

  }

  yield put(LoginActions.loginCheck())

  //const token = yield select(selectToken)
  // 31913 
  // const avatar = yield select(selectAvatar)
  // // only get if we don't have it yet
  // if (!is(String, avatar)) {
  //   yield put(GithubActions.userRequest('GantMan'))
  // }
}
