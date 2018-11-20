import React, { Component } from 'react'
import { 
  Text, 
  KeyboardAvoidingView, 
  StatusBar, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  Alert } from 'react-native'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import { Button, CheckBox } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'
import AlertActions from '../Redux/AlertRedux'
import ButtonIcon from '../Components/ButtonIcon'

// Styles
import styles from './Styles/LoginScreenStyle'
import { Images, Colors } from '../Themes'

// import DebugConfig from '../Config/DebugConfig'

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
      authenticated : false,
      saveasync : true,
    }
    // this.isAttempting = false
  }

  handlePressLogin = () => {
    // waiting for login
    this.setState({fetching:true})
    const { username, password, saveasync } = this.state
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password, saveasync)
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleSavePassword = () => {
    console.tron.display({name:'checkboxChanged', value:this.state.saveasync})
    this.setState({ saveasync: !this.state.saveasync })
    // whenever the user change your mind, the store need to be cleaned
    // this.onLogout()
  }

  componentDidMount() {
    //DEV
    //if (DebugConfig.useFixtures)
    //this.setState({username:'31922',password:'31922'})
    this.setState({ authenticated : false })

    // AsyncStorage.multiGet(['expire','username','password']).then((data) => {
    //   if (data[0][1]) {
    //     // username = data[0][1]
    //     // password = data[0][2]
    //     // console.tron.log("retrieve from async storage")
    //     // console.tron.log({name:'async',value:username})
    //     // console.tron.log({name:'async',value:password})
    //     // this.props.attemptLogin(username, password)
    //     console.tron.display({name:'date',value:data})
    //     this.setState({
    //       username : data[0][2],
    //       password : data[0][3]
    //     }, this.handlePressLogin())
    //   }
    // })
  }

  // onLogout() {
  //   // AsyncStorage.multiRemove(['expire','username','password','account'])
  //   this.props.logout()
  // }

  componentWillReceiveProps (newProps) {

    this.setState({ 
      fetching: newProps.fetching ,
      error: newProps.error,
      message: newProps.message,
      logged: newProps.account
    })

    // console.tron.log({name:'crp_login_props', value:newProps})
    // console.tron.log({name:'crp_login_state', value:this.state})

    // deprecated, moved to saga
    // moving to home if everything is ok
    // if (!this.state.authenticated)
    //   if (newProps.account)
    //       if (!newProps.error) {
    //         // save to storage the user preference
    //         // console.tron.log(newProps.logged)
    //         // if (this.state.saveasync) {
    //         //   console.tron.log("saving to async storage")
    //         //   AsyncStorage.multiSet([
    //         //     ['expire', Date.now().toString()],
    //         //     ['username', newProps.logged.car_id.toString()],
    //         //     ['password', newProps.logged.pass.toString()],
    //         //   ])
    //         // } 
    //         // flag to prevent navigate to homescreen many times as vars changed
    //         this.state.authenticated = true
    //         this.props.navigation.navigate('HomeScreen', { onLogout : this.onLogout })
    //       }

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
            keyboardType="numeric"
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
            returnKeyType="next"
            keyboardType="numeric"
            secureTextEntry
            onChangeText={this.handleChangePassword}
            ref={(input)=> this.passwordInput = input}
            placeholderTextColor='rgba(255,255,255,0.5)'
            underlineColorAndroid='rgba(255,255,255,0.2)'
          />

          {/* <CheckBox
            checked={this.state.saveasync}
            checkedColor='white'
            title="Recordarme"
            onIconPress={this.handleSavePassword}
            onPress={this.handleSavePassword}
            style={styles.checkbox}
            textStyle={styles.checkboxTitle}
            fontFamily="RalewayRegular"
          > 
            <Text> La la la la </Text>
          </CheckBox> */}
          <View style={styles.rememberme}>

            <Text style={styles.rememberText}> Recordarme </Text>
            <View style={styles.rememberCheck}>
              <Text style={styles.rememberCheckText}>{this.state.saveasync?" SI ":" NO "}</Text>
              <Switch
                  value={this.state.saveasync}
                  onValueChange={this.handleSavePassword}
                  disabled={false}
                  // activeText={'Yes'} 
                  // inActiveText={'Off'}
                  // circleSize={30}
                  // barHeight={1}
                  // circleBorderWidth={3}
                  // backgroundActive={Colors.snow}
                  // backgroundInactive={Colors.silver}
                  // circleActiveColor={Colors.bloodOrange}
                  // circleInActiveColor={'#000000'}
                  onTintColor={Colors.backgroundVariant}
                />
            </View>

          </View>

          <ButtonIcon
            icon={{ name: 'sign-in', type: 'font-awesome' }}
            text="INGRESAR"
            onPress={() => this.handlePressLogin()} 
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

        {/* <View style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 5, paddingRight: 5}}>
          <Button
            raised
            icon={{ name: 'sign-in', type: 'font-awesome' }}
            buttonStyle={styles.button}
            textStyle={{ textAlign: 'center' }}
            title="INGRESAR"
            onPress={() => this.handlePressLogin()} 
          />
        </View> */}

        {/* <View style={[styles.formContainer, {marginBottom: 20}]}>

        </View> */}

      </KeyboardAvoidingView>

    ) 
  }
}

const mapStateToProps = (state) => {
  //console.tron.display({name:'stop_login',value: state}) 
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    account : state.login.account,
    alert: state.alert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password, saveasync) => dispatch(LoginActions.loginRequest(username, password, saveasync)),
    // logout: () => dispatch(LoginActions.logout()),
    clearAlert: () => dispatch(AlertActions.alertClear())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
