import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { View } from 'react-native'
// import styles from './Styles/SearchBarStyles'
import { Colors } from '../Themes/'
import { Header as RNE } from 'react-native-elements'

export default class Header extends Component {

  static propTypes = {
    onPressLeft: PropTypes.func,
    onPressRight: PropTypes.func,
    title: PropTypes.string
  }

  render () {

    const centerComponent = {
        text: this.props.title, 
        style: { color: Colors.background } 
    }

    const leftComponent = {
        icon: 'chevron-left',
        color: Colors.background,
        onPress: onPressRight()
    }

    const rightComponent = {
        icon: 'refresh', 
        color: Colors.background,
        onPress: onPressRight()
    }

    return (
        <RNE
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#27ae60' }}
          centerComponent={{ text: 'ENVIADO.COM', style: { color: '#27ae60' } }} 
          rightComponent={{ 
            icon: 'sign-out', 
            type: 'font-awesome', 
            color: '#27ae60',
            // onPress: () => this.onPressingLogout()
          }}
        />
    )

  }
}
