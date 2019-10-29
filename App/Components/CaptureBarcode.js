import React, { Component } from "react";
import { View, Platform, TextInput, Button, Text, Vibration, } from "react-native";
import PropTypes from "prop-types";
import { RNCamera } from 'react-native-camera';

// const BarcodeScanner = Platform.select({
//   // android: () => require('react-native-barcode-scanner-google').default,
//   ios: () => require('react-native-camera').default,
//   android: () => require('react-native-camera').default
// })();

import styles from "./Styles/CaptureStyles";
//Components
import MaKitButton from './MaKitButton'

export default class CaptureBarcode extends Component {

  static defaultProps = { }

  static propTypes = {
    onBarcode: PropTypes.func,
    // text: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      partdni : "",
      partname : ""
    }
  }

  // event automatic save
  scannedBarCode({data, type}) {
    // this.setState({dni: data, step:"signature"}, () => {
    //   this.saveScan();
    // })
    this.props.onBarcode(data);
  }

  handleChangeDni = (text) => this.setState({ partdni: text })
  handleChangeName = (text) => this.setState({ partname: text })

  // manual save
  handleSave = () => {
    const scanned = {
      data : this.state.partdni + " " + this.state.partname,
      type : 'none'
    }
    this.scannedBarCode(scanned)
  }

  handleException = (exceptionKey) => {
    var exception = ''
    switch (exceptionKey) {
      case Exception.NO_PLAY_SERVICES:
        exception = "no esta usando play services en su telefono"
        // tell the user they need to update Google Play Services
      case Exception.LOW_STORAGE:
        exception = "esta bajo de memoria"
        // tell the user their device doesn't have enough storage to fit the barcode scanning magic
      case Exception.NOT_OPERATIONAL:
        exception = "no es operacional"
        // Google's barcode magic is being downloaded, but is not yet operational.
      default:
          break;
      }

    // this.setState({error:exception})
    console.tron.log(exception);
    console.log(exception);
  }

  render() {
    return (
      <View style={styles.barcodeContainer}>
        
        <RNCamera 
            style={styles.barcodeContainer}
            // aspect={Camera.constants.Aspect.fit}
            // captureQuality={Camera.constants.CaptureQuality.low}
            onBarCodeRead={this.scannedBarCode.bind(this)}
            ref={cam => this.camera=cam}>
              <Text style={{color: 'white', fontSize: 18}}>{this.state.status}</Text>
        </RNCamera>

        <View style={styles.barcodeMain}>
          <View style={{width:'70%'}}>
            <TextInput
              style={styles.barcodeInputs}
              placeholder='Ingrese Numero DNI'
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleChangeDni}
              onSubmitEditing={()=> this.nameInput.focus()}
            />
            <TextInput
              style={styles.barcodeInputs}
              placeholder='Ingrese el nombre'
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleChangeName}
              ref={(input)=> this.nameInput = input}
            />
          </View>

          <MaKitButton
            disabled={!(this.state.partdni.length > 0 && this.state.partname.length > 0)}
            icon={{ name: 'check', type: 'font-awesome' }}
            text={'OK'}
            onPress={() => this.handleSave()} 
          />

        </View>

      </View>
    );
  }
}
