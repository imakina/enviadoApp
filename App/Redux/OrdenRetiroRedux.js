import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ordenRetiroRequest: null,
  ordenRetiroSuccess: ["ordenes"],
  ordenRetiroFailure: null,
  ordenRetiroRehydrate: null,
  ordenRetiroRehydrateActive: null,
  ordenRetiroActive: ["active"],
  ordenRetiroActivated: ["active"]
});

export const OrdenRetiroTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  //must be filled from async
  active: null,
  ordenes: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, ordenes: null, active: null });

// rehydrate the data from an asyncstorage
export const rehydrate = (state, action) =>
  state.merge({ fetching: true, ordenes: null, active: null });

// successful api lookup
export const success = (state, { ordenes }) =>  {
  // console.log("redux", ordenes);
  return state.merge({ fetching: false, error: null, ordenes: ordenes });
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, ordenes: null, active: null });

// // select a hoja ruta
// export const selected = (state, action) =>
//   state.merge({ fetching: false, error: false, selected: action.hojaruta, active: action.hojaruta })

// activated a hoja ruta
export const activated = (state, { active }) => {
  // console.tron.display({ preview: "reduxactivated", value: active });
  // console.log({ preview: "ordenactivated", value: active });
  return state.merge({ fetching: false, error: false, active: active });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDEN_RETIRO_REQUEST]: request,
  [Types.ORDEN_RETIRO_SUCCESS]: success,
  [Types.ORDEN_RETIRO_FAILURE]: failure,
  [Types.ORDEN_RETIRO_ACTIVATED]: activated,
  // [Types.ORDEN_RETIRO_SELECTED]: selected,
  [Types.ORDEN_RETIRO_REHYDRATE]: rehydrate
});
