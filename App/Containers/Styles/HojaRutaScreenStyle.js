import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

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
})
