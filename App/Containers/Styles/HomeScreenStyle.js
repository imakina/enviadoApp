import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor : Colors.snow,
    //new header
    paddingTop:50, 
  },
  formContainer: {
    // flex: 1,
    padding: 20
  },

  buttonContainer: {
    paddingBottom:20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#FFF',
  },

  buttonElement: {
    backgroundColor: Colors.backgroundVariant, 
    // borderRadius: 5, 
    // paddingRight: 70,
    // paddingLeft: 70,
    // marginBottom: 20
  },

  // buttonElement: {
  //   backgroundColor: '#ECECEC', 
  //   // borderRadius: 5, 
  //   // paddingRight: 70,
  //   // paddingLeft: 70,
  //   // marginBottom: 20
  // },

  buttonText: {
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 10,
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  },

  buttonIcon: {
    flexGrow: 1, 
    flexDirection: 'row', 
    justifyContent:'center', 
    alignItems: 'center', 
    padding: 8
  },

  nombre : {
    // fontWeight: 'bold',
    // fontSize: 15,
    ...Fonts.style.normal
  },

  hoja : {
    ...Fonts.style.normal
  },

  mail: {
    ...Fonts.style.normal
  },

 capture: {
  marginTop: Metrics.screenHeight / 10,
  width: Metrics.screenWidth / 2.5,
  height: Metrics.screenWidth / 2.5,
  alignSelf: 'center',
  borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       borderRadius: Metrics.screenWidth / 5,
 }

})
