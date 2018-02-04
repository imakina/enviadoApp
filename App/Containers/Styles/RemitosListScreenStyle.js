import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts  } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.ricePaper,
    paddingTop:70, 
  },
  spinnerContainer: {
    flex:1,
    alignItems: 'center',
  },
  itembutton : {
    ...Fonts.style.normal
  },
  imagem :{
    padding:8,
    paddingTop:24
  },
  box :{
    padding:5, 
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
    color: Colors.ricePaper
  },
  // item: {
  //   ...Fonts.type.base
  // },
  // buttonGroupSelected: {
  //   ...Fonts.type.base
  //   // color: Colors.snow
  // },
  // buttonGroup : {
  //   ...Fonts.type.base
  // },

  textButtonGroup : {
    ...Fonts.style.normal,
    alignItems: 'center',
    justifyContent:'center', 
    textAlign:'center',
    padding: 6
  },
  textButtonSelected : {
    backgroundColor: Colors.backgroundVariant,
    color: Colors.snow
  },

  listitem: {
    flexDirection: 'row',
    height: Metrics.screenHeight / 20
  },
  domicilio: {
    ...Fonts.style.normal
  },
  distance : {
    ...Fonts.style.normal
  }

})
