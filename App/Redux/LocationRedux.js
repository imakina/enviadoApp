import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
// import console = require("console");

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  locationAdquire: ['latitude', 'longitude'],
  locationStartup: null
});

export const LocationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  latitude : 0,
  longitude : 0
});

/* ------------- Reducers ------------- */

// request the data from gps
export const adquire = (state, data) => {
  // console.log('adquire_redux', data);
  const { latitude, longitude } = data
  return state.merge({ latitude : latitude, longitude : longitude })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_ADQUIRE]: adquire,
  // [Types.LOCATION_STARTUP]: startup,
});
