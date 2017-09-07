import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import {  Button, FormLabel, Icon  } from 'react-native-elements'

// Styles
import styles from './Styles/RemitoDetailScreenStyle'

import NavigationBar from 'react-native-navbar';
import I18n from 'react-native-i18n'

class RemitoDetailScreen extends Component {

  constructor(props) {
    super(props);
    //console.tron.log({screen:'detail', value: props})
    this.state = {
      detail : props.navigation.state.params.item,
      onPressingNotDelivered : this.onPressingNotDelivered.bind(this),
      latitude : 0,
      longitude: 0
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

        console.tron.log({screen:'position', value: position})
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

//   <View style={styles.header}>
//   <Icon
//     reverse
//     name='md-arrow-back'
//     type='ionicon'
//     color='#e74c3c'
//     onPress={() => goBack()}
//   />
//   <Text style={styles.title}> Detalle del Remito </Text>
// </View>

  render () {

    const { detail } = this.state
    //const { goBack } = this.props.navigation
    const { onPressingNotDelivered } = this.state
    const { latitude, longitude } = this.state

    const leftButtonConfig = {
      title: I18n.t('back'),
      handler: () => this.props.navigation.navigate('RemitosListScreen'),
    }

    const titleConfig = {
      title: 'Detalle',
    }

    return (

      <View style={styles.container}>

        <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
        />

        <View style={{ flexGrow: 1, padding: 10 }}>
          <Text style={styles.information}>REMITO</Text>
          <Text style={styles.informationReverse}>{detail.nroRemito}</Text>
          <Text style={styles.information}>RAZON SOCIAL</Text>
          <Text style={styles.informationReverse}>{detail.razonSocial}</Text>
          <Text style={styles.information}>DOMICILIO DESTINATARIO</Text>
          <Text style={styles.informationReverse}>{detail.domicilioDestinatario}</Text>
          <Text style={styles.information}>NOMBRE DESTINATARIO</Text>
          <Text style={styles.informationReverse}>{detail.nombreDestinatario}</Text>
          <Text style={styles.information}>LATITUDE</Text>
          <Text style={styles.informationReverse}>{detail.latitude}</Text>
          <Text style={styles.information}>LONGITUD</Text>
          <Text style={styles.informationReverse}>{detail.longitude}</Text>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => alert('Lo entregaste en lt:' + latitude + ' ln:' + longitude )}>
            <Text style={styles.bottomBarText}>ENTREGADO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressingNotDelivered(detail)}>
            <Text style={styles.bottomBarText}>NO ENTREGADO</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

{/* <View >
<Button
  style={{ marginBottom: 10 }}
  large
  icon={{name: 'pencil', type: 'font-awesome'}}
  backgroundColor='#27ae60'
  title='ENTREGADO' />

<Button
  // large
  style={{ marginBottom: 10 }}
  backgroundColor='#e74c3c'
  icon={{name: 'headphones', type: 'font-awesome'}}
  title='NO ENTREGADO' onPress={() => onPressingNotDelivered(detail)}/>
</View> */}

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
