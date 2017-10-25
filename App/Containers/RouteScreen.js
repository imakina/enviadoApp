import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps';
import NavigationBar from 'react-native-navbar';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RouteScreenStyle'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class RouteScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }

  componentDidMount () {
    // console.tron.display({name:"cp_route", value:this.props.remito})
    this.setState({ region : {
      latitude: parseFloat(this.props.remito.latitud), 
      longitude: parseFloat(this.props.remito.longitud),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    } })
  }

  onPressingBack = () => {
    const { hoja } = this.state
    this.props.navigation.navigate('RemitoScreen')
  }

  render () {

    const leftButtonConfig = {
      title: "< Remito", 
      handler: () => this.onPressingBack(),
    }

    const titleConfig = {
      title: 'Map',
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

        <MapView
          style={styles.map}
          provider={this.props.provider}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          initialRegion={this.state.region}
        >
          <MapView.Marker
            title={this.props.remito.nroRemito}
            description={this.props.remito.domicilioDestinatario}
            coordinate={this.state.region}
          />

        </MapView>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.tron.display({name:'r_stop',value: state})
  return {
    remito : state.remitos.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen)
