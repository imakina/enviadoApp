import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/ButtonIconStyles'
import { Icon } from 'react-native-elements'

export default class ButtonIcon extends Component {
  
    static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string,
    // children: PropTypes.string,
    // navigator: PropTypes.object,
    icon : PropTypes.object,
  }

//   getText () {
//     const buttonText = this.props.text || this.props.children || ''
//     return buttonText.toUpperCase()
//   }

    kindOfButton() {

        switch(this.props.type) {
        case 'alert':
            return styles.kindAlert
        default:
            return styles.kindNormal
        }
    }

  render () {

    console.tron.log(this.props.icon)

    return (
      <TouchableOpacity 
            style={[styles.button, this.kindOfButton()]} 
            onPress={this.props.onPress}>
        <Icon
            name={this.props.icon.name}
            type={this.props.icon.type}
            style={styles.icon}
            iconStyle={styles.iconText}>
        </Icon>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}
