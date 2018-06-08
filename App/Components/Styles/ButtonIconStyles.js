import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes/";

export default StyleSheet.create({
  //   button: {
  //     height: 45,
  //     borderRadius: 5,
  //     marginHorizontal: Metrics.section,
  //     marginVertical: Metrics.baseMargin,
  //     backgroundColor: Colors.fire,
  //     justifyContent: 'center'
  //   },
  //   buttonText: {
  //     color: Colors.snow,
  //     textAlign: 'center',
  //     fontWeight: 'bold',
  //     fontSize: Fonts.size.medium,
  //     marginVertical: Metrics.baseMargin
  //   }
  button: {
    flexDirection: "row",
    height: Metrics.screenHeight / 10,
    borderRadius: 8,
    flexGrow: 1
  },
  icon: {
    flex: 3,
    alignSelf: "center",
    alignItems: "center"
  },
  iconText: {
    color: Colors.snow
  },
  text: {
    ...Fonts.style.normal,
    flex: 4,
    color: Colors.snow,
    textAlign: "left",
    alignSelf: "center",
    paddingRight: 20
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
  disabled: {
    backgroundColor: Colors.frost
  },
  typeInactive: {
    backgroundColor: Colors.bloodOrange
  }
});
