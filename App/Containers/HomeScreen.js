import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Image, StatusBar, TouchableOpacity } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { connect } from 'react-redux'
// import NavigationBar from 'react-native-navbar';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'

// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      user : {}
    }
  }

  onPressingHojaDeRuta = () => {
    this.props.navigation.navigate('HojaRutaScreen')
  }

  onPressingLogout = () => {
    const { navigation } = this.props
    navigation.state.params.onLogout();
    navigation.navigate('LoginScreen')
  }

  componentDidMount() {
    this.setState({ user : this.props.user })
  }

  render () {

    const { 
      car_id, 
      token, 
      car_first_nm, 
      car_last_nm, 
      mail 
    } = this.state.user

    return (
      <View style={styles.container}>

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#27ae60' }}
          centerComponent={{ text: 'ENVIADO.COM', style: { color: '#27ae60' } }} 
          rightComponent={{ 
            icon: 'sign-out', 
            type: 'font-awesome', 
            color: '#27ae60',
            onPress: () => this.onPressingLogout()
          }}
        />

        <View style={{ alignItems: 'center', padding: 20, flexGrow: 1 }}>


          <Icon
             reverse
             name='ios-contact'
             type='ionicon'
             color='#27ae60'
             size={160}
          />
          
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Text style={styles.nombre}>{car_first_nm } { car_last_nm}</Text>
            <Text style={styles.hoja}>CarID{car_id}</Text>
            <Text style={styles.mail}>{mail}</Text>
          </View>

        </View>

        <View style={{ paddingBottom: 15, paddingLeft: 5, paddingRight: 5}}>
        
          <Button
            raised
            icon={{name: 'road', type:'font-awesome', size: 25}}
            buttonStyle={styles.buttonElement}
            textStyle={{textAlign: 'center'}}
            title={'HOJAS DE RUTA'}
            onPress={() => this.onPressingHojaDeRuta()} 
          />

        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  //console.tron.display({name:'stop_home',value: state}) 
  return {
    user: state.login.payload,
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
