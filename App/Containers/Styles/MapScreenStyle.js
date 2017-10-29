import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor : Colors.snow,
    //new header
    paddingTop:70, 
  },
  map : {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  }
})
