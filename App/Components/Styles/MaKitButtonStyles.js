import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes/";

export default StyleSheet.create({

  button: {
    flexDirection: "row",
    height: Metrics.screenHeight / 10,
    borderRadius: 8,
    flexGrow: 1
  },
  iconview : {
    flex: 2,
    alignSelf: "center",
    alignItems: "center",
  },
  icon: {
    // flex: 3,
    // alignSelf: "center",
    // alignItems: "center",
  },
  iconText: {
    color: Colors.snow,
  },
  text: {
    ...Fonts.style.normal,
    flex: 7,
    color: Colors.snow,
    textAlign: "center",
    alignSelf: "center",
    // paddingRight: 20
  },
  typeBase: {
    backgroundColor: Colors.backgroundVariant
  },
  typeAlert: {
    backgroundColor: Colors.bloodOrange
  },
  typeKO: {
    backgroundColor: Colors.flame
  },
  typeOrder: {
    backgroundColor: Colors.facebook
  },
  disabled: {
    backgroundColor: Colors.frost
  },
  typeInactive: {
    backgroundColor: Colors.bloodOrange
  }
});
