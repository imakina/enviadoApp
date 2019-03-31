import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // hojaRutaRequest: ['car_id', 'estado'],
  hojaRutaRequest: null,
  hojaRutaSuccess: ["hojas"],
  hojaRutaFailure: null,
  hojaRutaRehydrate: null,
  hojaRutaRehydrateActive: null,
  hojaRutaActive: ["active"],
  hojaRutaActivated: ["active"]
});

export const HojaRutaTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  //must be filled from async
  active: null,
  hojas: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, hojas: null, active: null });

// rehydrate the data from an asyncstorage
export const rehydrate = (state, action) =>
  state.merge({ fetching: true, hojas: null, active: null });

// successful api lookup
export const success = (state, { hojas }) =>
  state.merge({ fetching: false, error: null, hojas: hojas });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, hojas: null, active: null });

// // select a hoja ruta
// export const selected = (state, action) =>
//   state.merge({ fetching: false, error: false, selected: action.hojaruta, active: action.hojaruta })

// activated a hoja ruta
export const activated = (state, { active }) => {
  console.tron.display({ preview: "reduxactivated", value: active });
  return state.merge({ fetching: false, error: false, active: active });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HOJA_RUTA_REQUEST]: request,
  [Types.HOJA_RUTA_SUCCESS]: success,
  [Types.HOJA_RUTA_FAILURE]: failure,
  [Types.HOJA_RUTA_ACTIVATED]: activated,
  // [Types.HOJA_RUTA_SELECTED]: selected,
  [Types.HOJA_RUTA_REHYDRATE]: rehydrate
});
