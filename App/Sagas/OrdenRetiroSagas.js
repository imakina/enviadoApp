import AsyncStorage from "AsyncStorage";
import { call, put, select } from "redux-saga/effects";
// actions
import OrdenRetiroActions from "../Redux/OrdenRetiroRedux";
import PackagesActions from "../Redux/PackagesRedux";
// account
const selectAccount = state => state.login.account;

export function* getOrdenRetiro(api, action) {
  const account = yield select(selectAccount);
  // the state is still 0 but will be changed to a value parametrized
  const response = yield call(api.getOrdenRetiro, account.car_id);
  // success?
  if (response.ok) {
    // save async
    store(response.data);
    // end save async
    yield put(OrdenRetiroActions.ordenRetiroSuccess(response.data));
  } else {
    yield put(OrdenRetiroActions.ordenRetiroFailure());
  }
}

function store(ordenretiro) {
  console.tron.display({ preview: "saved ordenretiro to async" });
  console.log("ordenretiro store",ordenretiro);
  AsyncStorage.setItem("ordenretiro", JSON.stringify(ordenretiro));
}

// rehydrate the hojas from the storage
export function* rehydrateordenRetiro(action) {
  const hojas = yield AsyncStorage.getItem("ordenretiro");
  // console.tron.log("rehydratehojas");
  if (hojas) yield put(OrdenRetiroActions.ordenRetiroSuccess(JSON.parse(hojas)));
}

// check if there is someone active
export function* rehydrateordenRetiroActive(action) {
  const active = yield AsyncStorage.getItem("ordenretiro_active");
  // console.tron.log({ preview: "rehydratehojaActive", value: active });
  if (active) yield put(OrdenRetiroActions.ordenRetiroActivated(JSON.parse(active)));
}

// save to storage the active hoja
// change the state
export function* activeOrdenRetiro({ active }) {
  // console.tron.log({ preview: "ActiveHoja", value: active });
  // console.log({ preview: "ActiveOrden", value: active });
  // get remitos
  yield put(OrdenRetiroActions.ordenRetiroActivated(active));
  yield put(PackagesActions.packagesRequest());
  yield AsyncStorage.setItem("ordenretiro_active", JSON.stringify(active));
}
