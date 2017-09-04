import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts  } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  // row: {
  //   flex: 1,
  //   backgroundColor: Colors.snow,
  //   marginVertical: Metrics.smallMargin,
  //   justifyContent: 'center'
  // },
  // boldLabel: {
  //   fontWeight: 'bold',
  //   alignSelf: 'center',
  //   color: Colors.drawer,
  //   textAlign: 'center',
  //   marginBottom: Metrics.smallMargin
  // },
  // label: {
  //   textAlign: 'center',
  //   color: Colors.drawer
  // },
  // listContent: {
  //   marginTop: Metrics.baseMargin
  // },
  //
  header: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.backgroundColor,
    borderColor: Colors.frost,
    borderBottomWidth: 1
  },
  title: {
    ...Fonts.style.h2,
    color: Colors.snow,
    fontSize: 18,
    textAlign: 'center',
  },
  row: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding:10,
    flexDirection:'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: Colors.frost
  },
  info: {
   maxWidth: 360
 },
  level1: {
    ...Fonts.style.h2,
    fontSize: 14,
  },
  level2: {
    ...Fonts.style.h1,
    fontSize: 15,
  },
  level3: {
    ...Fonts.style.h1,
    fontSize: 13,
  },
  spinnerContainer: {
    flex:1,
    alignItems: 'center',
  },
  fullfill: {
    flex:1,
    backgroundColor: Colors.snow,
    opacity: 0.2
  }
})
