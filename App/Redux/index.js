import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    // github: require('./GithubRedux').reducer,
    // search: require('./SearchRedux').reducer,
    login: require('./LoginRedux').reducer,
    remitos: require('./RemitosRedux').reducer,
    hojaruta: require('./HojaRutaRedux').reducer,
    motivos: require('./MotivosRedux').reducer,
    alert: require('./AlertRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
