import { takeLatest, all } from "redux-saga/effects";
import API from "../Services/Api";
import FixtureAPI from "../Services/FixtureApi";
import DebugConfig from "../Config/DebugConfig";

/* ------------- Types ------------- */

import { StartupTypes } from "../Redux/StartupRedux";
//import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from "../Redux/LoginRedux";
import { RemitosTypes } from "../Redux/RemitosRedux";
import { HojaRutaTypes } from "../Redux/HojaRutaRedux";
import { MotivosTypes } from "../Redux/MotivosRedux";
import { SyncTypes } from "../Redux/SyncRedux";

/* ------------- Sagas ------------- */

import { startup } from "./StartupSagas";
//import { getUserAvatar } from './GithubSagas'
import { login, check, logout, picture } from "./LoginSagas";
import { getRemitos, postRemito } from "./RemitosSagas";
import {
  getHojaRuta,
  rehydrateHojaRuta,
  rehydrateHojaRutaActive,
  activeHojaRuta
} from "./HojaRutaSagas";
import { getMotivos } from "./MotivosSagas";
import { sync } from "./SyncSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    //takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)

    // some sagas about login
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGIN_CHECK, check),
    takeLatest(LoginTypes.LOGIN_OUT, logout),
    takeLatest(LoginTypes.LOGIN_PICTURE, picture),

    // some sagas about remitos
    takeLatest(RemitosTypes.REMITOS_REQUEST, getRemitos, api),
    takeLatest(RemitosTypes.REMITO_UPDATE, postRemito, api),
    // takeLatest(RemitosTypes.REMITO_SYNC, syncRemitos),
    takeLatest(HojaRutaTypes.HOJA_RUTA_ACTIVATED, getRemitos, api),

    // some sagas about hojaderuta
    takeLatest(HojaRutaTypes.HOJA_RUTA_REQUEST, getHojaRuta, api),
    takeLatest(HojaRutaTypes.HOJA_RUTA_REHYDRATE, rehydrateHojaRuta),
    takeLatest(HojaRutaTypes.HOJA_RUTA_SUCCESS, rehydrateHojaRutaActive),
    takeLatest(HojaRutaTypes.HOJA_RUTA_ACTIVE, activeHojaRuta),

    // some saga about motivos of delivered remitos
    takeLatest(MotivosTypes.MOTIVOS_REQUEST, getMotivos, api),

    // sync process
    takeLatest(SyncTypes.SYNC_REQUEST, sync)
  ]);
}
