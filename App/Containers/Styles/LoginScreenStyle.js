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
rememberme: {
  flexDirection: 'row',
  marginBottom: 10,
},
rememberText : {
  flex: 1,
  ...Fonts.style.normal,
  // alignItems: 'baseline',
  // justifyContent: 'center',
  backgroundColor: Colors.transparent,
  color: Colors.snow,
},
rememberCheck : {
  // fontSize: 15,
  // fontWeight: 'bold',
  // fontFamily: 'HelveticaNeue-Italic',
  // color: Colors.snow,
  // backgroundColor: Colors.bloodOrange,
  borderRadius: 4,
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  // opacity: 0.8,
  flexDirection: "row",
  // backgroundColor: Colors.backgroundVariant,
},
rememberCheckText : {
  fontSize : 18,
  color: Colors.snow,
  paddingBottom: 4,
  paddingRight: 6,
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

