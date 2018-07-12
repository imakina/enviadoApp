import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
// Styles
// import Camera from 'react-native-camera';
import BarcodeScanner, {FocusMode, TorchMode, CameraFillMode, BarcodeType} from "react-native-barcode-scanner-google";
import ButtonIcon from '../Components/ButtonIcon'

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan : true,
      dni : ""
      // detail : props.navigation.state.params.detail
    };
    // console.tron.log({screen:'CameraScreen', value: this.state.detail})
  }
  //
  // path
  // assets-library://asset/asset.JPG?id=9842F165-BD05-4D3C-9367-384E9D628D68&ext=JPG
  // mediaUri
  // assets-library://asset/asset.JPG?id=9842F165-BD05-4D3C-9367-384E9D628D68&ext=JPG

  // takePicture() {
  //   const options = {};
  //   //options.location = ...
  //   this.camera
  //     .capture({ metadata: options })
  //     .then(data => this.goBack(data))
  //     .catch(err => console.tron.log(err));
  // }

  componentDidMount() {
    this.setState({scan:true});
  }

  goBack = (data) => {

    this.setState({ 
      scan : false 
    })

    const { navigation } = this.props;
    navigation.goBack();
    // navigation.state.params.onImage(data);
    navigation.state.params.onBarcode(data);
  }

  scannedBarCode({data, type}) {

    this.setState({ 
      dni: data, 
      scan : false 
    })
    //
    const { navigation } = this.props;
    // navigation.goBack();
    // navigation.state.params.onImage(data);
    // navigation.state.params.onSign(data);
    navigation.state.params.onBarcode(data);
    //
    // umount the component to prevent future
    // scannings
  }

  handleChangeDni = (text) => {
    this.setState({ dni: text })
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
      // <View style={styles.container}>
      //     <Camera style={styles.preview}
      //             ref={cam => this.camera=cam}
      //             aspect={Camera.constants.Aspect.fit}
      //             captureQuality={Camera.constants.CaptureQuality.low}>
      //             <Text style={styles.capture} onPress={this.takePicture.bind(this)}>CAPTURE</Text>
      //             <Text style={styles.exit} onPress={this.goBack.bind(this)}>GOBACK</Text>
      //     </Camera>
      // </View>

      <View style={{ flexGrow: 1 }}>
      { this.state.scan &&
        <BarcodeScanner
          style={{ flex: 1 }}
          onBarcodeRead={this.scannedBarCode.bind(this)}
          onException={this.handleException.bind(this)}
          focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
          torchMode={TorchMode.ON /* could be the default OFF */}
          cameraFillMode={
            CameraFillMode.COVER /* could also be FIT */
          }
          barcodeType={
            BarcodeType.ALL /* replace with ALL for all alternatives */
          }
                    
          // onBarcodeRead={({ data, type }) => {
          //     // handle your scanned barcodes here!
          //     // as an example, we show an alert:
          //     Alert.alert(
          //         `Barcode '${data}' of type '${type}' was scanned.`
          //     );
          // }}
          >
        </BarcodeScanner>
      }
        <View style={{flexDirection:'row', display:'flex', paddingBottom: 10}}>
          <View style={{width:'70%'}}>
            <TextInput
              ref='dni'
              placeholder='inserte dni manualmente'
              // returnKeyType="next"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleChangeDni}
              // onSubmitEditing={()=> this.passwordInput.focus()}
              // placeholderTextColor='rgba(255,255,255,0.5)'
              // underlineColorAndroid='rgba(255,255,255,0.2)'
            />
          </View>
            <ButtonIcon
              disabled={!this.state.dni != ""}
              icon={{ name: 'check', type: 'font-awesome' }}
              text={'OK'}
              onPress={() => this.goBack()} 
            />
        </View>

        <Text style={{padding:10}}>Leido : {this.state.dni}</Text>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraScreen);
