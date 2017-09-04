import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CameraScreenStyle'

// import { Screen, Button, Text } from '@shoutem/ui';
import Camera from 'react-native-camera';

class CameraScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detail : props.navigation.state.params.detail
    }
    console.tron.log({screen:'CameraScreen', value: this.state.detail})
  }
  //
  // path
  // assets-library://asset/asset.JPG?id=9842F165-BD05-4D3C-9367-384E9D628D68&ext=JPG
  // mediaUri
  // assets-library://asset/asset.JPG?id=9842F165-BD05-4D3C-9367-384E9D628D68&ext=JPG

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.tron.log(data))
      .catch(err => console.tron.log(err));
  }

  goBack() {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
          <Camera style={styles.preview}
                  ref={cam => this.camera=cam}
                  aspect={Camera.constants.Aspect.fit}
                  captureQuality={Camera.constants.CaptureQuality.low}>
                  <Text style={styles.capture} onPress={this.takePicture.bind(this)}>CAPTURE</Text>
                  <Text style={styles.exit} onPress={this.goBack.bind(this)}>GOBACK</Text>
          </Camera>
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

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)
