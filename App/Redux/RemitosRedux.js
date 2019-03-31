import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  remitosRequest: ["hoja", "todos"],
  remitoUpdate: ["body"],
  remitosSuccess: ["remitos"],
  remitosFailure: null,
  remitoUpdateSuccess: null,
  remitoSelected: ["remito"],
  // remitoNotSynced: null
  remitosRehydrate: null
});

export const RemitosTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  fetching: null,
  // payload: null,
  error: null,
  message: "",
  remito: null,
  remitos: null,
  // states to reduce the calculations
  // in diferent screens
  quantity: 0,
  updated: 0
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, remitos: null });

// rehydrate the data from an asyncstorage
export const rehydrate = (state, action) =>
  state.merge({ fetching: true, remitos: null });

// request the data from an api
export const update = (state, action) =>
  state.merge({ fetching: true, payload: null });

// successful api lookup
export const success = (state, action) => {
  const { remitos } = action;
  const updated = remitos.filter(item => item.estado_mobile == 7).length;
  // console.tron.display("remito sucess", remitos);
  return state.merge({
    fetching: false,
    error: null,
    remitos: remitos,
    updated: updated,
    quantity: remitos.length
  });
};

// request the data from an api
export const update_success = (state, action) => {
  // console.tron.log("updateSucessRedux");
  return state.merge({ fetching: false, error: null });
};

// when a remito is selected from the list
export const selected = (state, action) => {
  const { remito } = action;
  return state.merge({ fetching: false, error: null, remito: remito });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({
    fetching: false,
    error: true,
    remitos: null,
    remito: null,
    quantity: null,
    updated: null
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMITOS_REQUEST]: request,
  [Types.REMITOS_SUCCESS]: success,
  [Types.REMITOS_FAILURE]: failure,
  [Types.REMITO_UPDATE]: update,
  [Types.REMITO_UPDATE_SUCCESS]: update_success,
  [Types.REMITO_SELECTED]: selected,
  // [Types.REMITO_SYNC]: sync,
  [Types.REMITOS_REHYDRATE]: rehydrate
});
