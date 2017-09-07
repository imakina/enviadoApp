import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  // header: {
  //   marginTop: 20,
  //   // padding: 20,
  //   backgroundColor: Colors.backgroundColor,
  //   borderColor: Colors.frost,
  //   borderBottomWidth: 1,
  //   flexDirection:'row'
  // },
  // title: {
  //   ...Fonts.style.h2,
  //   color: Colors.snow,
  //   fontSize: 18,
  //   textAlign: 'center',
  //   padding: 20,
  //   marginLeft: 20
  // },
  row: {
    // flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.snow,
    padding:10,
    // flexDirection:'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderColor: Colors.frost
  },
  item : {
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 20
  },
  separator :{
    backgroundColor: Colors.backgroundColor
  },
  // buttonGroup :{
  //   // flex:1,
  //   paddingBottom: 5,
  //   backgroundColor: Colors.snow
  // },
  footer:{
    flex:1,
    backgroundColor: Colors.snow
  },
  informationReverse: {
    marginBottom: 10,
  }
})
