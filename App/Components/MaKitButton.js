import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./Styles/MaKitButtonStyles";
import { Icon } from "react-native-elements";

export default class MaKitButton extends Component {

  static defaultProps = { 
  }

  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.object,
    disabled: PropTypes.bool,
    style: PropTypes.object
  };

  //   getText () {
  //     const buttonText = this.props.text || this.props.children || ''
  //     return buttonText.toUpperCase()
  //   }

  getTypeBaseStyle() {

    if (this.props.disabled) return styles.disabled;

    switch (this.props.type) {
      case "alert": return styles.typeAlert;
      case "ko": return styles.typeKO;
      case "inactive": return styles.typeInactive;
      case "order": return styles.typeOrder;
      default:
        return styles.typeBase;
    }
    
  }

  render() {
    
    return (

      <TouchableOpacity
        style={[
          styles.base, 
          this.getTypeBaseStyle(), 
          this.props.style
        ]}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        <View style={styles.iconview}>
          <Icon
            size={35}
            style={styles.icon}
            iconStyle={styles.iconText}
            {...this.props.icon}
          />
        </View>

        { this.props.text !== '' && 
          <Text style={styles.text}>{this.props.text}</Text>
        }

      </TouchableOpacity>
    );
  }
}
