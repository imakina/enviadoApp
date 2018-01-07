import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Header } from 'react-native-elements'
import SignatureCapture from 'react-native-signature-capture';
import ButtonIcon from '../Components/ButtonIcon'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// var SignaturePad = require('react-native-signature-pad');
// Styles
import styles from './Styles/SignatureScreenStyle'

class SignatureScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show : true,
      // data : props.navigation.state.params,
      signature : null,
      dragged : false
    }
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

  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    this.refs["sign"].resetImage();
  }

  render () {

    return (

      <View style={styles.container}>

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'FIRMA', style: { color: '#27ae60' } }} 
          leftComponent={{ 
            icon: 'chevron-left',
            color: '#27ae60',
            onPress: () => this.onPressingBack()
          }}
        />

        <View style={{
          flex: 1, 
          alignContent: 'center',
          padding: 20,
          backgroundColor: '#F5F5F5'
          }}> 


         { this.state.show ? 

            // <SignaturePad 
            //   onError={this._signaturePadError}
            //   onChange={this._signaturePadChange}
            //   style={styles.pad}
            // >
            // </SignaturePad>

            <SignatureCapture
              style={[{flex:1},styles.pad]}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"} />

          :

            <View style={{backgroundColor: 'white', flex: 1, alignContent: 'center', padding: 90}}> 
              
              <Icon
                name='round-brush'
                type='entypo'
                size={120}
                color= '#ff4f00' />

            </View> 

          }

        </View>

        <View style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
        
          {/* <Button
            disabled={!this.state.dragged}
            raised
            icon={{name: 'check', type: 'font-awesome' }}
            buttonStyle={styles.buttonElementOK}
            textStyle={{textAlign: 'center'}}
            title={'Recibido'}
            onPress={() => this.onSigned()} 
            />

          <Button
            raised
            icon={{name: 'round-brush', type: 'entypo' }}
            buttonStyle={styles.buttonElementKO}
            textStyle={{textAlign: 'center'}}
            title={'Limpiar'}
            onPress={() => this.onClean()} 
            />
         */}

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
