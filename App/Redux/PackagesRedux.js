import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
// import console = require("console");

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  packagesRequest : ["package","todos"],
  packageLast : ["last"],
  packageSave: null,
  packageUpdate: ["package", "deposito"],
  packagesSuccess: ["packages"],
  packagesSuccessLegacy: ["packages"],
  packagesFailure: null,
  packagesReset: null,
});

export const PackagesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  last_package: "",
  packages: [],
  legacy: []
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, packages: [], legacy: [] });

export const save = (state, action) =>
  state.merge({ fetching: true });

export const last = (state, action) => {
  const {last} = action;
  return state.merge({ fetching: false, last_package: last });
}

export const reset = (state) => {
  console.log("reset");
  return state.merge({ packages: [], legacy : [] })
};

// rehydrate the data from an asyncstorage
export const rehydrate = (state, action) =>
  state.merge({ fetching: true, packages: null });

// request the data from an api
export const update = (state, action) =>
  state.merge({ fetching: true, payload: null });

// request the data from an api
export const success_legacy = (state, { packages }) =>
  state.merge({ fetching : false, legacy: packages });

// successful api lookup
export const success = (state, action) => {
  const { packages } = action;
  return state.merge({ fetching: false, packages: packages});
};

// request the data from an api
export const update_success = (state, action) => {
  // console.tron.log("updateSucessRedux");
  return state.merge({ fetching: false });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({
    fetching: false,
    packages: [],
    package: null,
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PACKAGES_REQUEST]: request,
  [Types.PACKAGE_SAVE]: save,
  [Types.PACKAGES_SUCCESS]: success,
  [Types.PACKAGES_SUCCESS_LEGACY]: success_legacy,
  [Types.PACKAGES_FAILURE]: failure,
  [Types.PACKAGE_UPDATE]: update,
  [Types.PACKAGE_LAST]: last,
  [Types.PACKAGES_RESET]: reset
  // [Types.ORDEN_UPDATE_SUCCESS]: update_success,
  // [Types.ORDEN_SELECTED]: selected,
  // [Types.ORDENES_REHYDRATE]: rehydrate
});
