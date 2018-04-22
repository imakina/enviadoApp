import { StyleSheet } from "react-native";
import { ApplicationStyles, Metrics, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    paddingTop: 70
  },
  formContainer: {
    // flex: 1,
    // padding: 20,
    backgroundColor: Colors.snow,
    paddingLeft: 10,
    paddingRight: 10
  },

  // buttonText: {
  //   textAlign: 'center',
  //   paddingLeft: 40,
  //   paddingRight: 10,
  //   color: Colors.snow,
  //   fontSize: Fonts.size.medium,
  //   fontFamily: Fonts.type.bold
  // },

  // buttonContainer: {
  //   // backgroundColor: '#27ae60',
  //   // borderColor: '#27ae60',
  //   // borderWidth: 2,
  //   borderRadius: 6,
  //   marginVertical: 5,
  //   borderTopColor: Colors.background,
  //   borderBottomColor: Colors.background,
  //   borderTopWidth: 1,
  //   borderBottomWidth: 1,
  //   backgroundColor: Colors.background
  // },

  // buttonIcon: {
  //   flexGrow: 1,
  //   flexDirection: 'row',
  //   justifyContent:'center',
  //   alignItems: 'center',
  //   padding: 8
  // },

  // spinnerContainer: {
  //   //flex:1,
  //   alignItems: 'center'
  // },

  spinner: {
    //flex:1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },

  // information : {
  //   maxWidth: 230
  // },

  //
  buttonElement: {
    backgroundColor: Colors.backgroundVariant
    // borderRadius: 10,
    // paddingRight: 70,
    // paddingLeft: 70,
    // marginBottom: 20
  },

  title: {
    ...Fonts.style.normal,
    fontWeight: "bold"
  },
  price: {
    ...Fonts.style.precio
  },
  subtitle: {
    fontSize: 14,
    maxWidth: 200
  },
  direction: {
    fontSize: 13,
    maxWidth: 200
  },
  description: {
    fontSize: 11
  }
});
