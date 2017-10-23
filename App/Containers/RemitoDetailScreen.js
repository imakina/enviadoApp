import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Picker} from 'react-native'
import { connect } from 'react-redux'
import { Button, Divider } from 'react-native-elements'
import NavigationBar from 'react-native-navbar';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MotivosActions from '../Redux/MotivosRedux'
import RemitosActions from '../Redux/RemitosRedux'

import Icon from 'react-native-vector-icons/Ionicons'

// Styles
import styles from './Styles/RemitoDetailScreenStyle'

// import I18n from 'react-native-i18n'

var Spinner = require('react-native-spinkit')

class RemitoDetailScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item : props.navigation.state.params.item,
      car_id : props.navigation.state.params.car_id,
      hoja : props.navigation.state.params.hoja,
      latitude : 0,
      longitude : 0,
      motivos : [{id:0, descripcion:'CARGANDO'}],
      motivo: '',
      gpserror: ''
    }
    this.isRequesting = false
  }

  // idRemito: '48846',
  // estado: '3',
  // fechaHora: '2017-09-27 11:36:37.243',
  // latitud: '-34.5585783',
  // longitud: '-58.5585783'
  // }

  onPresssingConfirm = () => {

    //const { idRemito } = this.state.item
    const { 
      car_id, 
      motivo,
      longitude,
      latitude,
      item
    } = this.state

    let data = { 
      idRemito: item.idRemito, 
      estado : motivo,  
      // fechaHora:'2017-09-27 11:36:37.243', 
      fechaHora: this.formatDateTime(), 
      latitud : latitude,
      longitud: longitude,
      car_id: car_id 
    }
    
    this.isRequesting = true
    this.props.updateRemito(data)

  }

  formatDateTime() {
    let d = new Date();
    let result = d.getFullYear()
    result += "-"
    result += ((d.getMonth() + 1) > 9? '':'0') + (d.getMonth()+1)
    result += "-"
    result += (d.getDate() > 9? '':'0') + d.getDate()
    result += " "
    result += (d.getHours() > 9? '':'0') + d.getHours() + ":"
    result += (d.getMinutes() > 9? '':'0') + d.getMinutes() + ":"
    result += (d.getSeconds() > 9? '':'0') + d.getSeconds() + "."
    result += d.getMilliseconds()
    console.tron.log(result,true)
    return result
  }

  componentWillReceiveProps (newProps) {
    //console.tron.display({name:"receiveProps", value:newProps})
    this.setState({ 
      motivos: newProps.payload, 
      fetching: newProps.fetching,
      updating: newProps.updating
    })
    //console.tron.log(this.isRequesting)
    if (this.isRequesting && !newProps.updating) {

      this.isRequesting = false
      Alert.alert(
        'Motivo',
        newProps.message,
        [
          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {
            text: 'OK', 
            onPress: () => this.onPressingBack()
          },
        ],
        { cancelable: false }
      )
      //
    }

  }
  
  componentDidMount() {
    this.setState({ fetching: true })
    this.props.requestMotivos()
    // get the position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.tron.display({name:'position', value: position})
      },
      (error) => this.setState({ gpserror: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onPressingBack = () => {
    const { hoja } = this.state
    this.props.navigation.navigate('RemitosListScreen', { hoja : hoja })
  }

  onPressingRoute= () => {
    this.props.navigation.navigate('RouteScreen')
  }

  render () {

    const { 
      item,
      hoja,
      latitude, 
      longitude,
      fetching,
      updating,
      motivos,
      gpserror
    } = this.state

    const leftButtonConfig = {
      title: "< Remitos", //I18n.t('back'),
      //handler: () => this.props.navigation.navigate('RemitosListScreen', { hoja : hoja }),
      handler: () => this.onPressingBack(),
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

    // { updating && (
    // )} isVisible={updating || fetching}

    return (

      <View style={styles.container}>

        <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
          statusBar={statusBarConfig}
        />
        
        <View style={{ alignItems: 'center', paddingTop: 5, flexGrow: 1, flexDirection: 'row' }}>

          <View style={{ flexDirection: 'row', padding: 10 }}>

            <View style={{ padding: 15 }}> 

              <Icon
                name='md-paper'
                type='ionicon'
                color='#27ae60'
                size={100}
              />
            
            </View>
        
            <View style={{ padding: 10 }}>
              
              <View style={{ padding: 10, alignItems: 'center' }}>
                <Text style={styles.information}>Remito : {item.nroRemito}</Text>
                <Text style={styles.information}>Razon Social : {item.razonSocial}</Text>
                <Text style={styles.information}>{item.domicilioDestinatario.trim()}</Text>
                <Text style={styles.information}>{item.nombreDestinatario.trim()}</Text>
                <Text style={styles.information}>Latitud : {latitude}</Text>
                <Text style={styles.information}>Longitud : {longitude}</Text>
                <Text style={styles.information}>{gpserror}</Text>
              </View>

              { updating || fetching && (
              <Spinner
                style={styles.spinner}
                size={100}
                type={'Pulse'}
                color={'#27ae60'}/>
              )}

            </View>

          </View>
        
        </View>

        <Divider style={{ backgroundColor: '#2ecc71' }} />

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
        
        </View> 

        <Button
          raised
          large
          icon={{name: 'thumbs-up', type: 'entypo' }}
          buttonStyle={styles.buttonElement}
          textStyle={{textAlign: 'center'}}
          title={'CONFIRMAR'}
          onPress={() => this.onPresssingConfirm()} 
        />

        <Button
          raised
          large
          icon={{name: 'place' }}
          buttonStyle={styles.buttonElement}
          textStyle={{textAlign: 'center'}}
          title={'RUTA'}
          onPress={() => this.onPressingRoute()} 
        />

      </View>
    )
  }
}

{/* <TouchableOpacity
disabled={updating}
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

</TouchableOpacity> */}

const mapStateToProps = (state) => {
  //console.tron.display({name:'stateToProps', value:state})
  return {
    fetching: state.motivos.fetching,
    payload: state.motivos.payload,
    updating : state.remitos.fetching,
    message : state.remitos.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestMotivos: () => dispatch(MotivosActions.motivosRequest()) ,   
    updateRemito: (body) => dispatch(RemitosActions.remitoUpdate(body))    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemitoDetailScreen)
