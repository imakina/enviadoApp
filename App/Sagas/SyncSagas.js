import { call, put, select, take, race } from "redux-saga/effects";
import SyncActions from "../Redux/SyncRedux";

import HojaRutaActions, { HojaRutaTypes } from "../Redux/HojaRutaRedux";
import RemitosActions, { RemitosTypes } from "../Redux/RemitosRedux";

// const selectAccount = state => state.login.account;

export function* sync(api) {
  // update remitos status

  // re sync data to the store
  // const account = yield select(selectAccount);
  // console.tron.log({ name: "sync" });
  yield put(HojaRutaActions.hojaRutaRequest());
  // wait to complete
  while (true) {
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
  }
}
