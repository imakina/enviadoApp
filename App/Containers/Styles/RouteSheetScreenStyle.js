import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    // backgroundColor : '#27ae60'
    backgroundColor : 'rgba(255,255,255,0.2)'
  },
  spinnerContainer: {
    flex:1,
    alignItems: 'center',
  },
})
