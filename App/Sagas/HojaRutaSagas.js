import AsyncStorage from "AsyncStorage";
import { call, put, select } from "redux-saga/effects";
// actions
import HojaRutaActions from "../Redux/HojaRutaRedux";
// import RemitosActions from "../Redux/RemitosRedux";
// account
const selectAccount = state => state.login.account;

export function* getHojaRuta(api, action) {
  const account = yield select(selectAccount);
  // the state is still 0 but will be changed to a value parametrized
  const response = yield call(api.getHojaRuta, account.car_id, 0);
  // success?
  if (response.ok) {
    // allways save ?
    // save hoja ruta async
    // let hojas = response.data.map(item => {
    //   item.active = false;
    //   item.sync = false;
    //   return item;
    // });
    // console.tron.display({ preview: 'saving hojaruta from async' })
    AsyncStorage.setItem("hojaruta", JSON.stringify(response.data));
    // end save async
    yield put(HojaRutaActions.hojaRutaSuccess(response.data));
  } else {
    yield put(HojaRutaActions.hojaRutaFailure());
  }
}
// rehydrate the hojas from the storage
export function* rehydrateHojaRuta(action) {
  const hojas = yield AsyncStorage.getItem("hojaruta");
  // console.tron.log("rehydratehojas");
  yield put(HojaRutaActions.hojaRutaSuccess(JSON.parse(hojas)));
}

// check if there is someone active
export function* rehydrateHojaRutaActive(action) {
  const active = yield AsyncStorage.getItem("active");
  // console.tron.log({ preview: "rehydratehojaActive", value: active });
  if (active) yield put(HojaRutaActions.hojaRutaActivated(JSON.parse(active)));
}
// save to storage the active hoja
// change the state
export function* activeHojaRuta({ active }) {
  // console.tron.log({ preview: "ActiveHoja", value: active });
  yield AsyncStorage.setItem("active", JSON.stringify(active));
  yield put(HojaRutaActions.hojaRutaActivated(active));
}
