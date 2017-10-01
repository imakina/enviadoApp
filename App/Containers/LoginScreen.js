import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, StatusBar, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { Images } from '../Themes'
import { Alert } from 'react-native'

var Spinner = require('react-native-spinkit')

class LoginScreen extends Component {

  // isAttempting = false

  constructor (props) {
    super(props)
    this.state = {
      username: '0',
      password: '',
      fetching: false,
      message: '',
      error: false
    }
    //this.isAttempting = false
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    //this.isAttempting = true
    this.state.fetching = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  componentWillReceiveProps (newProps) {

    this.setState({ 
      fetching: newProps.fetching ,
      error: newProps.error,
      message: newProps.message 
    })
    //console.tron.display(this.state)

    if (newProps.error) {
      Alert.alert(
        'Autenticación',
        newProps.message,
        // [
        //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        //   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //   {text: 'OK', onPress: () => console.log('OK Pressed')},
        // ],
        // { cancelable: false }
      )
    }
    // } else if (this.isAttemping) {
    //   this.props.navigation.navigate('HomeScreen')      
    // }
  }

  render () {

    const { fetching } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

        <StatusBar barStyle="light-content" />

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={Images.logo}
            />
        </View>

        <View style={styles.spinnerContainer}>
        { fetching && (
          <Spinner
            style={styles.spinner}
            isVisible={true}
            size={100}
            type={'ChasingDots'}
            color={'white'}/>
        )}
        </View>

        <View style={styles.formContainer}>

          <TextInput
            ref='username'
            placeholder='usuario'
            style={styles.input}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.handleChangeUsername}
            onSubmitEditing={()=> this.passwordInput.focus()}
            placeholderTextColor='rgba(255,255,255,0.5)'/>

          <TextInput
            placeholder='contraseña'
            style={styles.input}
            returnKeyType="done"
            secureTextEntry
            onChangeText={this.handleChangePassword}
            ref={(input)=> this.passwordInput = input}
            placeholderTextColor='rgba(255,255,255,0.5)'
            />

            <TouchableOpacity style={styles.buttonContainer} onPress={this.handlePressLogin}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    )
  }
}

const mapStateToProps = (state) => {
  // console.tron.log('loginScreen')
  // console.tron.display({value: state})
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    message: state.login.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
