import React, { Component } from 'react'
import { View,Alert } from "react-native";
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import AlertActions from '../Redux/AlertRedux'

//wrapping alert

export default class MaKitAlert extends Component {

  static defaultProps = {}

  static propTypes = {
    title: PropTypes.string,
    alert: PropTypes.object
    // show: PropTypes.bool,
    // inverted : PropTypes.bool
  }

  componentDidMount() {
    console.tron.log('alert')
  }

  render () {

    const { alert } = this.props

    return (

      <View>
        {
          alert.type === 'alert-danger' &&
            Alert.alert(
              this.props.title,
              alert.message,
              [
                {text: 'OK', onPress: () => this.props.clearAlert()},
              ],
              { cancelable: false }
            )
        }
      </View>
    )
  }
}

// const mapStateToProps = (state) => {
//   console.tron.display({name:'comp_alert',value: state}) 
//   return {
//     alert: state.alert
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     clearAlert: () => dispatch(AlertActions.alertClear())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MaKitAlert)

