import AsyncStorage from "AsyncStorage";
import { call, put, select } from "redux-saga/effects";
import PackagesActions from "../Redux/PackagesRedux";
import AlertActions from "../Redux/AlertRedux";
// selector
const selectAccount = state => state.login.account;
const selectLogin = state => state.login;
const selectActive = state => state.ordenretiro.active;
const selectPackages = state => state.packages.packages;
const selectLocation = state => state.location;

export function * resetPackages(action) {
  // yield put(PackagesActions.packagesReset());
}

export function* getPackages(api, action) {
  // account logged | hoja
  const ordenretiro = yield select(selectActive);

  const login = yield select(selectLogin);
  const callApi = login.deposito?api.getPackagesQR:api.getRemitosQR;

  const response = yield call(callApi, ordenretiro);
  // console.log("packagesaga",response);

  if (response.ok) {
    const { data } = response;
    // save async
    // store(data);
    // end save async
    console.log("legacy",data);
    yield put(PackagesActions.packagesSuccessLegacy(data));

  } else {
    // todo put the messages in a unified place
    // network error
    let { problem } = response;
    if (problem == null) problem = response.data.message;

    yield put(PackagesActions.packagesFailure({ fetching: false }));
  }
}

function store(packages) {
  // console.tron.display({ preview: "saved packages to async" });
  console.log("packages",packages);
  AsyncStorage.setItem("packages", JSON.stringify(packages));
}

// rehydrate the hojas from the storage
export function* rehydrateRemitos(action) {
  const pacakges = yield AsyncStorage.getItem("packages");
  // console.tron.display({ preview: "packages", value: packages });
  if (packages) yield put(PackagesActions.packagesSuccess(JSON.parse(pacakges)));
}

export function* updatePackage(api, action) {
  const packageqr = action.package;
  const deposito = action.deposito;
  // const scan = action.scan;
  // const signature = aciton.signature;
  // make the call to the api
  const login = yield select(selectLogin);
  const packages = yield select(selectPackages);
  // const ordenretiro = yield select(selectActive);
  const ordenretiro = 0;
  const location = yield select(selectLocation);
  
  // update the item

  // let item = packageqr;
  // item.fletero = account.car_id;
  // item.id_orden_retiro_qr = null;
  let item = {
    codigoqr : packageqr,
    car_id : login.account.car_id,
    orden_retiro : ordenretiro,
    latitud : location.latitude,
    longitud : location.longitude,
    id_orden_retiro_qr : deposito,
    // scan: scan,
    // signature : signature
  }
  
  let data = Object.assign([], packages);
  data.push(item);
  // end update the item

  // save async
  store(data);
  // end save async

  // messages
  yield put(PackagesActions.packagesSuccess(data));
  yield put(PackagesActions.packageLast(packageqr));
}

// "id_orden_retiro_qr":1,
// "codigo_qr":"12345",
// "fecha_scan":"2019-02-10T00:00:00",
// "latitud":-34.34,
// "longitud":-54.23,
// "fletero":31922
export function* savePackage(api, action) {

  const account = yield select(selectAccount);
  const packages = yield select(selectPackages);
  // make the call to the api

  const login = yield select(selectLogin);
  const callApi = login.deposito?api.postOrdenRetiroCerrar:api.postOrdenRetiro;

  const response = yield call(callApi, account.token, packages);
  if (response.ok) {
    console.log("save packages ok = ", response);
    yield put(PackagesActions.packagesSuccess([]));
    yield put(AlertActions.alertSuccess("Paquetes actualizadas"));
  } else {
    // todo put the messages in a unified place
    // network error
    let { problem } = response;
    if (problem == null) problem = response.data.message;
    console.log("save packages failure",response);
    
    // yield put(AlertActions.alertSuccess(response.data));
    yield put(PackagesActions.packagesFailure({ fetching: false }));
  }

}
