import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor : Colors.snow,
    //new header
    // paddingTop:70,
  },
  content : {
    flex: 1, 
    alignContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5'
  },
  pad : {
    borderColor: 'black',
    borderWidth: 1.2,
    flex: 1, 
    backgroundColor: 'white',
  },
  buttonElementOK: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.background
  },
  buttonElementKO: {
    marginBottom: 10,
    backgroundColor: Colors.flame
  },
  padbrush : {
    backgroundColor: 'white', 
    flex: 1, 
    alignContent: 'center', 
    padding: 90
  },

  // camera: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   backgroundColor: 'black'
  // },
  // preview: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center'
  // },
  // capture: {
  //   flex: 0,
  //   // backgroundColor: Colors.transparent,
  //   // color: Colors.snow,
  //   borderColor: Colors.snow,
  //   borderWidth: 1,
  //   borderRadius: 60,
  //   // padding: 5,
  //   width: 110,
  //   height: 110,
  //   paddingHorizontal: 20,
  //   // alignSelf: 'center',
  //   margin: 30,
  //   paddingTop: 35
  // }
     
})
