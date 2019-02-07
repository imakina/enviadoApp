import { StackNavigator } from 'react-navigation'
import SignatureScreen from '../Containers/SignatureScreen'
import MapScreen from '../Containers/MapScreen'
import DirectionScreen from '../Containers/DirectionScreen'
import RouteScreen from '../Containers/RouteScreen'
import HojaRutaScreen from '../Containers/HojaRutaScreen'
import HomeScreen from '../Containers/HomeScreen'
import CameraScreen from '../Containers/CameraScreen'
import RemitoScreen from '../Containers/RemitoScreen'
import RemitosListScreen from '../Containers/RemitosListScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import WelcomeScreen from '../Containers/WelcomeScreen'
import ScanPackageScreen from '../Containers/ScanPackageScreen'
import PackageListScreen from '../Containers/PackageListScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SignatureScreen: { screen: SignatureScreen },
  MapScreen: { screen: MapScreen },
  DirectionScreen: { screen: DirectionScreen },
  RouteScreen: { screen: RouteScreen },
  HojaRutaScreen: { screen: HojaRutaScreen },
  HomeScreen: { screen: HomeScreen },
  CameraScreen: { screen: CameraScreen },
  RemitoScreen: { screen: RemitoScreen },
  RemitosListScreen: { screen: RemitosListScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
  WelcomeScreen: { screen: WelcomeScreen },
  ScanPackageScreen: { screen: ScanPackageScreen },
  PackageListScreen: { screen: PackageListScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
