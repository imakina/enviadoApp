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
  }
})
