import React, { Component } from "react";
import { View, Platform, TextInput, Button, Text, Vibration, } from "react-native";
import PropTypes from "prop-types";

const BarcodeScanner = Platform.select({
  android: () => require('react-native-barcode-scanner-google').default,
  ios: () => require('react-native-camera').default
})();

const DURATION = 10000 ;
const PATTERN = [ 1000, 2000, 3000, 4000] ;

import MaKitButton from '../Components/MaKitButton'
import { Colors } from '../Themes';

export default class CapturePackage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      packageNumber : ''
    }
  }

  static defaultProps = { }

  static propTypes = {
    onPackageRead: PropTypes.func,
    packages : PropTypes.number,
    legacy : PropTypes.number,
    last : PropTypes.string
  };

  // Android Device Will Vibrate in pattern : Wait 1sec -> vibrate 2sec -> wait 3sec.
  // iOS Device Will Vibrate in pattern : Wait 1sec -> Vibrate -> wait 2sec -> Vibrate -> wait 3sec -> Vibrate
  // Vibration.vibrate(PATTERN)
  // Android Device Will Vibrate in above pattern Infinite Time.
  // iOS Device Will Vibrate in above pattern Infinite Time.
  // Vibration.vibrate(PATTERN, true)
  StartVibrationFunction=() => {
    // Device Will Vibrate for 10 seconds.
    Vibration.vibrate(DURATION) ;
  }

  // Stop Vibration.
  StopVibrationFunction = () => Vibration.cancel();

  handleChangePackage = (text) => this.setState({ packageNumber: text });

  handleSavePackage = () => {
    const scanned = {
      data : this.state.packageNumber,
      type : 'none'
    }
    this.scannedPackageNumber(scanned)
  }

  scannedPackageNumber({data, type}) {
    this.setState({ packageNumber: data }, () => {
      this.StartVibrationFunction();
      this.saveScanPackage();
    })
  }

  saveScanPackage = () => {

    // console.tron.log('received package 1', this.state.packageNumber)
    // const { navigation } = this.props;
    // navigation.state.params.onPackage(this.state.packageNumber);

    this.props.onPackageRead(this.state.packageNumber);
    this.StopVibrationFunction();

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

    this.setState({error:exception})
  }

  render() {
    return (

      <View style={{ flexGrow: 1 }}>

        <BarcodeScanner
          style={{ flex: 1 }}
          onBarcodeRead={this.scannedPackageNumber.bind(this)}
          onException={() => this.handleException}
          // focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
          // torchMode={TorchMode.ON /* could be the default OFF */}
          // cameraFillMode={CameraFillMode.FIT /* could also be FIT */}
          // barcodeType={BarcodeType.ALL /* replace with ALL for all alternatives */}
          >
        </BarcodeScanner>
      
        <View style={{flexDirection:'row', display:'flex', paddingBottom: 10, paddingTop: 10}}>
          
          <View style={{width:'75%'}}>
            <TextInput
              placeholder='Ingrese numero Paquete'
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleChangePackage}
            />
          </View>

          {/* <Button
            disabled={!(this.state.packageNumber.length > 0)}
            icon={{ name: 'check', type: 'font-awesome' }}
            title={'OK'}
            onPress={() => this.handleSavePackage()}
            buttonStyle={{marginTop:3, backgroundColor:Colors.facebook}} 
          /> */}

        </View>

        <View>

          <View style={{alignItems:'center'}}>
            <Text>Ultimo scan : {this.props.last}</Text>
            <Text style={{fontSize:30}}>Escaneados : {this.props.packages} de {this.props.legacy} </Text>
          </View>
          
          <MaKitButton
            disabled={!(this.state.packageNumber.length > 0)}
            icon={{ name:'check', type:"font-awesome" }}
            text={'OK'}
            type={"order"}
            onPress={() => this.handleSavePackage()}
          />

        </View> 

      </View>
    );
  }
}
