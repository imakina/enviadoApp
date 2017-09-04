import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Alert} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { ListItem, Badge, Button, Header, SearchBar, Divider, FormLabel, Icon  } from 'react-native-elements'

// Styles
import styles from './Styles/RemitoDetailScreenStyle'

class RemitoDetailScreen extends Component {

  constructor(props) {
    super(props);
    //console.tron.log({screen:'detail', value: props})
    this.state = {
      detail : props.navigation.state.params.item,
      onPressingNotDelivered : this.onPressingNotDelivered.bind(this)
    }
  }

  onPressingNotDelivered(item) {
    this.props.navigation.navigate('CameraScreen', { detail : item })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render () {

    const { detail } = this.state
    const { goBack } = this.props.navigation
    const { onPressingNotDelivered } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            reverse
            name='md-arrow-back'
            type='ionicon'
            color='#e74c3c'
            onPress={() => goBack()}
          />
          <Text style={styles.title}> Detalle del Remito </Text>
        </View>
        <View style={styles.row}>
          <View>


            <FormLabel>REMITO</FormLabel>
            <Text style={styles.item}>{detail.nroRemito}</Text>

            <FormLabel>RAZON SOCIAL</FormLabel>
            <Text style={styles.item}>{detail.razonSocial}</Text>

            <FormLabel>DOMICILIO DESTINATARIO</FormLabel>
            <Text style={styles.item}>{detail.domicilioDestinatario}</Text>

            <FormLabel>NOMBRE DESTINATARIO</FormLabel>
            <Text style={styles.item}>{detail.nombreDestinatario}</Text>

            <Text style={styles.item}>Latitude: {this.state.latitude}</Text>
            <Text style={styles.item}>Longitude: {this.state.longitude}</Text>

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
                title='NO ENTREGADO' onPress={() => onPressingNotDelivered(detail)}/>
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
