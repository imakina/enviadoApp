import AsyncStorage from "AsyncStorage";
import { call, put, select } from "redux-saga/effects";
import RemitosActions from "../Redux/RemitosRedux";
import AlertActions from "../Redux/AlertRedux";
// selector
const selectAccount = state => state.login.account;
const selectActive = state => state.hojaruta.active;
// export const login = (state) => state.login.payload
// const token = 'NGtyTmxJaDlDSHNla3BBZTVZTm12RVEybjRoVTZFdlcwYnlBMTJZQi9iMD06MA=='

export function* getRemitos(api, action) {
  // account logged | hoja
  const account = yield select(selectAccount);
  const hojaruta = yield select(selectActive);
  //
  // const { hoja, todos } = action
  // make the call to the api
  // let response = {}
  // let todos = true
  // let fnn = (todos) ? api.getRemitosTodos : api.getRemitos
  // if (todos)
  // response = yield call(api.getRemitosTodos, hojaruta, account.token)
  // else
  // response = yield call(api.getRemitos, hojaruta, account.token)
  console.tron.display({ preview: hojaruta });

  const response = yield call(api.getRemitos, hojaruta, account.token, "t");
  if (response.ok) {
    const { data } = response;
    // save async
    console.tron.display({ preview: "saved remitos to async" });
    AsyncStorage.setItem("remitos", JSON.stringify(data));
    // end save async
    yield put(RemitosActions.remitosSuccess(data));
  } else {
    // todo put the messages in a unified place
    // network error
    let { problem } = response;
    if (problem == null) problem = response.data.message;

    //yield call(Alert.alert, problem)
    yield put(RemitosActions.remitosFailure({ fetching: false }));
  }
}

// export function* syncRemitos(action) {

//   const hojas = (state) => state.hojaruta.payload
//   const quantity_hojas = hojas.count

//   // just the case when has only one hojaruta
//   if (quantity_hojas == 1) {
//     let hoja = hojas[0].numeroHojaRuta
//     yield put(RemitosActions.remitosRequest(hoja, 0))
//   }
//   else
//     yield put(RemitosActions.remitosNotSynced())

// }

export function* postRemito(api, action) {
  const { body } = action;
  // make the call to the api
  const response = yield call(api.postRemitoEstado, token, body);
  if (response.ok) {
    yield put(RemitosActions.remitoUpdateSuccess());
    yield put(AlertActions.alertSuccess("Remito actualizado"));
  } else {
    // todo put the messages in a unified place
    // network error
    let { problem } = response;
    if (problem == null) problem = response.data.message;

    yield put(RemitosActions.remitosFailure({ fetching: false }));
  }
}
