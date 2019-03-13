import React, { Component } from 'react'
import { View, Text, TextInput, Platform, TouchableOpacity, Vibration, } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Button } from 'react-native-elements'
import SignatureCapture from 'react-native-signature-capture';
import MaKitButton from '../Components/MaKitButton'
import Header from "../Components/Header";
// Barcode
// import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode, BarcodeType} from "react-native-barcode-scanner-google";
// import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode} from "react-native-barcode-scanner-google";

const DURATION = 10000 ;
const PATTERN = [ 1000, 2000, 3000, 4000] ;

const BarcodeScanner = Platform.select({
  android: () => require('react-native-barcode-scanner-google').default,
  ios: () => require('react-native-camera').default
})();
import Camera from 'react-native-camera';

import RNFS from 'react-native-fs'

import styles from './Styles/SignatureScreenStyle'
import { Colors } from '../Themes';

class SignatureScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show : true,
      // data : props.navigation.state.params,
      signature : null,
      dragged : false,
      step : props.navigation.state.params.step,
      partdni : "",
      partname : "",
      packageNumber : ""
    }
  }

  componentDidMount() {
    // this.setState({step:"barcode"})
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  onSigned = () => {
    console.tron.log({name:'saving'})
    this.refs["sign"].saveImage();
  }

  onClean = () => {
    this.setState({ show: false, dragged: false }); 
    setTimeout( () => { this.setState({ show: true }); }, 130);
  }

  _onSaveEvent = (result) => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    // console.tron.log(result);
    console.log("signature", result.encoded);
    this.setState({ 
      signature: result.encoded 
    }, function() {
      // console.tron.log("then")
      const { navigation } = this.props;
      navigation.goBack();
      navigation.state.params.onSign(this.state.signature);
    })
  }

  _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.tron.log("dragged");
    this.setState({ dragged : true})
  }

  saveSign() { this.refs["sign"].saveImage(); }
  resetSign() { this.refs["sign"].resetImage(); }

  /////////////////////////////// PACKAGE

  StartVibrationFunction=()=>{
 
    // Device Will Vibrate for 10 seconds.
    Vibration.vibrate(DURATION) ;
 
    // Android Device Will Vibrate in pattern : Wait 1sec -> vibrate 2sec -> wait 3sec.
    // iOS Device Will Vibrate in pattern : Wait 1sec -> Vibrate -> wait 2sec -> Vibrate -> wait 3sec -> Vibrate
    
    // Vibration.vibrate(PATTERN)
 
 
    // Android Device Will Vibrate in above pattern Infinite Time.
    // iOS Device Will Vibrate in above pattern Infinite Time.
    
    // Vibration.vibrate(PATTERN, true)
 
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
      // Alert.alert(
      //   "Escanear otro paquete ?",
      //   `${data} agregado correctamente`,
      //   [
      //     {
      //       text: "Si, uno mas",
      //       onPress: () => console.log('vamos por uno mas')
      //     },
      //     {
      //       text: "No tengo mas paquetes",
      //       onPress: () => this.goBack(),
      //       style: "cancel"
      //     }
      //   ],
      //   { cancelable: false }
      // );
    })
  }

  saveScanPackage = () => {
    const { navigation } = this.props;
    navigation.state.params.onPackage(this.state.packageNumber);
    this.StopVibrationFunction();
  }

  /////////////////////////////// BARCODE

  saveScan = () => {
    // save to the parent
    const { navigation } = this.props;
    navigation.state.params.onBarcode(this.state.dni);
  }

  scannedBarCode({data, type}) {
    this.setState({dni: data, step:"signature"}, () => {
      this.saveScan();
    })
  }

  handleChangeDni = (text) => {
    this.setState({ partdni: text })
  }

  handleChangeName = (text) => {
    this.setState({ partname: text })
  }

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
    this.setState({error:exception})
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera
      .capture({ metadata: options })
      .then(data => {

        let base64Img = data.path;
        RNFS.readFile( base64Img, 'base64' )
          .then( res => { 
            
            //this.setState( { uri: res } )
            const { navigation } = this.props;
            navigation.goBack();
            console.log(res);
            navigation.state.params.onCapture(res); 
        
          }
        )
        // this.goBack(data)
      })
      .catch(err => console.tron.log(err));
  }


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

    const headerTitle = (this.state.step == 'package')?`SCAN   ${this.props.packages.packages.length} / ${this.props.packages.legacy.length}`:this.state.step;  

    return (

      this.state.step == "capture" ?

        <View style={styles.camera}>
          <Camera 
              style={styles.preview}
              ref={cam => this.camera=cam}
              aspect={Camera.constants.Aspect.fit}
              captureQuality={Camera.constants.CaptureQuality.low}>

              <TouchableOpacity style={styles.capture}>
                <Icon
                  name="camera"
                  type="font-awesome"
                  color="white"
                  size={30}
                  onPress={() => this.takePicture()}
                />
              </TouchableOpacity>

          </Camera>
        </View>

      :

        <View style={styles.container}>

          <Header
            // title={this.state.step}
            title={headerTitle}
            left={{ icon: "chevron-left", onPress: () => this.goBack() }}
          />

          <View style={styles.content}> 

            { this.state.step === "barcode" &&
            // Barcode

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
              
                <View style={{flexDirection:'row', display:'flex', paddingBottom: 10}}>
                  <View style={{width:'70%'}}>
                    <TextInput
                      placeholder='Ingrese Numero DNI'
                      keyboardType="numeric"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={this.handleChangeDni}
                      onSubmitEditing={()=> this.nameInput.focus()}
                    />
                    <TextInput
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
        
                {/* <Text style={{padding:10}}>Leido : {this.state.dni}</Text> */}

              </View>

            }

            { this.state.step === "signature" &&
            // Signature

              <View style={{ flexGrow: 1 }}>
              
                <View style={{padding: 5}}>
                  <Text style={{fontSize: 17, textAlign: 'center'}}>{"DNI: "}{this.state.dni}</Text>
                </View>

                { this.state.show ? 

                  <SignatureCapture
                    style={[{flex:1},styles.pad]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}
                  />
                    
                :

                  <View style={styles.padbrush}> 
                    <Icon
                      name='round-brush'
                      type='entypo'
                      size={120}
                      color= '#ff4f00' />
                  </View> 

                }

                <View style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>

                  <View style={{paddingBottom: 10}}>
                    <MaKitButton
                      disabled={!this.state.dragged}
                      icon={{ name: 'check', type: 'font-awesome' }}
                      text={'Recibido'}
                      onPress={() => this.onSigned()} 
                    />
                  </View>

                  <MaKitButton
                    type={'ko'}
                    icon={{ name: 'round-brush', type: 'entypo' }}
                    text={'Limpiar'}
                    onPress={() => this.onClean()} 
                  />

                </View>

              </View>

            }

            { this.state.step === "package" &&
            // Package

              <View style={{ flexGrow: 1 }}>

                <BarcodeScanner
                  style={{ flex: 1 }}
                  onBarcodeRead={this.scannedPackageNumber.bind(this)}
                  onException={this.handleException.bind(this)}
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
                      // onSubmitEditing={()=> this.nameInput.focus()}
                    />
                  </View>
                  <Button
                    disabled={!(this.state.packageNumber.length > 0)}
                    icon={{ name: 'check', type: 'font-awesome' }}
                    title={'OK'}
                    onPress={() => this.handleSavePackage()}
                    buttonStyle={{marginTop:3, backgroundColor:Colors.facebook}} 
                  />
                </View>
                <View style={{alignItems:'center'}}>
                  {/* <Text>Ultimo scan : {this.props.packages.last_package}</Text> */}
                  <Text>Ultimo scan : {this.state.packageNumber}</Text>
                  <Text style={{fontSize:30}}>Escaneados : {this.props.packages.packages.length} de {this.props.packages.legacy.length}  </Text>
                </View>

              </View>

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
