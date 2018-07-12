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
  }
     
})
