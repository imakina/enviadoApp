import React, { Component } from 'react'
import { Text, KeyboardAvoidingView, StatusBar, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'
import AlertActions from '../Redux/AlertRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { Images } from '../Themes'
import { Alert } from 'react-native'

import DebugConfig from '../Config/DebugConfig'

var Spinner = require('react-native-spinkit')

class LoginScreen extends Component {

  // isAttempting = false

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      fetching: false,
      message: '',
      error: false,
      authenticated : false
    }
    // this.isAttempting = false
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    // this.isAttempting = true
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

  componentDidMount() {

    //DEV
    //if (DebugConfig.useFixtures)
    //  this.setState({username:'31922',password:'31922'})

    this.setState({ authenticated : false })
  }

  componentWillReceiveProps (newProps) {

    this.setState({ 
      fetching: newProps.fetching ,
      error: newProps.error,
      message: newProps.message,
      logged: newProps.logged
    })

    // console.tron.log({name:'crp_login_props', value:newProps})
    // console.tron.log({name:'crp_login_state', value:this.state})

    // moving to home if everything is ok
    if (!this.state.authenticated)
      if (newProps.logged)
          if (!newProps.error) {
            // flag to prevent navigate to homescreen many times as vars changed
            this.state.authenticated = true
            this.props.navigation.navigate('HomeScreen')
          }

    //TODO
    //Recuperar el alert en esta func revisando que cambia

    // if (newProps.error && this.isAttempting) {
      // Alert.alert(
      //   'Autenticación',
      //   newProps.message,
      //   // [
      //   //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      //   //   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //   //   {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   // ],
      //   // { cancelable: false }
      // )
    //   this.isAttempting = false
    // }

  }

  render () {

    const { alert } = this.props
    const { fetching } = this.state

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
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.handleChangeUsername}
            onSubmitEditing={()=> this.passwordInput.focus()}
            placeholderTextColor='rgba(255,255,255,0.5)'
            underlineColorAndroid='rgba(255,255,255,0.2)'
          />

          <TextInput
            placeholder='contraseña'
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done"
            secureTextEntry
            onChangeText={this.handleChangePassword}
            ref={(input)=> this.passwordInput = input}
            placeholderTextColor='rgba(255,255,255,0.5)'
            underlineColorAndroid='rgba(255,255,255,0.2)'
          />

        </View>
        
        {
          alert.type === 'alert-danger' &&
            Alert.alert(
              'Error en autenticación',
              alert.message,
              [
                {text: 'OK', onPress: () => this.props.clearAlert()},
              ],
              { cancelable: false }
            )
        }
        <View style={{ paddingBottom: 15, paddingLeft: 5, paddingRight: 5}}>
          <Button
            raised
            icon={{ name: 'sign-in', type: 'font-awesome' }}
            buttonStyle={styles.button}
            textStyle={{ textAlign: 'center' }}
            title="INGRESAR"
            onPress={() => this.handlePressLogin()} 
          />
        </View>

      </KeyboardAvoidingView>

    ) 
  }
}

const mapStateToProps = (state) => {
  //console.tron.display({name:'stop_login',value: state}) 
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    logged : state.login.payload,
    alert: state.alert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    clearAlert: () => dispatch(AlertActions.alertClear())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
