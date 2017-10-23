import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.ricePaper
  },
  map : {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 1.7,
  }

})
