import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button, Header } from 'react-native-elements'
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
    this.props.navigation.navigate('RemitoScreen')
  }

  onSigned = () => {
    //console.tron.log(this.state.data)
    let dataplus={...this.state.data};
    //console.tron.log(dataplus)
    dataplus.firma  = this.state.signature
    dataplus.firma = dataplus.firma.replace('data:image/png;base64,','')
    console.tron.log({name:'signature',value:dataplus})
    this.props.navigation.navigate('RemitoScreen', {signature:dataplus} )
  }

  onClean = () => {
    console.tron.log('cleaning')
    this.setState({ show: false }); 
    console.tron.log('changed false')
    console.tron.log(this.state.show)
    setTimeout( () => { this.setState({ show: true }); }, 10000);
    console.tron.log('after')
  }

  _signaturePadError = (error) => {
    console.tron.log(error);
  }

  _signaturePadChange = ({base64DataUrl}) => {
    this.setState({signature: base64DataUrl})
    //console.tron.log({name:"Got new signature: ", value:base64DataUrl});
  }

  // {this.state.show ?    
    
  //                 <SignaturePad onError={this._signaturePadError}
  //                             onChange={this._signaturePadChange}
  //                             style={{flex: 1, backgroundColor: 'white'}}/>
    
  //               :
                
  //                 null
                
  //               }

  render () {

    const show = this.state

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

        <View style={{flex: 1}}> 

          { show ? 
          
              <SignaturePad onError={this._signaturePadError}
                          onChange={this._signaturePadChange}
                          style={{flex: 1, backgroundColor: 'white'}}/>
          
          :

              <View style={{backgroundColor: '#F5F5F5', width: '90%', height: '90%'}}> 
                  <Text> Limpiando </Text> 
              </View> 

          }

        </View>

        <View style={{ paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
        
          <Button
            raised
            icon={{name: 'check', type: 'font-awesome' }}
            buttonStyle={styles.buttonElementOK}
            textStyle={{textAlign: 'center'}}
            title={'Recibido'}
            onPress={() => this.onSigned()} 
          />

          <Button
            raised
            icon={{name: 'rocket', type: 'font-awesome' }}
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
