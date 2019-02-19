import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  packagesRequest : ["package","todos"],
  packageLast : ["last"],
  packageSave: null,
  packageUpdate: ["package"],
  packagesSuccess: ["packages"],
  packagesFailure: null,
});

export const PackagesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  fetching: null,
  // payload: null,
  error: null,
  message: "",
  last_package: "",
  packages: [],
  // states to reduce the calculations
  // in diferent screens
  // quantity: 0,
  // updated: 0
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, packages: [] });

export const save = (state, action) =>
  state.merge({ fetching: false });

export const last = (state, action) => {
  const {last} = action;
  console.log(last);
  return state.merge({ fetching: false, last_package: last });
}

// rehydrate the data from an asyncstorage
export const rehydrate = (state, action) =>
  state.merge({ fetching: true, packages: null });

// request the data from an api
export const update = (state, action) =>
  state.merge({ fetching: true, payload: null });

// successful api lookup
export const success = (state, action) => {
  const { packages } = action;
  // const updated = remitos.filter(item => item.estado_mobile == 7).length;
  // console.tron.display("remito sucess", remitos);
  // console.log(action);
  return state.merge({
    fetching: false,
    error: null,
    packages: packages,
    // remitos: remitos,
    // updated: updated,
    // quantity: remitos.length
  });
};

// request the data from an api
export const update_success = (state, action) => {
  // console.tron.log("updateSucessRedux");
  return state.merge({ fetching: false, error: null });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({
    fetching: false,
    error: true,
    packages: null,
    package: null,
    quantity: null,
    updated: null
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PACKAGES_REQUEST]: request,
  [Types.PACKAGE_SAVE]: save,
  [Types.PACKAGES_SUCCESS]: success,
  [Types.PACKAGES_FAILURE]: failure,
  [Types.PACKAGE_UPDATE]: update,
  [Types.PACKAGE_LAST]: last,
  // [Types.ORDEN_UPDATE_SUCCESS]: update_success,
  // [Types.ORDEN_SELECTED]: selected,
  // [Types.ORDENES_REHYDRATE]: rehydrate
});
