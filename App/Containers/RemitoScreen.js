import React, { Component } from "react";
import { View, Text, TouchableOpacity, Picker, Alert } from "react-native";
import { connect } from "react-redux";
import { Button, Divider, Icon } from "react-native-elements";
import Spinner from "react-native-spinkit";
// import NavigationBar from 'react-native-navbar';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MotivosActions from "../Redux/MotivosRedux";
import RemitosActions from "../Redux/RemitosRedux";
import AlertActions from "../Redux/AlertRedux";
// Styles
import styles from "./Styles/RemitoScreenStyle";
import { Colors } from "../Themes/";
// Components
import ButtonIcon from "../Components/ButtonIcon";
import Header from "../Components/Header";

class RemitoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      motivos: this.props.motivos,
      motivo: 0,
      gpserror: "",
      fetching: false,
      alert: {},
      showAlert: false,
      updating: false,
      signature: null,
      scan: null,
      scanned : ""
    };
    this.isRequesting = false;

    // //si tiene la firma
    // if (props.navigation.state.params){
    //   console.tron.log("llego signature")
    //   console.tron.log(props.navigation.state.params.signature)
    //   this.onUpdate(props.navigation.state.params.signature)
    // }
  }

  // idRemito: '48846',
  // estado: '3',
  // fechaHora: '2017-09-27 11:36:37.243',
  // latitud: '-34.5585783',
  // longitud: '-58.5585783'
  // }

  onPressingConfirm = () => {
    this.save();
  }

  onSave = () => {
    
    const { motivo, longitude, latitude } = this.state;
    const { remito } = this.props;

    let data = {
      idRemito: remito.idRemito,
      estado: motivo,
      fechaHora: this.formatDateTime(),
      latitud: latitude.toString(),
      longitud: longitude.toString(),
      car_id: 0 //hojaruta.car_id
    };

    //listo para mostrar un mensaje
    this.showAlert = true;

    // si no tengo la firma
    // o sino tengo el scan del documento
    // if (this.state.motivo == 0 && !this.state.signature) 
    //   this.onSigning();
    // else 
    this.onUpdate(data);

    //this.onUpdate(data);
  };

  // called from signature
  onSignature = sign => {
    console.tron.log({ name: "receive_signature", value: sign });
    console.log("signature", sign)
    this.setState({ signature: sign }, function() {
      this.onSave()
    });
  };

  // capture a picture
  onCapture = picture => {
    console.tron.log({ name: "receive_picture", value: picture });
    console.log("picture", picture)
    this.setState({ picture: picture }, () => {
      this.onSave()
    });
  };

  // from the scan screen
  // save the data scanned
  // go to signature
  onScanned = scanned => {
    console.tron.log({ name: "receive_scan", value: scanned });
    console.log("receive_scan", scanned);
    this.setState({ scan : scanned });
    // this.onSigning()
  };

  // 
  // first step, navigate to scanner
  // arguments : onScan & on Sign
  //
  onScanning = () => {
    //bloqueo el ingreso o cambio de
    this.setState({ fetching:true })
    const { remito } = this.props;
    // console.tron.log({ name: "RazonSocial", value: remito.razonSocial });
    // console.log("RazonSOCIALSOCIAL", remito);
    if (this.state.motivo == 0)
      
      if (remito.razonSocial != "SA La DNación") {
        this.props.navigation.navigate("SignatureScreen", {
          onBarcode: this.onScanned,
          onSign: this.onSignature,
          step: "barcode"
        });
      }
      else
      {
        // in update, this two states are collected
        this.setState({ signature : "", scan : ""}, () => this.onSave());
      }

    else
      // this.onSave();
      this.props.navigation.navigate("SignatureScreen", {
        // onBarcode: this.onScanned,
        // onSign: this.onSignature,
        onCapture: this.onCapture, 
        step: "capture"
      });

  };

  // if (this.state.motivo == 0) 
  //   data.firma = this.state.signature;
  // else 
  //   data.firma = "";

  onUpdate = data => {

    // console.log("motivo", this.state.motivo);
    // console.log("firma", this.state.signature);

    // data.firma = (this.state.motivo == 0 ? this.state.signature : "")
    data.firma = (this.state.motivo == 0 ? this.state.signature : this.state.picture)
    data.scan = (this.state.motivo == 0 ? this.state.scan : "")

    // data.firma = (this.state.motivo != 0 ? this.state.picture : "")

    this.setState({ updating: true });
    this.props.updateRemito(data);
  };

  formatDateTime() {
    let d = new Date();
    let result = d.getFullYear();
    result += "-";
    result += (d.getMonth() + 1 > 9 ? "" : "0") + (d.getMonth() + 1);
    result += "-";
    result += (d.getDate() > 9 ? "" : "0") + d.getDate();
    result += " ";
    result += (d.getHours() > 9 ? "" : "0") + d.getHours() + ":";
    result += (d.getMinutes() > 9 ? "" : "0") + d.getMinutes() + ":";
    result += (d.getSeconds() > 9 ? "" : "0") + d.getSeconds() + ".";
    result += d.getMilliseconds();
    // console.tron.log(result,true)
    return result;
  }

  componentWillReceiveProps(newProps) {
    try {
      this.setState({
        motivos: newProps.motivos,
        fetching: newProps.fetching,
        updating: newProps.updating,
        alert: newProps.alert
      });

      if (newProps.alert.show && this.showAlert) {
        this.showAlert = false;

        Alert.alert(
          "Informacion",
          newProps.alert.message,
          [
            {
              text: "OK",
              onPress: () => this.onPressingBack()
            }
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      console.tron.log(e);
    }
  }

  componentDidMount() {
    
    if (!this.props.motivos) {
      // console.tron.log("rcm_motivos");
      this.setState({ fetching: true, gpsfetching: false });
      this.props.requestMotivos();
    }

    //get position
    /*if (this.props.location.latitude != '') {

      console.log("adquire location")
      this.setState({
        latitude: this.props.location.latitude,
        longitude: this.props.location.longitude,
        error: null,
        gpsfetching: false
      });

    } else {*/
      this.setState({ gpsfetching: true });
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            gpsfetching: false
          });
          // console.tron.display({ name: "position", value: position });
        },
        error => this.setState({ gpserror: error.message, gpsfetching: false }),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );

    //}
  }
  

  onPressingBack = () => {
    this.props.navigation.navigate("RemitosListScreen");
    this.props.clearAlert();
  };

  onPressingRoute = () => {
    this.props.navigation.navigate("RouteScreen");
  };

  render() {
    const {
      fetching,
      updating,
      gpsfetching
    } = this.state;

    const { remito, motivos } = this.props;

    return (
      <View style={styles.container}>

        <Header
          title="REMITO"
          left={{ icon: "chevron-left", onPress: () => this.onPressingBack() }}
        />

        <View style={styles.outerBox}>

          <View style={styles.horizontalBox}>
            <Text style={styles.price}>$ {remito.importe} {remito.tipoPago && "- " + remito.tipoPago.trim()} </Text>
            <Icon name="open-book" type="entypo" size={70} color={Colors.background} />
          </View>

          <View style={styles.horizontalBox}>

            <View>
              <Text style={styles.title}>{remito.nroRemito}</Text>
              <Text style={styles.subtitle}>{remito.nombreDestinatario.trim()}</Text>
              <Text style={styles.subtitle}>{remito.razonSocial}</Text>
              <Text style={styles.direction} numberOfLines={3}>{remito.domicilioDestinatario.trim()}</Text>
              <Text style={styles.description} numberOfLines={3}>{remito.observaciones}</Text>
            </View>

          </View>

          <View style={{ alignItems: 'center' }}>

              { gpsfetching && (
                <Text style={styles.gps}>Buscando GPS ... </Text>
              )}

              { (gpsfetching || fetching || updating) && 
              
              <View >
                <Spinner
                  style={styles.spinner}
                  size={130}
                  type={"Pulse"}
                  color={Colors.backgroundVariant}
                />
              </View>

              }

          </View>

        </View>

        <View style={styles.formContainer}>

          { gpsfetching || fetching || updating ? 
          
            null
          
          : (

            <View>
              <Divider style={{ backgroundColor: Colors.background  }} />

              <Picker
                selectedValue={this.state.motivo}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ motivo: itemValue })
                }
              >
                {motivos &&
                  motivos.map((l, i) => {
                    return (
                      <Picker.Item
                        value={l.id}
                        label={l.descripcion}
                        key={l.id}
                      />
                    );
                  })}
              </Picker>

              <Divider style={{ backgroundColor: Colors.background }} />

              <View>

                <Text style={{paddingBottom:6, paddingTop: 6}}>
                { this.state.motivo == 0 ?
                `Guarde un escaneo del dni y la firma para su aceptacion ${this.state.scanned}` :
                "No tiene requisitos dado que no existe una persona para entregar" }
                </Text>

                {/* <View
                  style={styles.buttonContainer}
                >
                  <ButtonIcon
                    disabled={this.state.motivo != 0}
                    icon={{ name: "pencil", type: "entypo" }}
                    text={"FIRMAR"}
                    onPress={() => this.onSigning()}
                  />

                  <View><Text>{" "}</Text></View>

                  <ButtonIcon
                    disabled={this.state.motivo != 0}
                    icon={{ name: "camera", type: "entypo" }}
                    text={"SCAN"}
                    onPress={() => this.onScanning()}
                  />

                </View> */}
              
              </View>
              
              <View style={{paddingBottom: 10, flexDirection: 'row'}}>
                <View style={{marginRight: 5, flex: 1}}>
                  <ButtonIcon
                    icon={{ name: this.state.motivo != 0 ? "camera" : "arrow-with-circle-right", type: "entypo" }}
                    text={this.state.motivo != 0 ? "": "SIGUIENTE"}
                    onPress={() => this.onScanning()}
                  />
                </View>

                {/* { this.state.motivo != 0 &&
                  <View style={{flex: 0.4}}>
                    <ButtonIcon
                      type={'ko'}
                      icon={{ name: "circle-with-cross", type: "entypo" }}
                      text={""}
                      onPress={() => this.onSave()}
                    />
                  </View>
                } */}
              </View>

            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.tron.display({name:'remito_sp', value:state})
  return {
    fetching: state.motivos.fetching,
    motivos: state.motivos.payload,
    updating: state.remitos.fetching,
    remito: state.remitos.remito,
    hojaruta: state.hojaruta.hojaruta,
    alert: state.alert,
    location: state.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestMotivos: () => dispatch(MotivosActions.motivosRequest()),
    updateRemito: body => dispatch(RemitosActions.remitoUpdate(body)),
    clearAlert: () => dispatch(AlertActions.alertClear())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemitoScreen);
