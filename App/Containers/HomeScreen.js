import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import NavigationBar from 'react-native-navbar';
import I18n from 'react-native-i18n'
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

import Charmander from '../Components/Charmander';
import FullButton from '../Components/FullButton';

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      payload : {},
      fetching : false,
      selectedTab: 'profile',
    }
  }

  onPressingRemitos = () => {
    this.props.navigation.navigate('RemitosListScreen')
  }
  onPressingHojaDeRuta = () => {
    this.props.navigation.navigate('HojaRutaScreen', { car_id : this.props.payload.car_id })
  }

  componentWillReceiveProps (newProps) {
    console.tron.log('component')
    console.tron.log({name: 'propspayload', value: newProps })
    //this.setState({ fetching: newProps.fetching, })
  }


  render () {

    const { car_id, token, car_first_nm, car_last_nm, mail } = this.props.payload

    const rightButtonConfig = {
      title: I18n.t('logOut'),
      handler: () => this.props.navigation.navigate('LoginScreen'),
    }

    const titleConfig = {
      title: I18n.t('appName'),
    }

    return (
      <View style={styles.container}>
        
        <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          rightButton={rightButtonConfig}
          leftButton={
            <Charmander
              style={{ marginLeft: 8 }}
              onPress={() => alert('Charmandeeeer!')}/>}
        />
        
        <View style={{ alignItems: 'center', padding: 20, flexGrow: 1 }}>
          {/* <Icon name="user-circle" size={90} /> 
          
          ios-contact
          
          */}

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


        <View style={styles.formContainer}>

          {/* <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5 }}>
              <FullButton text="Datos personales"></FullButton>
          </View> 
          <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
              <FullButton text="Hoja de Ruta" onPress={this.onPressingHojaDeRuta}>

              </FullButton>
          </View> */}

          {/* <TouchableOpacity style={styles.buttonContainer} onPress={this.onPressingHojaDeRuta}>
            <View style={styles.buttonIcon}>
              <Icon
                reverse
                name='md-happy'
                type='ionicon'
                color='#FFF'
                size={60}
              />
              <Text style={styles.buttonText}> DATOS PERSONALES </Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.buttonContainer} onPress={this.onPressingHojaDeRuta}>
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
          </TouchableOpacity>

        </View> 

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.tron.display({screen: "home", value: state})
  return {
    payload: state.login.payload,
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
