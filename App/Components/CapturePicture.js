import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from 'react-native-elements'

import PropTypes from "prop-types";
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs'

import styles from "./Styles/CaptureStyles";

export default class CapturePicture extends Component {

  static defaultProps = { }

  constructor(props) {
    super(props);
    this.state = {
      status : '',
    }
  }

  static propTypes = {
    onCapture: PropTypes.func,
    // text: PropTypes.string,
    // type: PropTypes.string,
    // icon: PropTypes.object,
    // disabled: PropTypes.bool,
    // style: PropTypes.object
  };

  onPressCameraSuccess = (data) => {
    let base64Img = data.uri;
    // let base64Img = data.path;
    // this.setState({status:'base64'})
    RNFS.readFile(base64Img, 'base64')
      .then(res => { 
        // const { navigation } = this.props;
        // navigation.goBack();
        // console.tron.log({picture:res});
        // navigation.state.params.onCapture(res); 
        // this.setState({status:res})
        this.props.onCapture(res);
      })
  }

  // onPressCamera = () => {
  //   const options = {};
  //   //options.location = ...
  //   this.camera
  //     .capture({ metadata: options })
  //     .then(data => this.onPressCameraSuccess)
  //     .catch(err => console.tron.log(err));
  // }

  onPressCamera = async () => {
    try {
      this.setState({status:'Capturando ...'})
      const options = { quality: 0.5 };
      const data = await this.camera.takePictureAsync(options);
      console.log('Path to image: ' + data.uri);
      this.setState({status:'Guardando ...'})
      this.onPressCameraSuccess(data);
      // this.setState({status:'after'})

    } catch (err) {
      // console.log('err: ', err);
    }
  };

  render() {
    return (
      <View style={styles.camera}>
        <RNCamera 
            style={styles.preview}
            // aspect={Camera.constants.Aspect.fit}
            // captureQuality={Camera.constants.CaptureQuality.low}
            ref={cam => this.camera=cam}>
              <Text style={{color: 'white', fontSize: 18}}>{this.state.status}</Text>

            <TouchableOpacity style={styles.capture}>
              <Icon
                name="camera"
                type="font-awesome"
                color="white"
                size={30}
                onPress={() => this.onPressCamera()}
              />
            </TouchableOpacity>

        </RNCamera>
      </View>
    );
  }
}
