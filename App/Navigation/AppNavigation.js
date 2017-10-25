import { StackNavigator } from 'react-navigation'
import MapScreen from '../Containers/MapScreen'
import RouteScreen from '../Containers/RouteScreen'
import HojaRutaScreen from '../Containers/HojaRutaScreen'
import HomeScreen from '../Containers/HomeScreen'
import CameraScreen from '../Containers/CameraScreen'
import RemitoScreen from '../Containers/RemitoScreen'
import RemitosListScreen from '../Containers/RemitosListScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MapScreen: { screen: MapScreen },
  RouteScreen: { screen: RouteScreen },
  HojaRutaScreen: { screen: HojaRutaScreen },
  HomeScreen: { screen: HomeScreen },
  CameraScreen: { screen: CameraScreen },
  RemitoScreen: { screen: RemitoScreen },
  RemitosListScreen: { screen: RemitosListScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
