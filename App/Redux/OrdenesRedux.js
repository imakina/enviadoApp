import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // ordenesRequest: ["hoja", "todos"],
  ordenLast : ["last"],
  ordenSave: null,
  ordenUpdate: ["orden"],
  ordenesSuccess: ["ordenes"],
  ordenesFailure: null,
  // ordenUpdateSuccess: null,
  // ordenSelected: ["orden"],
  // ordenesRehydrate: null
});

export const OrdenesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  fetching: null,
  // payload: null,
  error: null,
  message: "",
  last_package: "",
  ordenes: [],
  // states to reduce the calculations
  // in diferent screens
  // quantity: 0,
  // updated: 0
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, ordenes: null });

export const save = (state, action) =>
  state.merge({ fetching: false });

export const last = (state, action) => {
  const {last} = action;
  console.log(last);
  return state.merge({ fetching: false, last_package: last });
}

// rehydrate the data from an asyncstorage
export const rehydrate = (state, action) =>
  state.merge({ fetching: true, ordenes: null });

// request the data from an api
export const update = (state, action) =>
  state.merge({ fetching: true, payload: null });

// successful api lookup
export const success = (state, action) => {
  const { ordenes } = action;
  // const updated = remitos.filter(item => item.estado_mobile == 7).length;
  // console.tron.display("remito sucess", remitos);
  // console.log(action);
  return state.merge({
    fetching: false,
    error: null,
    ordenes: ordenes,
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
  // [Types.ORDENES_REQUEST]: request,
  [Types.ORDEN_SAVE]: save,
  [Types.ORDENES_SUCCESS]: success,
  [Types.ORDENES_FAILURE]: failure,
  [Types.ORDEN_UPDATE]: update,
  [Types.ORDEN_LAST]: last,
  // [Types.ORDEN_UPDATE_SUCCESS]: update_success,
  // [Types.ORDEN_SELECTED]: selected,
  // [Types.ORDENES_REHYDRATE]: rehydrate
});
