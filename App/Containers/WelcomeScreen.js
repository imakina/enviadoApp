import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Button } from "react-native-elements";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from "../Redux/LoginRedux";
import SyncActions from "../Redux/SyncRedux";
// Components
import Header from "../Components/Header";
// Styles
import styles from "./Styles/WelcomeScreenStyle";
import { Colors } from "../Themes";

const WelcomeButton = ({icon, title, onpress}) => (
    <Button
      icon={{
        name: icon,
        size: 30,
        color: "white",
        type : "font-awesome"
      }}
      title={title}
      buttonStyle={{backgroundColor:Colors.facebook, borderRadius: 5, marginTop: 10}}
      onPress={onpress} 
    />
)

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePressHR = () => this.props.navigation.navigate("HomeScreen");
  handlePressOR = () => this.props.navigation.navigate("PackageListScreen");
  handlePressDE = () => this.props.navigation.navigate("DepositoScreen");

  onPressingLogout = () => {
    // this.props.attemptLogout();
    this.props.navigation.goBack()
  };

  render() {

    const buttonList = [
      {id:1,icon: 'th-list', title: 'HOJA DE RUTA', onpress: ()=>this.handlePressHR()},
      {id:2,icon: 'barcode', title: 'ORDEN DE RETIRO', onpress: ()=>this.handlePressOR()},
      {id:3,icon: 'industry', title: 'DEPOSITO', onpress: ()=>this.handlePressDE()},
    ];

    return (
      <View style={styles.container}>
        
        <Header
          left={{ icon: "bars" }}
          right={{ icon: "sign-out", onPress: () => this.onPressingLogout() }}
          title="ENVIADO.COM"
        />

        <View style={[styles.formContainer]}>
          
          {
            buttonList.map((button) => (
              <WelcomeButton
                key={button.id}
                icon={button.icon}
                title={button.title}
                onpress={button.onpress} 
              />
            ))
          }

        </View> 

      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.tron.display({name:'stop_home',value: state})
  return {
    // user: state.login.account,
    // picture: state.login.picture,
    // fetching: state.login.fetching,
    // sync
    // sync: state.sync,
    // hojaruta: state.hojaruta,
    // remitos: state.remitos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // attemptLogout: () => dispatch(LoginActions.loginOut()),
    // updatePicture: img => dispatch(LoginActions.loginPicture(img)),
    // attemptSync: () => dispatch(SyncActions.syncRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
