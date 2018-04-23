import { call, put, select, take, race, all } from "redux-saga/effects";
import SyncActions from "../Redux/SyncRedux";

import HojaRutaActions, { HojaRutaTypes } from "../Redux/HojaRutaRedux";
import RemitosActions, { RemitosTypes } from "../Redux/RemitosRedux";

// const selectAccount = state => state.login.account;
const selectRemitos = state => state.remitos.remitos;
const selectAccount = state => state.login.account;
const selectSyncError = state => state.sync.failure;

// trato a cada uno
function* syncRemitos(item, account, api) {
  if (item.estado_mobile === 7) {
    let data = {
      idRemito: item.idRemito,
      estado: item.estado,
      fechaHora: item.fechaHora,
      latitud: Number(item.latitud),
      longitud: Number(item.longitud),
      car_id: account.car_id,
      firma: ""
    };
    console.tron.log(data);
    const response = yield call(api.postRemitoEstado, account.token, data);
    if (response.ok) {
      //successfully update state
      console.tron.log(response);
      let newItem = Object.assign({}, item);
      newItem.estado_mobile = 90;
      return newItem;
    } else {
      console.tron.log("respnosefailed");
      yield put(SyncActions.syncFailure());
      return item;
    }
  } else return item;
}

export function* sync(api) {
  // update remitos status
  const remitos = yield select(selectRemitos);
  const account = yield select(selectAccount);

  let data = yield all(
    remitos.map(item => call(syncRemitos, item, account, api))
  );
  yield put(RemitosActions.remitosSuccess(data));

  const syncerror = yield select(selectSyncError);
  //
  if (syncerror) {
    // if something failed we cannot ask for new data
    // we do not ask for new ones
    console.tron.log("no se sincronizo, debe reintentar");
    return false;
  }

  // re sync data to the store
  // const account = yield select(selectAccount);
  // console.tron.log({ name: "sync" });
  yield put(HojaRutaActions.hojaRutaRequest());
  // wait to complete
  // while (true) {
  const result = yield take([
    HojaRutaTypes.HOJA_RUTA_SUCCESS,
    HojaRutaTypes.HOJA_RUTA_FAILURE
  ]);
  // console.tron.log({ name: result });
  if (result.hojas) {
    const hojas = result.hojas;
    if (hojas.length == 1)
      yield put(HojaRutaActions.hojaRutaActive(hojas[0].numeroHojaRuta));
    yield put(SyncActions.syncSuccess());
  } else {
    // we dont get the "hojas"
    yield put(SyncActions.syncFailure());
  }
  // }
}
