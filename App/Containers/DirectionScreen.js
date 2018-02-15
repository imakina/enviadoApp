// import React, { Component } from 'react'
// import { View, Dimensions } from 'react-native'
// import { connect } from 'react-redux'
// // import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import MapView  from 'react-native-maps';
// import Polyline from '@mapbox/polyline';

// import { Header } from 'react-native-elements'
// // Add Actions - replace 'Your' with whatever your reducer is called :)
// // import YourActions from '../Redux/YourRedux'

// // Styles
// import styles from './Styles/MapScreenStyle'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -34.4968069;
const LONGITUDE = -58.6581077;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// class MapScreen extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       region: {
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       },
//       lastregion: {
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       },
//       marker : props.navigation.state.params.marker,
//       //
//       latitude: null,
//       longitude: null,
//       error: null,
//       coords:[],
//       x: 'true',
//       cordLatitude: LATITUDE,
//       cordLongitude: LONGITUDE,
//     };

//   }

//   async getDirections(startLoc, destinationLoc) {

//     try {
//         let locationQuery = `https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`
//         console.log(locationQuery)
//         let resp = await fetch(locationQuery)
//         console.log("after fetch")
//         let respJson = await resp.json();
//         console.log(respJson)
//         let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
//         let coords = points.map((point, index) => {
//             return  {
//                 latitude : point[0],
//                 longitude : point[1]
//             }
//         })
//         console.log("coords",coords)
//         console.log("points",points)
//         this.setState({coords: coords})
//         return coords
//     } catch(error) {
//         alert(error)
//         return error
//     }
//   }

//   mergeLot(){
//     if (this.state.latitude != null && this.state.longitude!=null)
//      {
//        let concatLot = this.state.latitude +","+this.state.longitude
//        let destination = this.state.marker.latitud+","+this.state.marker.longitud
//        this.setState({
//          concat: concatLot
//        }, () => {
//          this.getDirections(concatLot, destination);
//        });
//      }

//    }

//   componentDidMount() {

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           error: null,
//         });
//         console.log("my position",position);
//         console.log("destination",this.state.marker.latitud);
//         this.mergeLot();
//       },
//       (error) => this.setState({ error: error.message }),
//       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
//       // {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000} 
//     );

//   }

//   onRegionChange = (region) => {
//     console.tron.log({ name: "region" ,value:region})
//     this.setState({ lastregion : region });
//   }

//   render() {

//     return (
//       <View style={styles.container}>

//         <Header
//           statusBarProps={{ barStyle: 'light-content' }}
//           centerComponent={{ text: 'Ubicación', style: { color: '#27ae60' } }}
//           leftComponent={{
//             icon: 'chevron-left',
//             color: '#27ae60',
//             size: 30,
//             onPress: () => this.props.navigation.navigate('RemitosListScreen')
//           }}
//         />

//       <MapView style={styles.map} initialRegion={{
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA
//           }}>

//           {/* {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && 
//           } */}
//           <MapView.Polyline
//               coordinates={this.state.coords}
//               strokeWidth={2}
//               strokeColor="red"
//           />

//           {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && 
//           <MapView.Polyline
//                   coordinates={[
//                       {latitude: this.state.latitude, longitude: this.state.longitude},
//                       {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
//                   ]}
//                   strokeWidth={2}
//                   strokeColor="red"
//           />
//           }

//         </MapView>

//       </View>
//     )
//   }
// }

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

import styles from './Styles/MapScreenStyle'

class MapScreen extends Component {
// export default class RnDirectionsApp extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      coords: [],
      marker : props.navigation.state.params.marker,
    }
  }


  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        // console.log("my position",position);
        // console.log("destination",this.state.marker.latitud);
        // this.mergeLot();
        let start = this.state.latitude +","+ this.state.longitude
        let end = this.state.marker.latitud +","+ this.state.marker.longitud
        this.getDirections(start, end)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      // {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000} 
    );

  }

  // componentDidMount() {
  //   // find your origin and destination point coordinates and pass it to our method.
  //   // I am using Bursa,TR -> Istanbul,TR for this example
  //   this.getDirections("40.1884979, 29.061018", "41.0082,28.9784")
  // }

  async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }

  render() {
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

        <MapView style={styles.map} initialRegion={{
          latitude: LATITUDE, 
          longitude: LONGITUDE, 
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}>

          <MapView.Polyline 
              coordinates={this.state.coords}
              strokeWidth={2}
              strokeColor="red"/>


          { this.state.latitude &&
          <MapView.Marker
              title={"Actual Ubicacion"}
              description={"Comienzo"}
              coordinate={{
                latitude: parseFloat(this.state.latitude),
                longitude: parseFloat(this.state.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}
            />
          }

          { this.state.latitude &&
            <MapView.Marker
              title={this.state.marker.domicilioDestinatario}
              description={this.state.marker.nroRemito}
              coordinate={{
                latitude: parseFloat(this.state.marker.latitud),
                longitude: parseFloat(this.state.marker.longitud),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}
            />
          }

        </MapView>

      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   map: {
//     position: 'absolute',
//     top: 20,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height
//   },
// });

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
