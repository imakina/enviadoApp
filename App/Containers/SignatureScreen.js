import React, { Component } from 'react'
import { View, Text, TextInput, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import SignatureCapture from 'react-native-signature-capture';
import ButtonIcon from '../Components/ButtonIcon'
import Header from "../Components/Header";
// Barcode
// import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode, BarcodeType} from "react-native-barcode-scanner-google";
// import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode} from "react-native-barcode-scanner-google";

const BarcodeScanner = Platform.select({
  android: () => require('react-native-barcode-scanner-google').default,
  ios: () => require('react-native-camera').default
})();
import Camera from 'react-native-camera';

import RNFS from 'react-native-fs'

import styles from './Styles/SignatureScreenStyle'

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
      partname : ""
    }
  }

  componentDidMount() {
    // this.setState({step:"barcode"})
  }

  onPressingBack = () => {
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
            title={this.state.step}
            left={{ icon: "chevron-left", onPress: () => this.onPressingBack() }}
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
                  <ButtonIcon
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
                    <ButtonIcon
                      disabled={!this.state.dragged}
                      icon={{ name: 'check', type: 'font-awesome' }}
                      text={'Recibido'}
                      onPress={() => this.onSigned()} 
                    />
                  </View>

                  <ButtonIcon
                    type={'ko'}
                    icon={{ name: 'round-brush', type: 'entypo' }}
                    text={'Limpiar'}
                    onPress={() => this.onClean()} 
                  />

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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureScreen)
