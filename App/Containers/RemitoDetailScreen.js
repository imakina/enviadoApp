import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { ListItem, Badge, Button, Header, SearchBar, Divider, FormLabel, FormInput, Tabs, Tab, Icon  } from 'react-native-elements'

// Styles
import styles from './Styles/RemitoDetailScreenStyle'

class RemitoDetailScreen extends Component {

  constructor(props) {
    super(props);
    //console.tron.log({screen:'detail', value: props})
    this.state = {
      detail : props.navigation.state.params.item
    }
  }



  render () {

    const { detail } = this.state
    const { goBack } = this.props.navigation

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}> Detalle del Remito </Text>
        </View>
        <View style={styles.row}>
          <View>
            <Icon
              reverse
              name='md-arrow-back'
              type='ionicon'
              color='#e74c3c'
              onPress={() => goBack()}
            />

            <FormLabel>REMITO</FormLabel>
            <Text style={styles.item}>{detail.nroRemito}</Text>

            <FormLabel>RAZON SOCIAL</FormLabel>
            <Text style={styles.item}>{detail.razonSocial}</Text>

            <FormLabel>DOMICILIO DESTINATARIO</FormLabel>
            <Text style={styles.item}>{detail.domicilioDestinatario}</Text>

            <FormLabel>NOMBRE DESTINATARIO</FormLabel>
            <Text style={styles.item}>{detail.nombreDestinatario}</Text>
          </View>
        </View>
        <View style={styles.footer} >
            <View style={styles.buttonGroup}>
              <Button
                large
                icon={{name: 'pencil', type: 'font-awesome'}}
                backgroundColor='#27ae60'
                title='ENTREGADO' />
            </View>
            <View style={styles.buttonGroup}>
              <Button
                // large
                backgroundColor='#e74c3c'
                icon={{name: 'headphones', type: 'font-awesome'}}
                title='NO ENTREGADO' />
            </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.tron.display({screen:'detail', value: state})
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemitoDetailScreen)
