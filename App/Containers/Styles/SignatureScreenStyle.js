import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor : Colors.snow,
    //new header
    paddingTop:70, 
  },
  buttonElementOK: {
    marginBottom: 10,
    backgroundColor: Colors.background
  },
  buttonElementKO: {
    marginBottom: 10,
    backgroundColor: Colors.bloodOrange
  }
})
