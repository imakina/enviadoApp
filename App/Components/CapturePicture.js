import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";

import PropTypes from "prop-types";
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs'

import styles from "./Styles/CaptureStyles";

export default class CapturePicture extends Component {

  static defaultProps = { }

  static propTypes = {
    onCapture: PropTypes.func,
    // text: PropTypes.string,
    // type: PropTypes.string,
    // icon: PropTypes.object,
    // disabled: PropTypes.bool,
    // style: PropTypes.object
  };

  onPressCameraSuccess = (data) => {
    let base64Img = data.path;
    RNFS.readFile(base64Img, 'base64')
      .then(res => { 
        // const { navigation } = this.props;
        // navigation.goBack();
        // console.tron.log({picture:res});
        // navigation.state.params.onCapture(res); 
        this.props.onCapture(res);
      })
  }

  onPressCamera = () => {
    const options = {};
    //options.location = ...
    this.camera
      .capture({ metadata: options })
      .then(data => this.onPressCameraSuccess)
      .catch(err => console.tron.log(err));
  }

  render() {
    return (
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
                onPress={() => this.onPressCamera()}
              />
            </TouchableOpacity>

        </Camera>
      </View>
    );
  }
}
