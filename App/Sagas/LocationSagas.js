
import { PermissionsAndroid } from "react-native";
import { all, call, put, takeEvery } from 'redux-saga/effects'
// actions
import LocationActions from "../Redux/LocationRedux";
// import console = require('console');

// import { change } from '../Actions/Location'
import { locationChangeChannel } from '../Services/Location'

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    result (granted === true)
  } catch (err) {
    console.warn(err);
  }
}

function * locationChange ({ coords }) {
  // The `latitude`, `longitude`
  // parameters come from `watchPosition`.
  const { latitude, longitude } = coords
  
    // Log the `LOCATION_CHANGE` action.
//   yield put(change({ latitude, longitude }))
    console.log('locationchange', latitude + ' ' + longitude);
    yield put(LocationActions.locationAdquire(latitude, longitude))
}

export function * openLocationWatch () {

  if (requestLocationPermission() ) {

    console.log('openLocationWatch');
    const channel = yield call(locationChangeChannel)
    console.log('openLocationWatch',channel);
  
    yield takeEvery(channel, locationChange)

  }
}

export default function * LocationSagas () {
  yield all([openLocationWatch()])
}