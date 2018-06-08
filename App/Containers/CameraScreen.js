import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
// Styles
// import Camera from 'react-native-camera';
import BarcodeScanner from "react-native-barcode-scanner-google";

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // detail : props.navigation.state.params.detail
    };
    // console.tron.log({screen:'CameraScreen', value: this.state.detail})
  }
  //
  // path
  // assets-library://asset/asset.JPG?id=9842F165-BD05-4D3C-9367-384E9D628D68&ext=JPG
  // mediaUri
  // assets-library://asset/asset.JPG?id=9842F165-BD05-4D3C-9367-384E9D628D68&ext=JPG

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera
      .capture({ metadata: options })
      .then(data => this.goBack(data))
      .catch(err => console.tron.log(err));
  }

  goBack(data) {
    const { navigation } = this.props;
    navigation.goBack();
    // navigation.state.params.onImage(data);
    navigation.state.params.onSign(data);
  }

  scannedBarCode(data, type) {
    const { navigation } = this.props;
    navigation.goBack();
    // navigation.state.params.onImage(data);
    navigation.state.params.onSign(data);
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

      <View style={{ flex: 1 }}>
        <BarcodeScanner
          style={{ flex: 1 }}
          onBarcodeRead={this.scannedBarCode.bind(this)}
          // onBarcodeRead={({ data, type }) => {
          //     // handle your scanned barcodes here!
          //     // as an example, we show an alert:
          //     Alert.alert(
          //         `Barcode '${data}' of type '${type}' was scanned.`
          //     );
          // }}
        />
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
