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
    disabled: PropTypes.bool
  }

//   getText () {
//     const buttonText = this.props.text || this.props.children || ''
//     return buttonText.toUpperCase()
//   }

    kindOfButton() {

        if (this.props.disabled)
            return styles.disabled

        switch(this.props.type) {
        case 'alert':
            return styles.kindAlert
        case 'ko':
            return styles.kindKO
        default:
            return styles.kindNormal
        }
    }

  render () {

    return (
      <TouchableOpacity
            disabled={this.props.disabled}
            style={[styles.button, this.kindOfButton()]} 
            onPress={this.props.onPress}>
        <Icon
            name={this.props.icon.name}
            type={this.props.icon.type}
            style={styles.icon}
            size={35}
            iconStyle={styles.iconText}>
        </Icon>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}
