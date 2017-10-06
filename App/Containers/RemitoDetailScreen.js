import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, Picker} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MotivosActions from '../Redux/MotivosRedux'
import RemitosActions from '../Redux/RemitosRedux'

// import { Button, FormLabel } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

// Styles
import styles from './Styles/RemitoDetailScreenStyle'

import NavigationBar from 'react-native-navbar';
import I18n from 'react-native-i18n'

class RemitoDetailScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item : props.navigation.state.params.item,
      car_id : props.navigation.state.params.car_id,
      hoja : props.navigation.state.params.hoja,
      latitude : 0,
      longitude : 0,
      motivos : [],
      motivo: 'NO ENTREGADO'
    }
  }

  onPresssingConfirm = () => {
    // idRemito: '48846',
    // estado: '3',
    // fechaHora: '2017-09-27 11:36:37.243',
    // latitud: '-34.5585783',
    // longitud: '-58.5585783'
    // }

    const { idRemito } = this.state.item
    const { car_id } = this.state

    let data = { 
      idRemito: idRemito, 
      estado : 0, 
      fechaHora:'2017-09-27 11:36:37.243', 
      latitud : '-34.5585783',
      longitud: '-58.5585783',
      car_id: car_id 
    }
    this.props.requestRemitoEstado(data)
  }

  componentWillReceiveProps (newProps) {
    console.tron.display(newProps)
    this.setState({ motivos: newProps.payload })
    this.setState({ fetching: newProps.fetching })
  }
  
  componentDidMount() {
    this.setState({ fetching: true })
    this.props.requestMotivos()

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       error: null,
    //     });

    //     console.tron.log({screen:'position', value: position})
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
  }

  render () {

    const { 
      item,
      hoja,
      latitude, 
      longitude,
      fetching,
      motivos
    } = this.state

    const leftButtonConfig = {
      title: I18n.t('back'),
      handler: () => this.props.navigation.navigate('RemitosListScreen', { hoja : hoja }),
    }

    const titleConfig = {
      title: 'Detalle',
      style: {color:'#FFF'}
    }
    
    const statusBarConfig = {
      style: 'light-content', 
      hidden: false, 
      tintColor: '#2ecc71'
    }

    return (

      <View style={styles.container}>

        <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
          statusBar={statusBarConfig}
        />
        
        <View style={{ alignItems: 'center', padding: 20, flexGrow: 1 }}>

          <Icon
             name='md-paper'
             type='ionicon'
             color='#27ae60'
             size={100}
          />
          
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Text style={styles.information}>Remito : {item.nroRemito}</Text>
            <Text style={styles.information}>Razon Social : {item.razonSocial}</Text>
            <Text style={styles.information}>{item.domicilioDestinatario.trim()}</Text>
            <Text style={styles.information}>{item.nombreDestinatario.trim()}</Text>
            {/* <Text style={styles.information}>Latitud : {detail.latitude}</Text> */}
            {/* <Text style={styles.information}>Longitud : {detail.longitude}</Text> */}
          </View>

        </View>

        <View style={styles.formContainer}>

          <Picker
            selectedValue={this.state.motivo}
            onValueChange={(itemValue, itemIndex) => this.setState({motivo: itemValue})}>
            {
              motivos && 
                motivos.map((l, i) => {
                  return <Picker.Item value={l.id} label={l.descripcion} key={l.id}  /> })
              
            }
          </Picker>


          <TouchableOpacity
            disabled={fetching}
            style={styles.buttonContainer} 
            onPress={this.onPresssingConfirm}>

            <View style={styles.buttonIcon}>
              <Icon
                reverse
                name='md-thumbs-up'
                type='ionicon'
                color='#FFF'
                size={40}
              />
              <Text style={styles.buttonText}> CONFIRMAR </Text>
            </View>

          </TouchableOpacity>

        </View> 


      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.tron.display({screen:'detail', value: state})
  return {
    payload: state.motivos.payload,
    fetching: state.motivos.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestMotivos: () => dispatch(MotivosActions.motivosRequest()) ,   
    requestRemitoEstado: (body) => dispatch(RemitosActions.remitoEstadoRequest(body))    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemitoDetailScreen)
