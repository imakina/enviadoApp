import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from "../Redux/LoginRedux";
import SyncActions from "../Redux/SyncRedux";
// Components
import ButtonIcon from '../Components/ButtonIcon'
import Header from "../Components/Header";
// Styles
import styles from "./Styles/WelcomeScreenStyle";
import { Colors, Images } from "../Themes";

var Spinner = require('react-native-spinkit')

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      image: null,
      quantity: 0,
      updated: 0,
      quantity_hojas: 0
    };
  }

  handlePressHR = () => this.props.navigation.navigate("HomeScreen");
  handlePressOR = () => this.props.navigation.navigate("PackageListScreen");
  handlePressDE = () => this.props.navigation.navigate("DepositoScreen");
  

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  render() {

    return (
      <View style={styles.container}>
        
        <Header
          left={{ icon: "bars" }}
          right={{ icon: "sign-out", onPress: () => this.onPressingLogout() }}
          title="ENVIADO.COM"
        />

        <View style={[styles.formContainer]}>

          <ButtonIcon
        icon={{ name: 'th-list', type: 'font-awesome' }}
            text="HOJA DE RUTA"
            onPress={() => this.handlePressHR()} 
          />

          <View style={{marginTop:10}}></View>
          <ButtonIcon
            icon={{ name: 'barcode', type: 'font-awesome' }}
            text="ORDEN DE RETIRO"
            onPress={() => this.handlePressOR()}
          />

          <View style={{marginTop:10}}></View>
          <ButtonIcon
            icon={{ name: 'industry', type: 'font-awesome' }}
            text="DEPOSITO"
            onPress={() => this.handlePressDE()} 
          />
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.tron.display({name:'stop_home',value: state})
  return {
    user: state.login.account,
    picture: state.login.picture,
    fetching: state.login.fetching,
    // sync
    sync: state.sync,
    hojaruta: state.hojaruta,
    remitos: state.remitos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    attemptLogout: () => dispatch(LoginActions.loginOut()),
    updatePicture: img => dispatch(LoginActions.loginPicture(img)),
    attemptSync: () => dispatch(SyncActions.syncRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
