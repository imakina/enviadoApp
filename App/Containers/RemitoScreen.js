import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Picker, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Button, Divider, Header, Icon } from 'react-native-elements'
var Spinner = require('react-native-spinkit')
// import NavigationBar from 'react-native-navbar';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MotivosActions from '../Redux/MotivosRedux'
import RemitosActions from '../Redux/RemitosRedux'
import AlertActions from '../Redux/AlertRedux'


// Styles
import styles from './Styles/RemitoScreenStyle'
import { Colors } from '../Themes/'


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
      motivo: 0,
      gpserror: '',
      fetching: false,
      alert : {},
      showAlert : false,
      updating : false,
      signature : null
    }
    this.isRequesting = false

    // //si tiene la firma
    // if (props.navigation.state.params){
    //   console.tron.log("llego signature")
    //   console.tron.log(props.navigation.state.params.signature)
    //   this.onUpdate(props.navigation.state.params.signature)
    // }

  }

  // idRemito: '48846',
  // estado: '3',
  // fechaHora: '2017-09-27 11:36:37.243',
  // latitud: '-34.5585783',
  // longitud: '-58.5585783'
  // }

  onPressingConfirm = () => {

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

    //listo para mostrar un mensaje
    this.showAlert = true

    // si no tengo la firma 
    if (this.state.motivo == 0 && !this.state.signature )
      this.onSigning()
    else 
      this.onUpdate(data)

    // {
    //   console.tron.log({name:'updating '})
    //   let dataSign = { ...data}
    //   dataSign.firma = this.state.signature
    //   console.tron.log({name:'update ', value: dataSign})
    //   this.onUpdate(dataSign)
    // }

  }

  // called from signature
  onSignature = (sign) => {
    this.setState({signature: sign});
  } 

  onSigning = () => {
    this.props.navigation.navigate('SignatureScreen', { onSign : this.onSignature })  
  }

  onUpdate = (data) => {

    if (this.state.motivo == 0)
      data.firma = this.state.signature
    else
      data.firma = ''

    console.tron.log("updating")
    this.setState({updating : true})
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
      // console.tron.display({name:"rp_remito", value:newProps})
      this.setState({ 
        motivos: newProps.motivos, 
        fetching: newProps.fetching,
        updating: newProps.updating,
        alert: newProps.alert
      })

      if (newProps.alert.show && 
        this.showAlert ) {
        this.showAlert = false
        
        Alert.alert(
          'Informacion',
          newProps.alert.message,
          [{
              text: 'OK', onPress: () => this.onPressingBack()
          }],
          { cancelable: false }
        )

      }
    
    }
    catch(e)
    {
      console.tron.log(e)
    }

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
    this.props.navigation.navigate('RemitosListScreen')
    this.props.clearAlert()
  }

  onPressingRoute = () => {
    this.props.navigation.navigate('RouteScreen')
  }

  render () {

    const { 
      latitude, 
      longitude,
      fetching,
      updating,
      gpserror,
      gpsfetching
    } = this.state

    const { remito, motivos } = this.props

    return (

      <View style={styles.container}>

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'REMITO', style: { color: '#27ae60' } }} 
          leftComponent={{ 
            icon: 'chevron-left',
            color: '#27ae60',
            onPress: () => this.onPressingBack()
          }}
        />
        
        <View style={{ alignItems: 'center', flexGrow: 1  }}>

          <View style={{ flexDirection: 'row', padding: 10 }}>

            <View style={{ alignItems: 'flex-end', padding: 5, minWidth: '25%' }}> 

              <Icon
                name='open-book'
                type='entypo'
                size={70}
                color= '#27ae60' />
            
            </View>
        
            <View style={{ padding: 5, minWidth: '75%' }}>
              
              <View style={{ paddingRight: 5, paddingLeft: 5 }}>
                <Text style={styles.title}>{remito.nroRemito}</Text>
                <Text style={styles.subtitle}>{remito.nombreDestinatario.trim()}</Text>
                <Text style={styles.subtitle} >{remito.razonSocial}</Text>
                <Text style={styles.direction} numberOfLines={3}>{remito.domicilioDestinatario.trim()}</Text>
                <Text style={styles.description} numberOfLines={3}>{remito.observaciones}</Text>
                <Text style={styles.price}>$ {remito.importe} {remito.tipoPago.trim()}</Text>
                { gpsfetching &&
                  <Text style={styles.description}>Buscando GPS ... </Text>
                }
              </View>
            
            </View>

          </View>

          { ( gpsfetching || fetching || updating ) ?

          <View style={{ alignContent: 'center', padding: 20 }}>

            <Spinner
              style={styles.spinner}
              size={130}
              type={'Pulse'}
              color={'#27ae60'}/>

          </View>

          :

          null

          }
        
        </View>

        <View style={styles.formContainer}>

        { ( gpsfetching || fetching || updating ) ?
        
        null

        :

          <View>

            <Divider style={{ backgroundColor: '#2ecc71' }} />

            <Picker
              selectedValue={this.state.motivo}
              onValueChange={(itemValue, itemIndex) => this.setState({motivo: itemValue})}>
              {
                motivos &&  
                  motivos.map((l, i) => {
                    return <Picker.Item value={l.id} label={l.descripcion} key={l.id}  /> })
                
              }
            </Picker>
            
            <View style={{ paddingBottom: 15 }}>
            
              <Button
                raised
                icon={{name: 'thumbs-up', type: 'entypo' }}
                buttonStyle={styles.buttonElement}
                textStyle={{textAlign: 'center'}}
                title={(this.state.motivo == 0 && !this.state.signature)?'FIRMAR':'CONFIRMA'}
                onPress={() => this.onPressingConfirm()} 
              />

            </View>

          </View>

          }

          </View>

      </View>
    )
  }
}


const mapStateToProps = (state) => {
  //console.tron.display({name:'remito_sp', value:state})
  return {
    fetching: state.motivos.fetching,
    motivos: state.motivos.payload,
    updating : state.remitos.fetching,
    remito : state.remitos.selected,
    hojaruta : state.hojaruta.selected,
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
