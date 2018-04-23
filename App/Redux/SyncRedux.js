import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  syncRequest: null,
  syncSuccess: ["data"],
  syncFailure: null
});

export const SyncTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  syncing: null,
  // payload: null,
  error: null,
  syncedAt: null
});

/* ------------- Reducers ------------- */

// // request the data from an api
// export const request = (state, { data }) =>
//   state.merge({ fetching: true, data, payload: null })

// // successful api lookup
// export const success = (state, action) => {
//   const { payload } = action
//   return state.merge({ fetching: false, error: null, payload })
// }

export const sync = state => {
  return state.merge({ syncing: true });
};

export const success = (state, action) => {
  const { total, pending } = action;
  // sync date
  let now = new Date();

  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  const datetimeAt = now.toLocaleString("en-us", options);

  return state.merge({ syncing: false, syncedAt: datetimeAt });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SYNC_REQUEST]: sync,
  [Types.SYNC_SUCCESS]: success,
  [Types.SYNC_FAILURE]: failure
});
