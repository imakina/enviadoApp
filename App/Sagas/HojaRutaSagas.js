import AsyncStorage from "AsyncStorage";
import { call, put, select } from "redux-saga/effects";
// actions
import HojaRutaActions from "../Redux/HojaRutaRedux";
import RemitosActions from "../Redux/RemitosRedux";
// account
const selectAccount = state => state.login.account;
const isDeposito = state => state.login.deposito;

export function* getHojaRuta(api, action) {
  const account = yield select(selectAccount);
  const deposito = yield select(isDeposito);
  console.tron.log("deposito",deposito)
  // the state is still 0 but will be changed to a value parametrized
  // const response = yield call(api.getHojaRuta, account.car_id, 0);
  // TODO quitar constante
  const car_id = (deposito ? 0 : account.car_id);
  const response = yield call(api.getHojaRuta, car_id, 0);
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
    // AsyncStorage.setItem("hojaruta", JSON.stringify(response.data));
    store(response.data);
    // end save async
    yield put(HojaRutaActions.hojaRutaSuccess(response.data));
  } else {
    yield put(HojaRutaActions.hojaRutaFailure());
  }
}

function store(hojaruta) {
  console.tron.display({ preview: "saved hojaruta to async" });
  AsyncStorage.setItem("hojaruta", JSON.stringify(hojaruta));
}

// rehydrate the hojas from the storage
export function* rehydrateHojaRuta(action) {
  const hojas = yield AsyncStorage.getItem("hojaruta");
  // console.tron.log("rehydratehojas");
  if (hojas) yield put(HojaRutaActions.hojaRutaSuccess(JSON.parse(hojas)));
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
  // get remitos
  yield put(HojaRutaActions.hojaRutaActivated(active));
  yield put(RemitosActions.remitosRequest());
  yield AsyncStorage.setItem("active", JSON.stringify(active));
}
