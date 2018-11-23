import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  locationAdquire: null
});

export const SyncTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  latitude : null,
  longitude : null
});

/* ------------- Reducers ------------- */

// request the data from gps
export const adquire = (state, data) => {
  const { latitude, longitude } = data
  return state.merge({ latitude : latitude, longitude : longitude })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_ADQUIRE]: adquire
});
