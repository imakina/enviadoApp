import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import NavigationBar from 'react-native-navbar';
import I18n from 'react-native-i18n'

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
  onPressingMapaDeRuta = () => {
    this.props.navigation.navigate('HojaRutaScreen')
  }

  componentWillReceiveProps (newProps) {
    console.tron.log('component')
    console.tron.log({name: 'propspayload', value: newProps })
    //this.setState({ fetching: newProps.fetching, })
  }


  render () {

    const { car_id, token, mail } = this.props.payload

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
        
        <View style={{ flexGrow: 1, padding: 10 }}>
          <Text style={styles.titleWelcome}>{I18n.t('welcome')}</Text>
          <Text style={styles.information}>Idioma:{I18n.defaultLocale}</Text>
          <Text style={styles.information}>CarID: {car_id}</Text>
          <Text style={styles.information}>Token: {token}</Text>
          <Text style={styles.information}>Grupo:{mail}</Text>
        </View>

        <View style={{ padding: 10 }}>
            <FullButton text="Remitos" onPress={this.onPressingRemitos}></FullButton>
        </View> 

        <View style={{ padding: 10 }}>
            <FullButton text="Mapa de Ruta" onPress={this.onPressingMapaDeRuta}></FullButton>
        </View> 

        <View style={{ flexGrow: 1, padding: 10 }}>
          <TouchableOpacity>
            <Text style={styles.bottomBarText}>Hojas de Ruta</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.bottomBarText}>Salir</Text>
          </TouchableOpacity>
        </View>

 

      </View>
    )
  }
}

{/* <View style={{ padding: 10 }}>
<FullButton text="Remitos" onPress={this.onPressingRemitos}></FullButton>
</View> 

        <View style={styles.bottomBar}>
          <TouchableOpacity>
            <Text style={styles.bottomBarText}>USUARIO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressingRemitos}>
            <Text style={styles.bottomBarText}>REMITOS</Text>
          </TouchableOpacity>
        </View>
*/}

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
