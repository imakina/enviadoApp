import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView  from 'react-native-maps';
import { Header } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MapScreenStyle'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -34.4968069;
const LONGITUDE = -58.6581077;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      lastregion: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers : props.navigation.state.params.markers,
    };

  }

  componentDidMount() {
    //console.tron.display({name:"cp_route", value:this.props.remito})
    // this.setState({
    //   region: {
    //     latitude: parseFloat(this.props.remito.latitud),
    //     longitude: parseFloat(this.props.remito.longitud),
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA,
    //   }
    // })
  }

  onRegionChange = (region) => {
    console.tron.log({ name: "region" ,value:region})
    this.setState({ lastregion : region });
  }

  render() {

  //   console.log('mapScreen')

  //   <MapView.Marker
  //   title={this.props.remito.nroRemito}
  //   description={this.props.remito.domicilioDestinatario}
  //   coordinate={this.state.region}
  // />

    console.tron.log({ name: "render map" ,value:this.state.markers})

    return (
      <View style={styles.container}>

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Ubicación', style: { color: '#27ae60' } }}
          leftComponent={{
            icon: 'chevron-left',
            color: '#27ae60',
            size: 30,
            onPress: () => this.props.navigation.navigate('RemitosListScreen')
          }}
        />

        <MapView
          // provider={ PROVIDER_GOOGLE }
          style={styles.map}
          // provider={this.props.provider}
          scrollEnabled={true}
          zoomEnabled={true}
          // pitchEnabled={true}
          // rotateEnabled={false}
          // region={this.state.lastregion}
          // onRegionChange={this.onRegionChange}
          initialRegion={this.state.region}
        >
          {

            this.state.markers ?

              this.state.markers.map(marker => (

                <MapView.Marker
                  title={marker.nroRemito}
                  description={marker.domicilioDestinatario}
                  coordinate={{
                    latitude: parseFloat(marker.latitud),
                    longitude: parseFloat(marker.longitud),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                  }}
                />

              ))

            :

              <MapView.Marker
                title={this.props.remito.nroRemito}
                description={this.props.remito.domicilioDestinatario}
                coordinate={{
                  latitude: parseFloat(this.props.remito.latitud),
                  longitude: parseFloat(this.props.remito.longitud),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                }}
              />

          }

        </MapView> 

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.tron.display({ name: 'map_stop', value: state })
  return {
    remito: state.remitos.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
