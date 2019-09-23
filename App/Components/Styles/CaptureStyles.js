import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes";

export default StyleSheet.create({

  camera: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    borderColor: Colors.snow,
    borderWidth: 1,
    borderRadius: 60,
    width: 110,
    height: 110,
    paddingHorizontal: 20,
    margin: 30,
    paddingTop: 35
  },
  // signature
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
  },

  // capture package
  packageMessage: { 
    padding: 3, 
    fontSize:22, 
  },
  packageNotFound: { 
    backgroundColor: Colors.bloodOrange, 
    color: Colors.snow
  },
  packageLast: { 
    backgroundColor: Colors.backgroundVariant, 
    color: Colors.snow
  },
  packageAlternated: {
    backgroundColor: 'yellow',
    color: 'black'
  }


});
