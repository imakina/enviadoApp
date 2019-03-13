import { createStackNavigator, createAppContainer } from 'react-navigation'
// import LaunchScreen from '../Containers/LaunchScreen'

import LoginScreen from '../Containers/LoginScreen'
// import WelcomeScreen from '../Containers/WelcomeScreen'
// import HomeScreen from '../Containers/HomeScreen'
// import HojaRutaScreen from '../Containers/HojaRutaScreen'
// import RemitoScreen from '../Containers/RemitoScreen'
// import RemitosListScreen from '../Containers/RemitosListScreen'
// import SignatureScreen from '../Containers/SignatureScreen'
// import PackageListScreen from '../Containers/PackageListScreen'
// import OrdenRetiroScreen from '../Containers/OrdenRetiroScreen'
// import MapScreen from '../Containers/MapScreen'
// import DirectionScreen from '../Containers/DirectionScreen'
// import RouteScreen from '../Containers/RouteScreen'
// import CameraScreen from '../Containers/CameraScreen'
// import ScanPackageScreen from '../Containers/ScanPackageScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  // WelcomeScreen: { screen: WelcomeScreen },
  // HomeScreen: { screen: HomeScreen },
  // HojaRutaScreen: { screen: HojaRutaScreen },
  // RemitoScreen: { screen: RemitoScreen },
  // RemitosListScreen: { screen: RemitosListScreen },
  // SignatureScreen: { screen: SignatureScreen },
  // PackageListScreen: { screen: PackageListScreen },
  // OrdenRetiroScreen: { screen: OrdenRetiroScreen }
  // LaunchScreen: { screen: LaunchScreen }
  // MapScreen: { screen: MapScreen },
  // CameraScreen: { screen: CameraScreen },
  // ScanPackageScreen: { screen: ScanPackageScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
