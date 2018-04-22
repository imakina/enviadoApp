import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import styles from './Styles/SpinnerStyle'

var SpinKit = require('react-native-spinkit')

import { Colors } from '../Themes'

export default class Spinner extends Component {

  render() {
    return (
      <View style={styles.container}>
        <SpinKit
          style={styles.spinner}
          isVisible={true}
          size={100}
          type={'9CubeGrid'}
          color={Colors.background} />
      </View>
    )
  }
}
