import React from "react";
import { View, Text, FlatList } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { connect } from "react-redux";
import getDirections from "react-native-google-maps-directions";
// Styles
import styles from "./Styles/PackagesListScreenStyle";
import { Colors } from '../Themes'
// Components
import Header from "../Components/Header";

class PackagesListScreen extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.navigation.navigate("WelcomeScreen");
  }

  state = {
    fetching: false,
    updating : false,
    tabIndex: 0,
    dataObjects: [],
    saveproximity : false,
    latitude : null,
    longitude : null
  };

  renderRow = ({ item }) => {

 
    return (

      <ListItem
        // key={i}
        leftIcon={{ name : 'radio-button-checked'}}
        title={item}
        rightElement={null}
        // subtitle={new Date().toLocaleString('es-EN', { hour12: true, 
                                            //  hour: "numeric", 
                                            //  minute: "numeric"})}
      />
    );
  };

  // handleSaveProximity = () => {
  //   // console.log({name:'checkboxChanged', value:!this.state.saveproximity})
  //   this.setState({ saveproximity: !this.state.saveproximity }, () => this.reload())
  //   // reorder the grid after proximity check change
  //   console.log(this.state.tabIndex);
  // }

  //
  // change selection
  //
  updateIndex = index => {
    // if (this.state.tabIndex != index)
    this.setState({ tabIndex: index }, () => this.reload());
  }

  // Render a footer?
  renderFooter = () => {
    if (this.state.dataObjects.length > 0)
      return  (
        <Button
          icon={{
            name: "check",
            size: 30,
            color: "white",
            type : "font-awesome"
          }}
          title={"Enviar"}
          buttonStyle={{backgroundColor:Colors.facebook, borderRadius: 5, marginTop: 10}}
        />
      )
    else
        return null
  };

  // Show this when data is empty
  renderEmpty = () => {
    // if (this.state.fetching)
      return (
        <Text
          style={[
            styles.item,
            { padding: 20, textAlign: "center", marginTop: 30 }
          ]}
        >
          Presione el icono de la camara para comenzar a escanear
        </Text>
      );
    // else return null;
  };

  renderSeparator = () => <Text style={styles.label}> - ~~~~~ - </Text>;

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index;

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20;

  onSearch = some => {
    // console.tron.log(some)
    if (some.length == 0) {
      data = this.state.data;
    } else {
      data = this.state.data
        .filter(item => item.nroRemito.indexOf(some) > 0)
        .map(item => item);
    }

    this.setState({
      dataObjects: data
    });
  };

  onClearSearch = () => {
    this.setState({
      dataObjects: this.state.data
    });
  };

  componentWillReceiveProps(newProps) {
    //console.tron.display({name: 'props', value: newProps})
    // this.setState({
    //   sync: newProps.sync,
    //   dataObjects: newProps.remitos,
    //   data: newProps.remitos,
    //   fetching: newProps.fetching,
    // });

    // // console.log(newProps)

    // if (this.state.sync) 
    //   // console.log("syncRemitos", this.props.remitos.length)
    //   if (this.state.sync.syncing == false) {
    //     // console.log("updateindexSync")
    //     // console.log("propsremitos", this.props.remitos)
    //     this.updateIndex(0)
    //     // this.setState({updating:false}) 
    //   }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // watchID = null;

  // myWatchPosition() {
  //   console.log("init myWatchPosition",this.watchID)
  //   this.setState({ gpsfetch : true })

  //   this.watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         gpsfetch : false,
  //         error: null,
  //       }, 
  //         () => {
  //           console.log("myWatchPosition get new position", this.state.latitude)
  //           this.onAdquireLocation(position.coords.latitude, position.coords.longitude);
  //           this.updateIndex(0);
  //         }
  //       );
  //     },
  //     (error) => { 
  //       this.setState({ error: error.message }),
  //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
  //       console.log('error',error)
  //       this.setState({ gpsfetch : false })
  //     }
  //   );
  // }

  onRequestingRemitos = todos => {
    this.setState({ fetching: true });
    this.props.requestRemitos(this.props.hojaruta.numeroHojaRuta, todos);
  };  
   

  onPressSingleItem = item => {
    // console.tron.log({ item: 'item', value: item })
    this.props.selectedRemitos(item);
    //clearwatch
    // this.clearWatch();
    //navigation
    this.props.navigation.navigate("RemitoScreen");
  };

  onAdquireLocation = (latitude, longitude) => {
    this.props.adquireLocation({latitude,longitude});
  }

  onPressOpenMaps = item => {
    // console.tron.log({ name: "onPressOpenMaps", value: item });
    // openMap({ latitude: parseFloat(item.latitud), longitude: parseFloat(item.longitud)});
    this.handleGetDirections(item);
  };

  handleGetDirections = item => {
    const data = {
      source: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      },
      destination: {
        latitude: parseFloat(item.latitud),
        longitude: parseFloat(item.longitud)
      },
      params: [
        {
          key: "dirflg",
          value: "d"
        }
      ]
    };

    getDirections(data);
  };

  onCamera() {
    // Camera on, param function to save producto
    this.props.navigation.navigate("SignatureScreen", {
      // onBarcode: this.onScanned,
      // onSign: this.onSignature,
      onPackage: this.onCapturePackage, 
      step : "package"
    });
  }

  onCapturePackage = packagescanned => {
    console.log(packagescanned);
    // var dataCloned = [ ...this.state.dataObjects];
    var newStateArray = this.state.dataObjects.slice();
    newStateArray.push(packagescanned);
    this.setState({dataObjects: newStateArray});
    // 
  }

  // distance gps
  // getDistance = destination => {

  //   if (!this.state.latitude) {
  //     // console.log("invalid coords ", this.state.latitude)
  //     return "?";
  //   }

  //   // console.log("Dest",destination);
  //   // console.log("state",this.state.longitude);
  //   const R = 6371; // Radius of the earth in km
  //   const dLat = this.deg2rad(destination.latitud - this.state.latitude); 
  //   const dLon = this.deg2rad(destination.longitud - this.state.longitude);
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(this.deg2rad(this.state.latitude)) *
  //       Math.cos(this.deg2rad(destination.latitud)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const d = R * c; // Distance in km
    
  //   // console.log("d",d)

  //   if (d > 100) return "?";

  //   return d || "?";
  // };

  // deg2rad = deg => {
  //   return deg * (Math.PI / 180);
  // };
  
  // end distance gps

  render() {

    return (
      <View style={styles.container}>

        <Header
          title="PAQUETES"
          left={{ icon: "chevron-left", onPress: () => this.goBack() }}
          right={{ icon: "camera", onPress: () => this.onCamera() }}
        />

        <View>

          {/* <HeaderRemito 
            tabIndex = {this.state.tabIndex}
            saveproximity = {this.state.saveproximity} 
            updateIndex = {this.updateIndex} 
            handleSaveProximity = {this.handleSaveProximity} 
            onSearch = {() => this.onSearch} 
            onClearSearch = {() => this.onClearSearch} 
          />  */}
        
          <FlatList
            contentContainerStyle={styles.listContent}
            data={this.state.dataObjects}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            // ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            // ItemSeparatorComponent={this.renderSeparator}
          />

        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    remitos: state.remitos.remitos,
    fetching: state.remitos.fetching,
    user: state.login.payload,
    hojaruta: state.hojaruta.active,
    // sync
    sync: state.sync,
    location : state.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //requestRemitos: (hoja, todos) => dispatch(RemitosActions.remitosRequest(hoja, todos)),
    rehydrateRemitos: () => dispatch(RemitosActions.remitosRehydrate()),
    selectedRemitos: remito => dispatch(RemitosActions.remitoSelected(remito)),
    attemptSync: () => dispatch(SyncActions.syncRequest()),
    adquireLocation: (location) => dispatch(LocationActions.locationAdquire())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesListScreen);
