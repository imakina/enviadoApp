import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
// import { Button } from "react-native-elements";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from "../Redux/LoginRedux";
import PackagesActions from "../Redux/PackagesRedux";
// Components
import Header from "../Components/Header";
import ButtonIcon from '../Components/ButtonIcon'
// Styles
import styles from "./Styles/WelcomeScreenStyle";

const WelcomeButton = ({icon, title, onpress}) => (
    // <Button
    //   icon={{
    //     name: icon,
    //     size: 30,
    //     color: "white",
    //     type : "font-awesome"
    //   }}
    //   title={title}
    //   buttonStyle={{backgroundColor:Colors.facebook, borderRadius: 5, marginTop: 10}}
    //   onPress={onpress} 
    // />

    <ButtonIcon
      icon={{ name: icon, type : "font-awesome", color: "white" }}
      text={title}
      type={"order"}
      onPress={onpress} 
      style={{marginTop:10}}
    />
)

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePressHR = () => this.props.navigation.navigate("HomeScreen");
  handlePressOR = () => {
    // TODO replace with the login logic
    this.props.resetPackages();
    this.props.depositoLogin(false);
    this.props.navigation.navigate("OrdenRetiroScreen");
  }
  handlePressDE = () => {
    // TODO replace with the login logic
    this.props.resetPackages();
    this.props.depositoLogin(true);
    // move to depositoscreen
    this.props.navigation.navigate("OrdenRetiroScreen");
  }

  onPressingLogout = () => {
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
            buttonList.map((btn) => (
              <WelcomeButton
                key={btn.id}
                icon={btn.icon}
                title={btn.title}
                onpress={btn.onpress} 
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    depositoLogin: (isDeposito) => dispatch(LoginActions.loginDeposito(isDeposito)),
    resetPackages: () => dispatch(PackagesActions.packagesReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
