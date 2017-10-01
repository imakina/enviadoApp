import { StackNavigator } from 'react-navigation'
import HojaRutaScreen from '../Containers/HojaRutaScreen'
import HomeScreen from '../Containers/HomeScreen'
import CameraScreen from '../Containers/CameraScreen'
import RemitoDetailScreen from '../Containers/RemitoDetailScreen'
import RemitosListScreen from '../Containers/RemitosListScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HojaRutaScreen: { screen: HojaRutaScreen },
  HomeScreen: { screen: HomeScreen },
  CameraScreen: { screen: CameraScreen },
  RemitoDetailScreen: { screen: RemitoDetailScreen },
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
