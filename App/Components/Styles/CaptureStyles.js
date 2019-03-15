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
  }

});
