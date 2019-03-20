import React, { Component } from 'react'
import { View, Text, TextInput, Platform, TouchableOpacity, Vibration, } from 'react-native'
import { connect } from 'react-redux'
// import { Icon, Button } from 'react-native-elements'
// import SignatureCapture from 'react-native-signature-capture';
// Components
// import MaKitButton from '../Components/MaKitButton'
import CapturePicture from '../Components/CapturePicture'
import CaptureBarcode from '../Components/CaptureBarcode'
import CaptureSignature from '../Components/CaptureSignature'
import CapturePackage from '../Components/CapturePackage'
import Header from "../Components/Header";

// Barcode
// import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode, BarcodeType} from "react-native-barcode-scanner-google";
// import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode} from "react-native-barcode-scanner-google";

// const DURATION = 10000 ;
// const PATTERN = [ 1000, 2000, 3000, 4000] ;

// const BarcodeScanner = Platform.select({
//   android: () => require('react-native-barcode-scanner-google').default,
//   ios: () => require('react-native-camera').default
// })();
// import Camera from 'react-native-camera';

// import RNFS from 'react-native-fs'

import styles from './Styles/SignatureScreenStyle'
// import { Colors } from '../Themes';

class SignatureScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // show : true,
      // data : props.navigation.state.params,
      // signature : null,
      // dragged : false,
      step : props.navigation.state.params.step,
      // partdni : "",
      // partname : "",
      // packageNumber : ""
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  // onSigned = () => {
  //   console.tron.log({name:'saving'})
  //   this.refs["sign"].saveImage();
  // }

  // onClean = () => {
  //   this.setState({ show: false, dragged: false }); 
  //   setTimeout( () => { this.setState({ show: true }); }, 130);
  // }

  // _onSaveEvent = (result) => {
  //   //result.encoded - for the base64 encoded png
  //   //result.pathName - for the file path name
  //   // console.tron.log(result);
  //   console.log("signature", result.encoded);
  //   this.setState({ 
  //     signature: result.encoded 
  //   }, function() {
  //     // console.tron.log("then")
  //     const { navigation } = this.props;
  //     navigation.goBack();
  //     navigation.state.params.onSign(this.state.signature);
  //   })
  // }

  // _onDragEvent = () => {
  //   // This callback will be called when the user enters signature
  //   console.tron.log("dragged");
  //   this.setState({ dragged : true})
  // }

  // saveSign() { this.refs["sign"].saveImage(); }
  // resetSign() { this.refs["sign"].resetImage(); }

  /////////////////////////////// PACKAGE

  // StartVibrationFunction=()=>{
 
  //   // Device Will Vibrate for 10 seconds.
  //   Vibration.vibrate(DURATION) ;
 
  //   // Android Device Will Vibrate in pattern : Wait 1sec -> vibrate 2sec -> wait 3sec.
  //   // iOS Device Will Vibrate in pattern : Wait 1sec -> Vibrate -> wait 2sec -> Vibrate -> wait 3sec -> Vibrate
    
  //   // Vibration.vibrate(PATTERN)
 
 
  //   // Android Device Will Vibrate in above pattern Infinite Time.
  //   // iOS Device Will Vibrate in above pattern Infinite Time.
    
  //   // Vibration.vibrate(PATTERN, true)
 
  // }

  // // Stop Vibration.
  // StopVibrationFunction = () => Vibration.cancel();

  // handleChangePackage = (text) => this.setState({ packageNumber: text });

  // handleSavePackage = () => {
  //   const scanned = {
  //     data : this.state.packageNumber,
  //     type : 'none'
  //   }
  //   this.scannedPackageNumber(scanned)
  // }

  // scannedPackageNumber({data, type}) {
  //   this.setState({ packageNumber: data }, () => {
  //     this.StartVibrationFunction();
  //     this.saveScanPackage();
  //   })
  // }

  // saveScanPackage = () => {
  //   const { navigation } = this.props;
  //   navigation.state.params.onPackage(this.state.packageNumber);
  //   this.StopVibrationFunction();
  // }

  /////////////////////////////// BARCODE

  // saveScan = () => {
  //   // save to the parent
  //   const { navigation } = this.props;
  //   navigation.state.params.onBarcode(this.state.dni);
  // }

  // scannedBarCode({data, type}) {
  //   this.setState({dni: data, step:"signature"}, () => {
  //     this.saveScan();
  //   })
  // }

  // handleChangeDni = (text) => {
  //   this.setState({ partdni: text })
  // }

  // handleChangeName = (text) => {
  //   this.setState({ partname: text })
  // }

  // handleSave = () => {
  //   const scanned = {
  //     data : this.state.partdni + " " + this.state.partname,
  //     type : 'none'
  //   }
  //   this.scannedBarCode(scanned)
  // }

  // handleException = (exceptionKey) => {
  //   var exception = ''
  //   switch (exceptionKey) {
  //     case Exception.NO_PLAY_SERVICES:
  //       exception = "no esta usando play services en su telefono"
  //       // tell the user they need to update Google Play Services
  //     case Exception.LOW_STORAGE:
  //       exception = "esta bajo de memoria"
  //       // tell the user their device doesn't have enough storage to fit the barcode scanning magic
  //     case Exception.NOT_OPERATIONAL:
  //       exception = "no es operacional"
  //       // Google's barcode magic is being downloaded, but is not yet operational.
  //     default:
  //         break;
  //     }
  //   this.setState({error:exception})
  // }

  // takePicture() {
  //   const options = {};
  //   //options.location = ...
  //   this.camera
  //     .capture({ metadata: options })
  //     .then(data => {

  //       let base64Img = data.path;
  //       RNFS.readFile( base64Img, 'base64' )
  //         .then( res => { 
            
  //           //this.setState( { uri: res } )
  //           const { navigation } = this.props;
  //           navigation.goBack();
  //           console.log(res);
  //           navigation.state.params.onCapture(res); 
        
  //         }
  //       )
  //       // this.goBack(data)
  //     })
  //     .catch(err => console.tron.log(err));
  // }

  /////////////////////////////// CAMERA

  //camera callback
  onCapture = (imageBase64) => {
    console.log(res);
    console.tron.log({message:'camera shot', display:res});
    // return the data
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onCapture(imageBase64); 
  }

  /////////////////////////////// BARCODE

  //barcode callback
  onBarcodeRead = (dni) => {
    // save to the parent
    console.tron.log('onBarcodeRead',dni)
    const { navigation } = this.props;
    this.setState({ step:"signature" }, () => {
      navigation.state.params.onBarcode(dni);
    })
  }

  ///////////////////////////////// PAD

  onPadRead = (signature) => {
    console.tron.log('onPadRead',signature)
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSign(signature);
  }

  //////////////////////////////// PACKAGE

  onPackageRead = (packageNumber) => {
    console.tron.log('onPackageRead', packageNumber)
    const { navigation } = this.props;
    navigation.state.params.onPackage(packageNumber);
  }

  //////////////////////////////////////

  render () {

    const headerTitle = (this.state.step == 'package')?`SCAN   ${this.props.packages.packages.length} / ${this.props.packages.legacy.length}`:this.state.step;  

    return (

      this.state.step == "capture" ?

        <CapturePicture onCapture={this.onCapture}></CapturePicture>
 
      :

        <View style={styles.container}>

          <Header
            title={headerTitle}
            left={{ 
              icon: "chevron-left", 
              onPress: () => this.goBack() 
            }}
          />

          <View style={styles.content}> 

            { 
              this.state.step === "barcode" &&
                <CaptureBarcode onBarcode={this.onBarcodeRead}></CaptureBarcode>
            }

            { 
              this.state.step === "signature" &&
                <CaptureSignature onPad={this.onPadRead}></CaptureSignature>
            }

            { 
              this.state.step === "package" &&        
                <CapturePackage 
                  packages={this.props.packages.packages.length}
                  legacy={this.props.packages.legacy.length}
                  last={this.props.packages.last}
                  onPackageRead={this.onPackageRead}>
                </CapturePackage>
            }

          </View>

        </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    packages: state.packages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureScreen)
