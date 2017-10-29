import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Picker, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Button, Divider, Header } from 'react-native-elements'
import NavigationBar from 'react-native-navbar';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MotivosActions from '../Redux/MotivosRedux'
import RemitosActions from '../Redux/RemitosRedux'
import AlertActions from '../Redux/AlertRedux'

import Icon from 'react-native-vector-icons/Ionicons'

// Styles
import styles from './Styles/RemitoScreenStyle'
var Spinner = require('react-native-spinkit')

class RemitoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // item : props.navigation.state.params.item,
      
      // hoja : props.navigation.state.params.hoja,
      // car_id : props.navigation.state.params.car_id,
      latitude : 0,
      longitude : 0,
      motivos : [],
      motivo: '',
      gpserror: '',
      fetching: false,
      alert : {}
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

    this.setState({updating : true})

    const { 
      car_id, 
      motivo,
      longitude,
      latitude,
      item
    } = this.state

    const {
      remito,
      hojaruta
    } = this.props

    let data = { 
      idRemito: remito.idRemito, 
      estado : motivo,  
      fechaHora: this.formatDateTime(), 
      latitud : latitude,
      longitud: longitude,
      car_id: hojaruta.car_id 
    }
    
    // this.isRequesting = true
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
    // console.tron.log(result,true)
    return result
  }

  componentWillReceiveProps (newProps) {

    try {

    console.tron.display({name:"rp_remito", value:newProps})
    this.setState({ 
      motivos: newProps.motivos, 
      fetching: newProps.fetching,
      updating: newProps.updating,
      alert: newProps.alert
    })
  }
  catch(e)
  {
    console.tron.log(e)
  }

    // console.tron.log({name:"rp_remito2", value:this.isRequesting})
    // if (this.isRequesting && !newProps.updating) {
    //   console.tron.log({name:"rp_remito3", value:newProps.updating})
    //   this.isRequesting = false
    //   Alert.alert(
    //     'Motivo',
    //     newProps.message,
    //     [
    //       // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //       // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //       {
    //         text: 'OK', 
    //         onPress: () => this.onPressingBack()
    //       },
    //     ],
    //     { cancelable: false }
    //   )
    //   //
    // }

  }
  
  componentDidMount() {

    if (!this.props.motivos) {
      console.tron.log("rcm_motivos")
      this.setState({ fetching: true })
      this.props.requestMotivos()
    }

    // get the position
    this.setState({ gpsfetching : true })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          gpsfetching : false
        });
        console.tron.display({name:'position', value: position})
      },
      (error) => this.setState({ gpserror: error.message, gpsfetching: false }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onPressingBack = () => {
    // const { hoja } = this.state
    // this.props.navigation.navigate('RemitosListScreen', { hoja : hoja })
    this.props.clearAlert()
    this.props.navigation.navigate('RemitosListScreen')
  }

  onPressingRoute= () => {
    this.props.navigation.navigate('RouteScreen')
  }

  render () {

    const { 
      // item,
      // hoja,
      alert,
      latitude, 
      longitude,
      fetching,
      updating,
      gpserror,
      gpsfetching
    } = this.state

    const { remito, motivos } = this.props

    // const leftButtonConfig = {
    //   title: "< Remitos", 
    //   handler: () => this.onPressingBack(),
    // }

    // const titleConfig = {
    //   title: 'Detalle',
    //   style: {color:'#FFF'}
    // }
    
    // const statusBarConfig = {
    //   style: 'light-content', 
    //   hidden: false, 
    //   tintColor: '#2ecc71'
    // }

    return (

      <View style={styles.container}>

        {/* <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
          rightComponent={{ icon: 'menu', color: '#27ae60' }}
          statusBar={statusBarConfig}
          <Text>{gpserror}</Text> 
        /> */}

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'REMITO', style: { color: '#27ae60' } }} 
          leftComponent={{ 
            icon: 'chevron-left',
            type: 'font-awesome',
            color: '#27ae60',
            onPress: () => this.onPressingBack()
          }}
        />
        
        <View style={{ alignItems: 'center', flexGrow: 1  }}>

          <View style={{ flexDirection: 'row', padding: 5 }}>

            <View style={{ padding: 5, minWidth: '20%' }}> 

              <Icon
                name='md-paper'
                type='ionicon'
                color='#27ae60'
                size={80}
              />
            
            </View>
        
            <View style={{ padding: 5, minWidth: '80%' }}>
              
              <View style={{ paddingRight: 5, paddingLeft: 5 }}>
                <Text style={styles.title}>{remito.nroRemito} - (${remito.importe} {remito.tipoPago.trim()})</Text>
                <Text style={styles.subtitle}>{remito.nombreDestinatario.trim()}</Text>
                <Text style={styles.subtitle} >{remito.razonSocial}</Text>
                <Text style={styles.direction} numberOfLines={3}>{remito.domicilioDestinatario.trim()}</Text>
                {/* <Text style={styles.description}>El Tipo de Pago es : {remito.tipoPago.trim()===''?'no aplica':remito.tipoPago}</Text> */}
                <Text style={styles.description} numberOfLines={3}>{remito.observaciones}</Text>
                {/* <Text style={styles.information}>Longitud : {remito.longitud}</Text>*/} 
                { gpsfetching &&
                  <Text style={styles.description}>Buscando GPS ... </Text>
                }
              </View>
            
            </View>

          </View>

          <View style={{ flexDirection: 'row'}}>

            { fetching  && (
                <Spinner
                  style={styles.spinner}
                  size={100}
                  type={'Pulse'}
                  color={'#27ae60'}/>
            )}

            { updating && (
                <Spinner
                  style={styles.spinner}
                  size={100}
                  type={'Pulse'}
                  color={'#27ae60'}/>
            )}

          { gpsfetching && (
                <Spinner
                  style={styles.spinner}
                  size={100}
                  type={'Pulse'}
                  color={'#27ae60'}/>
            )}

          </View>

            {
              alert &&
              alert.type === 'alert-success' &&
                Alert.alert(
                  'Informacion',
                  alert.message,
                  [
                    {
                      text: 'OK', 
                      onPress: () => this.onPressingBack()
                    },
                  ],
                  { cancelable: false }
                )
            }
        
        </View>


        <View style={styles.formContainer}>
          <Divider style={{ backgroundColor: '#2ecc71' }} />

          <Picker
            enabled={!gpsfetching}
            selectedValue={this.state.motivo}
            onValueChange={(itemValue, itemIndex) => this.setState({motivo: itemValue})}>
            {
              motivos &&  
                motivos.map((l, i) => {
                  return <Picker.Item value={l.id} label={l.descripcion} key={l.id}  /> })
              
            }
          </Picker>
        
        </View> 

        <View style={{ paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
        
          <Button
            disabled={gpsfetching || updating }
            raised
            large
            icon={{name: 'thumbs-up', type: 'entypo' }}
            buttonStyle={styles.buttonElement}
            textStyle={{textAlign: 'center'}}
            title={'CONFIRMAR'}
            onPress={() => this.onPresssingConfirm()} 
          />

        </View>


        {/* <Button
          raised
          large
          icon={{name: 'place' }}
          buttonStyle={styles.buttonElement}
          textStyle={{textAlign: 'center'}}
          title={'RUTA'}
          onPress={() => this.onPressingRoute()} 
        /> */}

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
  //console.tron.display({name:'remito_sp', value:state})
  return {
    fetching: state.motivos.fetching,
    motivos: state.motivos.payload,
    // user: state.login.payload,
    updating : state.remitos.fetching,
    remito : state.remitos.selected,
    hojaruta : state.hojaruta.selected,
    // message : state.remitos.message,
    alert: state.alert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestMotivos: () => dispatch(MotivosActions.motivosRequest()) ,   
    updateRemito: (body) => dispatch(RemitosActions.remitoUpdate(body)),
    clearAlert: () => dispatch(AlertActions.alertClear())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemitoScreen)
