import { StyleSheet } from "react-native";
import { ApplicationStyles, Metrics, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  shadow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: Colors.eggplant
  },
  listitem: {
    height: Metrics.screenHeight / 7,
    width: Metrics.screenWidth - 20,
    // alignItems: 'center',
    backgroundColor: Colors.snow,
    // borderBottomColor: Colors.snow,
    flexDirection: "column",
    // marginRight: 5,
    // marginLeft: 5,
    marginTop: 10,
    // padding: 10,

    borderRadius: 6,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 1.0
  },
  updated: {
    backgroundColor: Colors.charcoal
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
    // backgroundColor: Colors.bloodOrange
  },
  numero: {
    ...Fonts.style.h5,
    marginLeft: 5
    // backgroundColor: Colors.charcoal
  },
  domicilio: {
    ...Fonts.style.small,
    padding: 0,
    marginTop: 5,
    backgroundColor: Colors.transparent
  },
  distance: {
    ...Fonts.style.h5,
    color: Colors.facebook,
    // backgroundColor: Colors.coal,
    alignSelf: "flex-end"
  }
});
