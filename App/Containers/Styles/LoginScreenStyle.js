import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

container : {
  flex:1,
  backgroundColor: '#2ecc71'
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
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 20,
},
input: {
  backgroundColor: 'rgba(255,255,255,0.2)',
  height: 40,
  marginBottom: 10,
  color: '#FFF',
  paddingHorizontal: 10
},
checkbox: {
  backgroundColor: '#2ecc71',
  height: 20,
  marginBottom: 10,
},
checkboxTitle : {
  ...Fonts.style.normal,
  color: '#FFF',
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

