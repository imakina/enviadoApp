import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

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
  //
formContainer: {
  // flex: 1,
  padding: 20
},
input: {
  backgroundColor: 'rgba(255,255,255,0.2)',
  height: 40,
  marginBottom: 10,
  color: '#FFF',
  paddingHorizontal: 10
},
buttonContainer: {
  backgroundColor: '#27ae60',
  paddingVertical: 15
},
buttonText: {
  textAlign: 'center',
  color: '#FFF',
  fontWeight: '700'
},
spinnerContainer: {
  flex:1,
  alignItems: 'center'
},
spinner: {
  // paddingVertical: 160
}
})
//
//
//
