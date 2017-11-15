import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Header } from 'react-native-elements'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
var SignaturePad = require('react-native-signature-pad');
// Styles
import styles from './Styles/SignatureScreenStyle'

class SignatureScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show : true,
      data : props.navigation.state.params,
      signature : null
    }
     //console.tron.log({name:'state', value: props.navigation.state.params})
  }

  onPressingBack = () => {
    this.props.navigation.goBack()
  }

  onSigned = () => {
    console.tron.log({name:'cleaning'})
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSign(this.state.signature);

    // //console.tron.log(this.state.data)
    // let dataplus={...this.state.data};
    // //console.tron.log(dataplus)
    // dataplus.firma  = this.state.signature
    // //dataplus.firma = dataplus.firma.replace('data:image/png;base64,','')
    // console.tron.log({name:'signatureGoTo',value:dataplus})
    // this.props.navigation.goBack({ signature : dataplus } )
  }

  onClean = () => {
    this.setState({ show: false }); 
    setTimeout( () => { this.setState({ show: true }); }, 130);
  }

  _signaturePadError = (error) => {
    console.tron.log(error);
  }

  _signaturePadChange = ({base64DataUrl}) => {
    this.setState({ signature: base64DataUrl.replace('data:image/png;base64,','') })
    console.tron.log({name:"Got new signature: ", value:this.state.signature});
    //this.setState({ signature: base64DataUrl })
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

            <SignaturePad 
              onError={this._signaturePadError}
              onChange={this._signaturePadChange}
              style={styles.pad}
            >
            </SignaturePad>

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

        <View style={{ paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
        
          <Button
            disabled={this.state.signature == null}
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
