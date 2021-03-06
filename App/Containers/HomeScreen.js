import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Image, StatusBar, TouchableOpacity, Alert } from "react-native";
// import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from "react-native-image-picker";
// import Spinner  from 'react-native-spinkit';
import { Icon } from "react-native-elements";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from "../Redux/LoginRedux";
import SyncActions from "../Redux/SyncRedux";
// Components
import Header from "../Components/Header";
import MaKitSpinner from '../Components/MakitSpinner'
// Styles
import styles from "./Styles/HomeScreenStyle";
import { Colors } from "../Themes";
// import { parse } from "querystring";

// var Spinner = require('react-native-spinkit')
// import Spinner from 'react-native-spinkit'

class HomeScreen extends Component {
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
  
  goBack = () => this.props.navigation.navigate("WelcomeScreen");

  onPressingHojaDeRuta = () => {
    this.props.navigation.navigate("HojaRutaScreen");
  };

  onPressingLogout = () => {
    // const { navigation } = this.props
    // navigation.state.params.onLogout();
    // navigation.navigate('LoginScreen')
    this.props.attemptLogout();
  };

  persistImage(response) {
    // parse image
    const picture = "data:image/jpeg;base64," + response.data;
    // update localstorage
    this.setState({ image: picture });
    this.props.updatePicture(picture);
  }

  onSelectImage() {
    const options = {
      title: "Foto de Perfil",
      cancelButtonTitle: "Cancelar",
      takePhotoButtonTitle: "Tomar una foto...",
      chooseFromLibraryButtonTitle: "Seleccionar de la Galeria...",
      permissionDenied: {
        title: "",
        text:
          "EnviadoApp quiere acceder a la cámara para poder usarla desde la aplicación",
        reTryTitle: "Ir a Configuración",
        okTitle: "Cancelar"
      },
      cameraType: "front",
      mediaType: "photo",
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500
    };

    // ImagePicker.showImagePicker(options, response => {
    //   if (response.didCancel) {
    //     this.setState({ pickFoto: false }, () =>
    //       setTimeout(() => this.setState({ pickFoto: true }), 100)
    //     );
    //   } else if (response.error) {
    //     // console.log(response.error)
    //   } else if (response.customButton) {
    //     // console.log(response.customButton)
    //   } else {
    //     this.persistImage(response);
    //     // this.setState({ image : 'data:image/jpeg;base64,' + response.data })
    //   }
    // });
  }

  onSync() {
    console.log("sync")
    this.props.attemptSync();
  }

  componentDidMount() {
    this.setState({ user: this.props.user });

    //profilePic
    if (this.props.picture) this.setState({ image: this.props.picture });

    if (this.props.hojaruta.hojas)
      this.setState({ quantity_hojas: this.props.hojaruta.hojas.length });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.hojaruta.hojas) {
      this.setState({ quantity_hojas: newProps.hojaruta.hojas.length });
      // console.log( newProps.hojaruta )
    }
  }

  // parseRemitos(remitos) {
  //   if (!remitos) return;

  //   this.setState({
  //     quantity: remitos.length,
  //     pending: remitos.filter(item => item.estado_mobile == 99).length,
  //     synced: quantity - pending
  //   });
  // }

  render() {
    const { image, quantity_hojas } = this.state;
    const { quantity, updated } = this.props.remitos;
    const { car_id, car_first_nm, car_last_nm, mail } = this.state.user;
    const { syncedAt, syncing, error } = this.props.sync;
    const { active } = this.props.hojaruta;

    return (
      <View style={styles.container}>
        <Header
          // left={{ icon: "bars" }}
          left={{ icon: "chevron-left", onPress: () => this.goBack() }}
          // right={{ icon: "sign-out", onPress: () => this.onPressingLogout() }}
          title="ENVIADO.COM"
        />

        <View style={styles.main}>
          <View style={{ padding: 10, alignItems: "center" }}>
            <Text style={styles.nombre}>
              {car_first_nm} {car_last_nm}
            </Text>
            <Text style={styles.hoja}>CarID{car_id}</Text>
            <Text style={styles.mail}>{mail}</Text>
          </View>
        </View>


        { syncing ? 

          <View style={styles.spinnerContainer}>
            {/* <Spinner
              style={styles.spinner}
              isVisible={true}
              size={100}
              type={'ChasingDots'}
              /> */}
            <MaKitSpinner />
          </View>
        :
          <View style={[styles.formContainer]}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.bigaction}>
                <Icon
                  name="refresh"
                  type="font-awesome"
                  // color="white"
                  color={Colors.backgroundVariant}
                  reverse
                  size={60}
                  onPress={() => this.onSync()}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={styles.regular}>Última sincronización : </Text>
              <Text style={styles.regular}>{syncedAt}</Text>
              <Text style={styles.regular}> </Text>
              <Text style={styles.regular}>Cantidad de Hojas : {quantity_hojas}</Text>
              <Text style={styles.regular}>Hoja de Ruta Activa : {active}</Text>
              <Text style={styles.regular}>Remitos : {quantity} / Pendientes : {updated} </Text>
              {/* <Text style={styles.regular}>Remitos actualizados : {updated}</Text> */}
              {/* solo mostrar si existe un error */}
              { error && 
                <Text style={styles.regular}>Error : {error}</Text>
              }
              {/* <Text>Remitos sin cambios : </Text> */}
            </View>

            <View style={{ alignItems: "center", marginTop: 10 }}>
              <TouchableOpacity
                style={styles.action}
                onPress={() => this.onPressingHojaDeRuta()}
              >
                <Icon
                  name="arrow-right"
                  type="font-awesome"
                  color="white"
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
