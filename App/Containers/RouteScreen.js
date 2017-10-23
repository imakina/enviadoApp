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
      },
      remito : []
    };
  }

  componentWillReceiveProps (newProps) {
    console.tron.display({name:"rp_maps", value:newProps})
    this.setState({ 
      region: [{latitude: newProps.remito.latitude, longitude: newProps.remito.longitud}]
    })

  }

  // style={{ width: 250, height: 250 }}

  onPressingBack = () => {
    const { hoja } = this.state
    this.props.navigation.navigate('RemitoDetailScreen')
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
            title="This is a title"
            description="This is a description"
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
    // provider: MapView.ProviderPropType
    remito : state.remitos.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen)
