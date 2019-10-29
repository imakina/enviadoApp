import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Icon, Button } from 'react-native-elements'
import SignatureCapture from 'react-native-signature-capture';
//Components
import MaKitButton from '../Components/MaKitButton'
//Styles
import styles from "./Styles/CaptureStyles";

export default class CaptureSignature extends Component {

  static defaultProps = { }

  static propTypes = {
    onPad: PropTypes.func,
    dni: PropTypes.string
    // text: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      // dni : ""
    }
  }

  componentDidMount() {
    this.onClean();
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
      // const { navigation } = this.props;
      // navigation.goBack();
      // navigation.state.params.onSign(this.state.signature);
      this.props.onPad(this.state.signature);
    })
  }

  _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.tron.log("dragged");
    this.setState({ dragged : true })
  }

  saveSign() { this.refs["sign"].saveImage(); }
  resetSign() { this.refs["sign"].resetImage(); }

  render() {
    return (

      <View style={{ flexGrow: 1 }}>
              
        <View style={{padding: 5}}>
          <Text style={{fontSize: 17, textAlign: 'center'}}>
            {"DNI: "}{this.props.dni}
          </Text>
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
    );
  }
}
