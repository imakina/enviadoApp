import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor : Colors.ricePaper
  },
  formContainer: {
    // flex: 1,
    padding: 20
  },
  
  buttonText: {
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 10,
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  },

  buttonContainer: {
    // backgroundColor: '#27ae60',
    // borderColor: '#27ae60',
    // borderWidth: 2,
    borderRadius: 6,
    marginVertical: 5,
    borderTopColor: Colors.background,
    borderBottomColor: Colors.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: Colors.background
  },

  buttonIcon: {
    flexGrow: 1, 
    flexDirection: 'row', 
    justifyContent:'center', 
    alignItems: 'center', 
    padding: 8
  }

})
