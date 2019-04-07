import React, { Component } from "react";
import { View, Platform, TextInput, Button, Text, Vibration, } from "react-native";
import PropTypes from "prop-types";

const BarcodeScanner = Platform.select({
  android: () => require('react-native-barcode-scanner-google').default,
  ios: () => require('react-native-camera').default
})();

// if (Platform.OS == 'android') {
  // import { CameraFillMode } from 'react-native-barcode-scanner-google';
// }

const DURATION = 10000 ;
const PATTERN = [ 1000, 2000, 3000, 4000] ;

import MaKitButton from '../Components/MaKitButton'
// import { Colors } from '../Themes';

// Import the react-native-sound module
var Sound = require('react-native-sound');

// keep the screen from going to sleep
import KeepAwake from 'react-native-keep-awake';

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
      this.StartSound();
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

  // sound
  StartSound = () => {

    // Enable playback in silence mode
    Sound.setCategory('Playback');

    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var whoosh = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.tron.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.tron.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.tron.log('successfully finished playing');
        } else {
          console.tron.log('playback failed due to audio decoding errors');
        }
      });
    });

    // // Reduce the volume by half
    // whoosh.setVolume(0.5);

    // // Position the sound to the full right in a stereo field
    // whoosh.setPan(1);

    // // Loop indefinitely until stop() is called
    whoosh.setNumberOfLoops(-1);

    // // Get properties of the player instance
    // console.log('volume: ' + whoosh.getVolume());
    // console.log('pan: ' + whoosh.getPan());
    // console.log('loops: ' + whoosh.getNumberOfLoops());

    // // Seek to a specific point in seconds
    // whoosh.setCurrentTime(2.5);

    // // Get the current playback point in seconds
    // whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));

    // // Pause the sound
    // whoosh.pause();

    // // Stop the sound and rewind to the beginning
    // whoosh.stop(() => {
    //   // Note: If you want to play a sound after stopping and rewinding it,
    //   // it is important to call play() in a callback.
    //   whoosh.play();
    // });

    whoosh.stop();

    // Release the audio player resource
    whoosh.release();
  }

  render() {
    return (

      <View style={{ flex: 1 }}>

        <KeepAwake />

        <BarcodeScanner
          style={{ flex: 1, width: '90%' }}
          onBarcodeRead={this.scannedPackageNumber.bind(this)}
          onException={() => this.handleException}
          cameraFillMode={CameraFillMode.FIT /* could also be FIT */}
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
