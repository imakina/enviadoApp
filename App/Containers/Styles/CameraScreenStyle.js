import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
container: {
  flex: 1,
  flexDirection: 'row',
},
preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: Metrics.screenHeight,
  width: (Metrics.screenWidth / 2)
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  color: '#000',
  padding: 10,
  margin: 40
},
exit: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  color: '#000',
  padding: 10,
  margin: 60
}
})
