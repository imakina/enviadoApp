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

  componentWillReceiveProps (newProps) {
    console.tron.display({name: 'props', value: newProps})
    //this.setState({ fetching: newProps.fetching, })
  }


  render () {

    const { userName, token, grupoID } = this.props.payload

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
          <Text style={styles.information}>Name: {userName}</Text>
          <Text style={styles.information}>Token: {token}</Text>
          <Text style={styles.information}>Grupo:{grupoID}</Text>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity>
            <Text style={styles.bottomBarText}>USUARIO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressingRemitos}>
            <Text style={styles.bottomBarText}>REMITOS</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

{/* <View style={{ padding: 10 }}>
<FullButton text="Remitos" onPress={this.onPressingRemitos}></FullButton>
</View> */}

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
