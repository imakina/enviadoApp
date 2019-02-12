import AsyncStorage from "AsyncStorage";
import { call, put, select } from "redux-saga/effects";
import OrdenesActions from "../Redux/OrdenesRedux";
import AlertActions from "../Redux/AlertRedux";
// selector
const selectAccount = state => state.login.account;
// const selectActive = state => state.hojaruta.active;
const selectOrdenes = state => state.ordenes.ordenes;

export function* getOrdenes(api, action) {
  // account logged | hoja
  const account = yield select(selectAccount);

  const response = yield call(api.getOrdenesRetiro, account.car_id);
  if (response.ok) {
    const { data } = response;
    // save async
    store(data);
    // end save async
    yield put(OrdenesActions.ordenesSuccess(data));
  } else {
    // todo put the messages in a unified place
    // network error
    let { problem } = response;
    if (problem == null) problem = response.data.message;

    //yield call(Alert.alert, problem)
    yield put(OrdenesActions.ordenesFailure({ fetching: false }));
  }
}

function store(ordenes) {
  console.tron.display({ preview: "saved ordenes to async" });
  AsyncStorage.setItem("ordenes", JSON.stringify(ordenes));
}

// rehydrate the hojas from the storage
export function* rehydrateRemitos(action) {
  const remitos = yield AsyncStorage.getItem("remitos");
  // console.tron.display({ preview: "remitos", value: remitos });
  if (remitos) yield put(RemitosActions.remitosSuccess(JSON.parse(remitos)));
}

export function* updateOrden(action) {
  const { orden } = action;
  // make the call to the api
  const account = yield select(selectAccount);
  const ordenes = yield select(selectOrdenes);
  //console.log("ordenes",ordenes);
  
  // update the item
  let item = orden;
  item.fletero = account.car_id;
  item.id_orden_retiro_qr=null;
  //
  let data = Object.assign([], ordenes);
  data.push(item);
  // end update the item

  // save async
  store(data);
  // end save async

  // messages
  yield put(OrdenesActions.ordenesSuccess(data));
  yield put(OrdenesActions.ordenLast(orden.codigo_qr));
  // yield put(AlertActions.alertSuccess("Ordenes actualizadas"));
}

// "id_orden_retiro_qr":1,
// "codigo_qr":"12345",
// "fecha_scan":"2019-02-10T00:00:00",
// "latitud":-34.34,
// "longitud":-54.23,
// "fletero":31922
export function* saveOrden(api, action) {

  const account = yield select(selectAccount);
  const ordenes = yield select(selectOrdenes);
  // make the call to the api
  const response = yield call(api.postOrdenRetiro, account.token, ordenes);
  if (response.ok) {
    console.log("ordenes ok = ", response);
    yield put(OrdenesActions.ordenesSuccess([]));
    yield put(AlertActions.alertSuccess("Ordenes actualizadas"));
  } else {
    // todo put the messages in a unified place
    // network error
    let { problem } = response;
    if (problem == null) problem = response.data.message;
    console.log("ordenes failure",response);
    yield put(OrdenesActions.ordenesFailure({ fetching: false }));
  }

}
