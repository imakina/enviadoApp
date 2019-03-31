import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Styles/maKitSpinnerStyles'
import { Colors } from '../Themes'

//wrapping
var Spinner = require('react-native-spinkit')

export default class MakitSpinner extends Component {

  static defaultProps = { 
    show: false,
    animation: 'ChasingDots',
  }

  static propTypes = {
    animation: PropTypes.string,
    // style: PropTypes.object,
    show: PropTypes.bool,
    inverted : PropTypes.bool
  }

  render () {
    let color = this.props.inverted ? Colors.snow : Colors.background

      return (
        <Spinner
          style={styles.spinner}
          isVisible={this.props.show}
          size={100}
          type={this.props.animation}
          color={color}/>
      )

  }
}
