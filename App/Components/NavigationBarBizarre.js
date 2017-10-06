import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'

import styles from './Styles/NavigationBarBizarreStyle'
import { Colors, Metrics } from '../Themes/'

// import I18n from 'react-native-i18n'
import NavigationBar from 'react-native-navbar';

// import Charmander from '../Components/Charmander';
// import FullButton from '../Components/FullButton';

export default class NavigationBarBizarre extends Component {

  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  static propTypes = {
    title: PropTypes.string,
    leftButtonTitle: PropTypes.string,
    rightButtonTitle: PropTypes.string
  }

  render () {

    const rightButtonConfig = {
      title: this.props.rightButtonTitle,
      handler: () => this.props.navigation.navigate('LoginScreen'),
    }

    const leftButtonConfig = {
      title: this.props.leftButtonTitle,
      handler: () => this.props.navigation.navigate('LoginScreen'),
    }

    const titleConfig = {
      title: this.props.title,
      style: { color:Colors.cloud }
    }

    // leftButton={
    //   <Charmander
    //     style={{ marginLeft: 8 }}
    //     onPress={() => alert('Charmandeeeer!')}/>}

    const statusBarConfig = {
        style: 'light-content', 
        hidden: false, 
        tintColor: '#2ecc71'
    }

    const sinleft = false

    return (
      <NavigationBar
        style={styles.navigation}
        title={titleConfig}
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        statusBar={statusBarConfig}
      />
    )
  }
}
