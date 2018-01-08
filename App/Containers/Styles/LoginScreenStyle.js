import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
container : {
  flex:1,
  backgroundColor: Colors.background
},
logoContainer: {
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'center',
},
logo: {
  width:250,
  height:200,
  resizeMode:"contain"
},
title: {
  // color: '#FFF',
  width: 100,
  marginTop: 10,
  alignItems: 'center',
  opacity: 0.9
},
//
formContainer: {
  // flex: 1,
  // paddingLeft: 20,
  // paddingRight: 20,
  // paddingTop: 20,
  padding : 20
},
input: {
  ...Fonts.style.normal,
  backgroundColor: 'rgba(255,255,255,0.2)',
  height: 40,
  marginBottom: 10,
  color: Colors.snow,
  paddingHorizontal: 10
},
checkbox: {
  backgroundColor: Colors.background,
  height: 20,
  marginBottom: 10,
},
checkboxTitle : {
  // fontSize: 15,
  // fontWeight: 'bold',
  // fontFamily: 'HelveticaNeue-Italic',
  color: Colors.snow,
  opacity: 0.8
},

spinnerContainer: {
  flex:1,
  alignItems: 'center'
},

button: {
  backgroundColor: '#27ae60', 
  // borderRadius: 5,
  // marginBottom: 20,
  // marginLeft: 5,
  // marginRight: 5
}

})

