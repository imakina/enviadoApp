import { StyleSheet, ColorPropType } from "react-native";
import { ApplicationStyles, Metrics, Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    // paddingTop: 70
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 40
  },
  itembutton: {
    ...Fonts.style.normal
  },
  imagem: {
    padding: 8,
    paddingTop: 24
  },
  box: {
    padding: 5
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
    color: Colors.ricePaper
  },
  // item: {
  //   ...Fonts.type.base
  // },
  // buttonGroupSelected: {
  //   ...Fonts.type.base
  //   // color: Colors.snow
  // },
  // buttonGroup : {
  //   ...Fonts.type.base
  // },

  listContent : {
    flexGrow: 1
  },

  textButtonGroup: {
    ...Fonts.style.normal,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 6
  },
  textButtonSelected: {
    backgroundColor: Colors.backgroundVariant,
    color: Colors.snow
  },
  
  proximityCheck : {
    borderRadius: 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: "row",
    paddingTop: 8,
    // paddingBottom: 3,
    paddingRight: 10,
  },
  proximityCheckText : {
    fontSize : 14,
    color: Colors.black,
    paddingBottom: 6,
    paddingRight: 10,
  },

  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 40
  },

});
