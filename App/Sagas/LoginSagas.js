import AsyncStorage from "AsyncStorage";
import { call, put } from "redux-saga/effects";
import LoginActions from "../Redux/LoginRedux";
import AlertActions from "../Redux/AlertRedux";

import HojaRutaActions from "../Redux/HojaRutaRedux";
import RemitosActions from "../Redux/RemitosRedux";

import { NavigationActions } from "react-navigation";

export function* check() {
  // Async information
  console.tron.display({ preview: "reading from async" });
  const serAccount = yield AsyncStorage.getItem("account");
  const serPicture = yield AsyncStorage.getItem("picture");
  const account = JSON.parse(serAccount);
  const picture = JSON.parse(serPicture);

  if (picture) {
    // console.tron.log('dispaching')
    yield put(LoginActions.loginPictureSuccess(picture));
  }

  if (account) {
    //TODO evaluate date
    console.tron.log("Already have a login saved");
    yield put(LoginActions.loginSuccess(account));
    yield put(NavigationActions.navigate({ routeName: "HomeScreen" }));
  }
}

export function* logout() {
  console.tron.log("Logout requested");
  AsyncStorage.multiRemove([
    "expire",
    "username",
    "password",
    "account",
    "picture",
    "hojaruta",
    "remitos",
    "active"
  ]);
  //navigate to login indeed
  yield put(NavigationActions.navigate({ routeName: "LoginScreen" }));
  //clean hojas / remitos
  yield put(HojaRutaActions.hojaRutaFailure());
  yield put(RemitosActions.remitosFailure());
}

export function* login(api, action) {
  const { username, password, saveasync } = action;
  // make the call to the api
  const response = yield call(api.postLogin, username, password);
  // console.tron.log({status:'SAGA_LOGINREQUEST', value: response})
  // success?
  if (response.ok && response.data.success) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // Async Storage
    const { data } = response.data;
    // console.tron.log(newProps.logged)
    console.tron.log({
      name: "Saving to async storage saveasync",
      value: saveasync
    });
    if (saveasync) {
      const serializedState = JSON.stringify(data);
      // console.tron.log({ name: "Saving to async storage data ", value:serializedState})
      AsyncStorage.setItem("account", serializedState);
    } else
      AsyncStorage.multiRemove([
        "expire",
        "username",
        "password",
        "account",
        "picture"
      ]);

    //yield put(LoginActions.loginSuccess(response.data.data))
    yield put(LoginActions.loginSuccess(data));
    //TODO
    //remove navigate from saga
    yield put(NavigationActions.navigate({ routeName: "HomeScreen" }));
  } else {
    // network error
    // console.tron.log({status:'SAGA_LOGINFAIL', value: response})
    let { problem } = response;
    if (problem == null) problem = response.data.message;

    yield put(LoginActions.loginFailure());
    yield put(AlertActions.alertError(problem));
  }
}

export function* picture(action) {
  const { picture } = action;
  const serializedState = JSON.stringify(picture);
  console.tron.log({
    name: "Saving picture storage data ",
    value: serializedState
  });
  AsyncStorage.setItem("picture", serializedState);

  yield put(LoginActions.loginPictureSuccess(serializedState));
}
