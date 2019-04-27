import React from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { connect } from "react-redux";
// import openMap from "react-native-open-maps";
import getDirections from "react-native-google-maps-directions";
// import LocationActions from "../Redux/LocationRedux";
import RemitosActions from "../Redux/RemitosRedux";
import SyncActions from "../Redux/SyncRedux";
import AlertActions from "../Redux/AlertRedux";
// Components
import ItemRemito from "../Components/ItemRemito";
import HeaderRemito from "../Components/HeaderRemito";
import Header from "../Components/Header";
// import Spinner from "../Components/Spinner";
import MaKitSpinner from '../Components/MakitSpinner'
// Styles
import styles from "./Styles/RemitosListScreenStyle";
// import { Colors } from '../Themes'


class RemitosListScreen extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.clearWatch();
    this.props.navigation.navigate("HojaRutaScreen");
  }
  
  //force unmounting 
  clearWatch = () => {
    // navigator.geolocation.clearWatch(this.watchId);
    // console.log("force umounting")
  }

  state = {
    fetching: false,
    updating : false,
    tabIndex: 0,
    dataObjects: this.props.remitos,
    saveproximity : false,
    latitude : null,
    longitude : null,
    alertCalled : false
  };

  renderRow = ({ item }) => {
    
    return (
      <ItemRemito
        // latitud={this.props.latitude}
        // longitud={this.props.longitude}
        onPressSingleItem={() => this.onPressSingleItem(item)}
        onPressOpenMaps={() => this.onPressOpenMaps(item)}
        item={item}
      />
    );
  };

  handleSaveProximity = () => {
    // console.log({name:'checkboxChanged', value:!this.state.saveproximity})
    this.setState({ saveproximity: !this.state.saveproximity }, () => this.reload())
    // reorder the grid after proximity check change
    console.log(this.state.tabIndex);

    //ask to save the values
    // this.setState({ distanceQuestion:true})
    if (!this.state.saveproximity ) {
      Alert.alert(
        'Orden',
        'Desea guardar el orden por distancia',
        [
          {text: 'SI', onPress: () => this.distanceAnswerYes()},
          {text: 'NO', onPress: () => this.distanceAnswerNo()},
        ],
        { cancelable: false }
      )
    }

  }

  // renderHeader = () => ( 
  //   <HeaderRemito 
  //     tabIndex = {this.state.tabIndex}
  //     saveproximity = {this.state.saveproximity} 
  //     updateIndex = {this.updateIndex} 
  //     handleSaveProximity = {this.handleSaveProximity} 
  //     onSearch = {() => this.onSearch} 
  //     onClearSearch = {() => this.onClearSearch} 
  //   /> )

  //
  // Render a header?
  //
  // renderHeader = () => (
    
  //   <View>
  //     <View style={{ flexDirection: "row", height: 40 }}>

  //       <TouchableOpacity style={{ flex: 1 }} onPress={() => this.updateIndex(0)}>
  //         <Text
  //           style={[styles.textButtonGroup, this.state.tabIndex == 0 ? styles.textButtonSelected : ""]}>
  //           Pendientes
  //         </Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity style={{ flex: 1 }} onPress={() => this.updateIndex(1)}>
  //         <Text
  //           style={[styles.textButtonGroup,this.state.tabIndex == 1 ? styles.textButtonSelected : ""]}>
  //           Todos
  //         </Text>
  //       </TouchableOpacity>

  //     </View>

  //     <SearchBar
  //       onChangeText={this.onSearch}
  //       onClearText={this.onClearSearch}
  //       placeholder="Escriba aqui ..."
  //       lightTheme
  //       round
  //     />

  //     { this.state.tabIndex == 0 &&

  //       <View style={styles.proximityCheck}>
  //         <Text style={styles.proximityCheckText}>
  //         {
  //           this.state.saveproximity ? " Ordenado por proximidad ":" Ordenado por BackOffice "
  //         }
  //         </Text>
  //         <Switch
  //             value={this.state.saveproximity}
  //             onValueChange={this.handleSaveProximity}
  //             disabled={false}
  //             onTintColor={Colors.backgroundVariant}
  //           />
  //       </View>

  //     }

  //   </View>
  // );

 
  //
  // change selection
  //
  updateIndex = index => {
    // if (this.state.tabIndex != index)
    this.setState({ tabIndex: index }, () => this.reload());
  }
  
  //
  // reload the data without selecting a new
  //
  reload = () => {

    if (!this.props.remitos) {
      console.log('without remitos')
      return;
    }
 
    console.tron.log("updating index");
    console.log("updating index", this.state.tabIndex);
    console.log("got gps", this.state.latitude + ' ' + this.state.longitude);

    var dataOrdered;

    switch (this.state.tabIndex) {
    case 0:
      // pending
      // data = this.state.dataObjects
      data = this.props.remitos
        .filter(item => item.estado_mobile == 99)
        .map(item => item);

      var dataCloned = [ ...data]
      
      //
      // add the calculated distance field
      //
      const dataCopy = dataCloned.map((item) => {
        
        const tempDist = this.getDistance({
          latitud: item.latitud,
          longitud: item.longitud
        });
        
        // format distance
        const distance = isNaN(tempDist)
        ? tempDist
        : parseFloat(Math.round(tempDist * 100) / 100).toFixed(2);
        
        // console.log("distance", distance)

        return {...item, distance: distance};
      });

      // default with gps 
      dataOrdered = dataCopy;

      // order by proximity
      if (this.state.saveproximity) 
        dataOrdered = dataCopy.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    
      console.log("end order")

      break;
        
    case 1:
      // full list
      // dataOrdered = this.state.dataObjects
      dataOrdered = this.props.remitos;
      break;
    }
      
    // console.table(dataOrdered);
    this.setState({ dataObjects: dataOrdered })

  };

  // Render a footer?
  renderFooter = () => (
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>
  );

  // Show this when data is empty
  renderEmpty = () => {
    if (this.state.fetching)
      return (
        <Text
          style={[
            styles.item,
            { padding: 20, textAlign: "center", marginTop: 30 }
          ]}
        >
          {" "}
          Buscando ...{" "}
        </Text>
      );
    else return null;
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

  onPressDistance = () => {
    //prepare the orderer array to persist
    // console.tron.log("onpressdistance")
    const arrOrder = this.props.remitos.map((item) => {
      return [item.orden,item.id_detalle]
    })
    console.tron.log("orden",arrOrder)
    this.props.orderRemitos(arrOrder);
  }

  componentWillReceiveProps(newProps) {
    console.tron.display({name: 'props', value: newProps})
    this.setState({
      sync: newProps.sync,
      dataObjects: newProps.remitos,
      data: newProps.remitos,
      fetching: newProps.fetching,
    });

    if (this.props.account.deposito)
      if (this.state.alertCalled == false)
        if (newProps.alert.show) {
          this.setState({ alertCalled : true });

            console.tron.log('cambiado alertcalled')
          
            // alert.type === 'alert-success' &&
            // Alert.alert(
            //   'Guardado por distancia',
            //   alert.message,[ 
            //     {text: 'OK', onPress: () => this.props.clearAlert()},
            //   ],
            //   { cancelable: false }
            // )

            Alert.alert(
              'Guardado por distancia',
              'Orden actualizado',
              [
                {text: 'OK', onPress: () => this.props.clearAlert()},
              ],
              { cancelable: false }
            )
              
            console.tron.log('alert false')
            this.setState({ alertCalled : false })

        }
      // else
      //   if (!newProps.alert.show)
      //     this.setState({ alertCalled : false })


    // console.log(newProps)

    if (this.state.sync) 
      // console.log("syncRemitos", this.props.remitos.length)
      if (this.state.sync.syncing == false) {
        // console.log("updateindexSync")
        // console.log("propsremitos", this.props.remitos)
        this.updateIndex(0)
        // this.setState({updating:false}) 
      }
  }

  componentDidMount() {
    // get remitos list
    this.setState({ tabIndex: 0 }, () => this.reload());
    //this.updateIndex(0);

    //changed to promote realtime gps 
    // this.myCurrentPosition();
    // this.myWatchPosition();
  }

  componentWillUnmount() {
    // this.clearWatch();
  }

  // myCurrentPosition() {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         error: null
  //       });
  //     },
  //     error => this.setState({ error: error.message, latitude: 0, longitude: 0 }),
  //     { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
  //   );
  // }

  watchID = null;

  myWatchPosition() {
    // console.log("init myWatchPosition",this.watchID)
    // this.setState({ gpsfetch : true })

    // this.watchId = navigator.geolocation.watchPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       gpsfetch : false,
    //       error: null,
    //     }, 
    //       () => {
    //         console.log("myWatchPosition get new position", this.state.latitude)
    //         this.onAdquireLocation(position.coords.latitude, position.coords.longitude);
    //         this.updateIndex(0);
    //       }
    //     );
    //   },
    //   (error) => { 
    //     this.setState({ error: error.message }),
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
    //     console.log('error',error)
    //     this.setState({ gpsfetch : false })
    //   }
    // );
  }

  onRequestingRemitos = todos => {
    this.setState({ fetching: true });
    this.props.requestRemitos(this.props.hojaruta.numeroHojaRuta, todos);
  };  
   
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //console.tron.log({name:info, value:error})
  }

  onPressSingleItem = item => {
    // console.tron.log({ item: 'item', value: item })
    this.props.selectedRemitos(item);
    //clearwatch
    this.clearWatch();
    //navigation
    this.props.navigation.navigate("RemitoScreen");
  };

  // onAdquireLocation = (latitude, longitude) => {
  //   this.props.adquireLocation({latitude,longitude});
  // }

  // onPressMap = (item) => {
  //   // console.log({name:'map', value:item})
  //   this.props.selectedRemitos(item)
  //   //navigation
  //   const markers = [].push(item)
  //   // console.tron.display({name:'unequipo', value:markers})
  //   this.props.navigation.navigate('MapScreen', { markers: null })
  // }

  onPressOpenMaps = item => {
    console.tron.log({ name: "onPressOpenMaps", value: item });
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

  // onPressDirection = (item) => {
  //   console.log({name:'direction', value:item})
  //   this.props.selectedRemitos(item)
  //   //navigation
  //   const markers = [].push(item)
  //   this.props.navigation.navigate('DirectionScreen', { marker: item })
  // }

  onSync() {
    this.setState({ updating:true })
    this.props.attemptSync();
  }

  distanceAnswerYes = () => {
    this.setState({ distanceQuestion:false})
    this.onPressDistance();
  }

  distanceAnswerNo = () => {
    this.setState({ distanceQuestion:false})
  }

  // onPressMarkers = () => {
  //   const markers = this.state.dataObjects
  //     .filter(function(item) {
  //       return item.latitud !== "";
  //     })
  //     .map(function(item) {
  //       return item;
  //     });
  //   this.props.navigation.navigate("MapScreen", { markers: markers });
  // };

  // distance gps
  getDistance = destination => {

    // if (!this.state.latitude) {
    if (!this.props.location.latitude) {
      // console.log("invalid coords ", this.state.latitude)
      return "?";
    }

    const R = 6371; // Radius of the earth in km
    // const dLat = this.deg2rad(destination.latitud - this.state.latitude); 
    // const dLon = this.deg2rad(destination.longitud - this.state.longitude);
    const dLat = this.deg2rad(destination.latitud - this.props.location.latitude); 
    const dLon = this.deg2rad(destination.longitud - this.props.location.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.props.location.latitude)) *
        Math.cos(this.deg2rad(destination.latitud)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    
    // console.log("d",d)

    if (d > 100) return "?";

    return d || "?";
  };

  deg2rad = deg => {
    return deg * (Math.PI / 180);
  };
  
  // end distance gps

  render() {
    const { fetching, gpsfetch } = this.state;
    const { syncing } = this.props.sync
    const { alert } = this.props

    return (
      <View style={styles.container}>
        <Header
          title="LISTA REMITOS"
          left={{ icon: "chevron-left", onPress: () => this.goBack() }}
          right={{ icon: gpsfetch ? "map-marker" : "refresh", onPress: () => this.onSync() }}
        />

        { 
          syncing ?
            null
          :
          <View>

            <HeaderRemito 
              tabIndex = {this.state.tabIndex}
              saveproximity = {this.state.saveproximity} 
              updateIndex = {this.updateIndex} 
              handleSaveProximity = {this.handleSaveProximity} 
              onSearch = {() => this.onSearch} 
              onClearSearch = {() => this.onClearSearch} 
              onPressDistance = {this.onPressDistance}
            /> 
          
            <FlatList
              contentContainerStyle={styles.listContent}
              data={this.state.dataObjects}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              // ListHeaderComponent={this.renderHeader}
              // ListFooterComponent={this.renderFooter}
              ListEmptyComponent={this.renderEmpty}
              // ItemSeparatorComponent={this.renderSeparator}
            />

          </View>

        }

        {/* <View style={styles.spinnerContainer}>{ (fetching || syncing) && <Spinner />}</View> */}
        <View style={styles.spinnerContainer}>
          <MaKitSpinner
            show={fetching || syncing}
          />
        </View>

        {/* {
          this.state.alertCalled ?

            alert.type === 'alert-success' &&
            Alert.alert(
              'Guardado por distancia',
              alert.message,
              [
                {text: 'OK', onPress: () => this.props.clearAlert()},
              ],
              { cancelable: false }
            )

          :
          null
        }  */}

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    remitos: state.remitos.remitos,
    fetching: state.remitos.fetching,
    account: state.login,
    hojaruta: state.hojaruta.active,
    // sync
    sync: state.sync,
    location : state.location,
    alert: state.alert,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //requestRemitos: (hoja, todos) => dispatch(RemitosActions.remitosRequest(hoja, todos)),
    rehydrateRemitos: () => dispatch(RemitosActions.remitosRehydrate()),
    selectedRemitos: remito => dispatch(RemitosActions.remitoSelected(remito)),
    orderRemitos: (arrOrder) => dispatch(RemitosActions.remitosOrder(arrOrder)),
    attemptSync: () => dispatch(SyncActions.syncRequest()),
    // adquireLocation: (location) => dispatch(LocationActions.locationAdquire())
    clearAlert: () => dispatch(AlertActions.alertClear())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemitosListScreen);
