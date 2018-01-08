import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts  } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.ricePaper,
    paddingTop:70, 
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
//   header: {
//     marginTop: 20,
//     padding: 20,
//     backgroundColor: Colors.backgroundColor,
//     borderColor: Colors.frost,
//     borderBottomWidth: 1
//   },
//   title: {
//     ...Fonts.style.h2,
//     color: Colors.snow,
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   row: {
//     flex: 1,
//     backgroundColor: Colors.snow,
//     padding:10,
//     flexDirection:'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 0.5,
//     borderColor: Colors.frost
//   },
//   info: {
//    maxWidth: 360
//  },
//   level1: {
//     ...Fonts.style.h2,
//     fontSize: 14,
//   },
//   level2: {
//     ...Fonts.style.h1,
//     fontSize: 15,
//   },
//   level3: {
//     ...Fonts.style.h1,
//     fontSize: 13,
//   },
  spinnerContainer: {
    flex:1,
    alignItems: 'center',
  },
  
  spinner: {
    // marginTop: 40
  },

//   fullfill: {
//     flex:1,
//     backgroundColor: Colors.snow,
//     opacity: 0.2
//   },
  ///
  greatbox : {
    // paddingTop:10,
    // paddingLeft:10,
    // paddingRight:10,
    flexDirection:'row',
    borderColor: '#BFBFBF',
    borderWidth: 0.5,
    borderBottomWidth: 1.2,
    borderRightWidth: 1.2,
    padding:10,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    borderRadius:5
  },
  imagem :{
    padding:8,
    paddingTop:24
  },
  box :{
    padding:5, 
    // backgroundColor: '#F22613', 
    // borderRadius: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  subtitle : {
    fontSize: 14
  },
  direction: {
    fontSize: 13,
    maxWidth: 280
  },
  description : {
    fontSize: 11,
  },
  //ListItem
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  buttonGroup : {
    // color: Colors.windowTint
  },
  buttonGroupSelected: {
    ...Fonts.style.normal
    // color: Colors.snow
  }

})
