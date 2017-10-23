import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Image, StatusBar, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import NavigationBar from 'react-native-navbar';
import I18n from 'react-native-i18n';
// import NavigationBarBizarre from '../Components/NavigationBarBizarre';

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
    // this.props.navigation.navigate('HojaRutaScreen', { car_id : this.props.user.car_id })
    this.props.navigation.navigate('HojaRutaScreen')
  }

  render () {

    const { 
      car_id, 
      token, 
      car_first_nm, 
      car_last_nm, 
      mail 
    } = this.props.user

    // ===========================
    // NavigationBar
    const rightButtonConfig = {
      title: I18n.t('logOut'),
      handler: () => this.props.navigation.navigate('LoginScreen'),
    }

    const titleConfig = {
      title: I18n.t('appName'),
      style: {color:'#FFF'}
    }

    const statusBarConfig = {
        style: 'light-content', 
        hidden: false, 
        tintColor: '#2ecc71'
    }
    // ===========================

    return (
      <View style={styles.container}>

         <NavigationBar
            style={styles.navigation}
            title={titleConfig}
            rightButton={rightButtonConfig}
            statusBar={statusBarConfig}
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
            <Text style={styles.information}>{car_first_nm } { car_last_nm}</Text>
            <Text style={styles.information}>{mail}</Text>
            <Text style={styles.information}>CarID {car_id}</Text>
          </View>

        </View>

        {/* <View style={styles.buttonContainer}> */}

          <Button
            raised
            large
            icon={{name: 'directions-car', size: 40}}
            buttonStyle={styles.buttonElement}
            textStyle={{textAlign: 'center'}}
            title={'HOJAS DE RUTA'}
            onPress={() => this.onPressingHojaDeRuta()} 
          />

        {/* </View>  */}

      </View>
    )
  }
}

{/* <TouchableOpacity style={styles.buttonContainer} onPress={this.onPressingHojaDeRuta}>
<View style={styles.buttonIcon}>
  <Icon
    reverse
    name='md-car'
    type='ionicon'
    color='#FFF'
    size={60}
  />
  <Text style={styles.buttonText}> HOJAS DE RUTA</Text>
</View>
</TouchableOpacity> */}

const mapStateToProps = (state) => {
  //console.tron.display({screen: "home", value: state})
  return {
    user: state.login.payload,
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
