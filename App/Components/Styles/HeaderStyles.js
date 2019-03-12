import {StyleSheet} from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
   ...ApplicationStyles.screen,
   navigation: {
      color : Colors.background,
      fontSize: 20
   }
})
