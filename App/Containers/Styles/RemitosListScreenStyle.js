import { StyleSheet, ColorPropType } from 'react-native'
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
  shadow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.eggplant
  },

  listitem: {
    height: Metrics.screenHeight / 7,
    width: Metrics.screenWidth - 30,
    // alignItems: 'center',
    backgroundColor: Colors.snow,
    // borderBottomColor: Colors.snow,
    flexDirection: 'column',
    // marginRight: 5,
    // marginLeft: 5,
    marginTop: 20,
    // padding: 10,

    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: Colors.bloodOrange
  },
  numero: {
    ...Fonts.style.h5,
    marginLeft: 5,
    // backgroundColor: Colors.charcoal
  },
  domicilio: {
    ...Fonts.style.small,
    padding: 0,
    marginTop: 5,
    backgroundColor: Colors.transparent
  },
  distance : {
    ...Fonts.style.h5,
    color: Colors.facebook,
    // backgroundColor: Colors.coal,
    alignSelf: 'flex-end'
  },

})
