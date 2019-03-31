import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styles from './Styles/HeaderStyles'
import { Colors } from '../Themes/'
import { Header as HeaderElement } from 'react-native-elements'

export default class Header extends Component {

  static propTypes = {
    right: PropTypes.object,
    left: PropTypes.object,
    title: PropTypes.string
  }


  build = () => {

    const centerTemplate = {
      text: this.props.title, 
      style: styles.navigation
    }

    const leftTemplate = {
      type:'font-awesome',
      color: Colors.background,
      ...this.props.left
    } 

    const rightTemplate = {
      type:'font-awesome',
      color: Colors.background,
      ...this.props.right
    }

    return {
      leftComponent : leftTemplate,
      centerComponent : centerTemplate,
      rightComponent : rightTemplate,
    }

  }

  render () {
    return (
      <HeaderElement
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor="transparent"
        {...this.build()}
      />
    )
  }
}
