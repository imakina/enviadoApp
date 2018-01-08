import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

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
  button : {
    backgroundColor: '#ff4f00', 
    borderRadius: 12,
  },
  buttonContainer: {
    backgroundColor: Colors.transparent,
  },
  help: {
    ...Fonts.style.normal,
    textAlign:'center', 
    padding: 10
  }
})
