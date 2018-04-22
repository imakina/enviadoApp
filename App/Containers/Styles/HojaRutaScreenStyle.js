import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    paddingTop: 70
  },
  listContent: {
    // borderColor: Colors.bloodOrange,
    // borderWidth: 2
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center"
  },
  // button: {
  //   backgroundColor: "#ff4f00",
  //   borderRadius: 12
  // },
  // buttonContainer: {
  //   backgroundColor: Colors.transparent
  // },
  help: {
    ...Fonts.style.normal,
    textAlign: "center",
    padding: 10,
    marginBottom: 20
  },
  groupHojas: {
    flex: 1,
    // flexDirection: "row",
    // borderWidth: 3,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20
  }
});
