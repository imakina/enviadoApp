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

    }
  }

  onPressingBack = () => {
    this.props.navigation.navigate('RemitosListScreen')
  }

  _signaturePadError = (error) => {
    console.error(error);
  }

  _signaturePadChange = ({base64DataUrl}) => {
    console.log("Got new signature: " + base64DataUrl);
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

        <View style={{flex: 1}}>
            <SignaturePad onError={this._signaturePadError}
                          onChange={this._signaturePadChange}
                          style={{flex: 1, backgroundColor: 'white'}}/>
        </View>

        <View style={{ paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
        
          <Button
            raised
            icon={{name: 'check', type: 'font-awesome' }}
            buttonStyle={styles.buttonElement}
            textStyle={{textAlign: 'center'}}
            title={'Recibido'}
            onPress={() => this.onPressingBack()} 
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
