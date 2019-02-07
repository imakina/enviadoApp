import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import { connect } from 'react-redux'
import Header from "../Components/Header";
// Barcode
// import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode, BarcodeType} from "react-native-barcode-scanner-google";
// import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode} from "react-native-barcode-scanner-google";

const BarcodeScanner = Platform.select({
  android: () => require('react-native-barcode-scanner-google').default,
  ios: () => require('react-native-camera').default
})();

import styles from './Styles/ScanPackageScreenStyle'

class ScanPackageScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show : true,
      signature : null,
      dragged : false,
      step : props.navigation.state.params.step,
      partdni : "",
      partname : ""      
    }
  }

  componentDidMount() {
    // this.setState({step:"barcode"})
  }

  onPressingBack = () => {
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

  /////////////////////////////// BARCODE

  // saveScan = () => {
  //   // save to the parent
  //   const { navigation } = this.props;
  //   navigation.state.params.onBarcode(this.state.package);
  // }

  scannedBarCode({data, type}) {
    // this.setState({package: data, step:"signature"}, () => {
    //   this.saveScan();
    // })

    const { navigation } = this.props;
    navigation.state.params.onBarcode(data);

  }

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


//   Platform.OS === 'iso' ? <ScannerComponent
//   ref={cam => this.cameraComponent = cam}
//   style={style}
//   type={cameraType}
//   permissionDialogTitle={permissionDialogTitle}
//   permissionDialogMessage={permissionDialogMessage}
//   onBarCodeRead={onBarcodeRead}
//   onPhoto={onPhoto}
//   barCodeTypes={[Camera.constants.BarCodeType.code128]}>
//   {this.props.children}
// </ScannerComponent>
// :
// <ScannerComponent
//   style={style}
//   onBarcodeRead={onBarcodeRead}
// />

  render () {

    return (

        <View style={styles.container}>

          <Header
            title={this.state.step}
            left={{ icon: "chevron-left", onPress: () => this.onPressingBack() }}
          />

          <View style={styles.content}> 

              <View style={{ flexGrow: 1 }}>

                <BarcodeScanner
                  style={{ flex: 1 }}
                  onBarcodeRead={this.scannedBarCode.bind(this)}
                  onException={this.handleException.bind(this)}
                  // focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
                  // torchMode={TorchMode.ON /* could be the default OFF */}
                  // cameraFillMode={CameraFillMode.FIT /* could also be FIT */}
                  // barcodeType={BarcodeType.ALL /* replace with ALL for all alternatives */}
                  >
                </BarcodeScanner>
              
              </View>

          </View>

        </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanPackageScreen)
