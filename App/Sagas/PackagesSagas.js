import AsyncStorage from "AsyncStorage";
import { call, put, select } from "redux-saga/effects";
import PackagesActions from "../Redux/PackagesRedux";
import AlertActions from "../Redux/AlertRedux";
// selector
// const selectAccount = state => state.login.account;
const selectActive = state => state.ordenretiro.active;
// const selectPackages = state => state.packages.packages;

export function* getPackages(api, action) {
  // account logged | hoja
  const ordenretiro = yield select(selectActive);

  const response = yield call(api.getPackages, ordenretiro);
  console.log(response);
  if (response.ok) {
    const { data } = response;
    // save async
    store(data);
    // end save async
    yield put(PackagesActions.packagesSuccess(data));
  } else {
    // todo put the messages in a unified place
    // network error
    let { problem } = response;
    if (problem == null) problem = response.data.message;

    //yield call(Alert.alert, problem)
    yield put(PackagesActions.packagesFailure({ fetching: false }));
  }
}

function store(packages) {
  // console.tron.display({ preview: "saved packages to async" });
  // console.log("packages",packages);
  AsyncStorage.setItem("packages", JSON.stringify(packages));
}

// rehydrate the hojas from the storage
export function* rehydrateRemitos(action) {
  const remitos = yield AsyncStorage.getItem("packages");
  // console.tron.display({ preview: "packages", value: packages });
  if (packages) yield put(PackagesActions.packagesSuccess(JSON.parse(pacakges)));
}

export function* updatePackage(action) {
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
  yield put(PackagesActions.packagesSuccess(data));
  yield put(PackagesActions.packageLast(orden.codigo_qr));
  // yield put(AlertActions.alertSuccess("Ordenes actualizadas"));
}

// "id_orden_retiro_qr":1,
// "codigo_qr":"12345",
// "fecha_scan":"2019-02-10T00:00:00",
// "latitud":-34.34,
// "longitud":-54.23,
// "fletero":31922
export function* savePackage(api, action) {

  const account = yield select(selectAccount);
  const ordenes = yield select(selectOrdenes);
  // make the call to the api
  const response = yield call(api.postOrdenRetiro, account.token, ordenes);
  if (response.ok) {
    console.log("ordenes ok = ", response);
    yield put(PackagesActions.ordenesSuccess([]));
    yield put(AlertActions.alertSuccess("Ordenes actualizadas"));
  } else {
    // todo put the messages in a unified place
    // network error
    let { problem } = response;
    if (problem == null) problem = response.data.message;
    console.log("ordenes failure",response);
    yield put(PackagesActions.ordenesFailure({ fetching: false }));
  }

}
