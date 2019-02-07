import React from "react";
import { View, Text, FlatList, TouchableOpacity,  Switch } from "react-native";
import { connect } from "react-redux";
import getDirections from "react-native-google-maps-directions";
// import PackagesActions from "../Redux/PackagesRedux";
// import SyncActions from "../Redux/SyncRedux";
// import LocationActions from "../Redux/LocationRedux";
// Styles
import styles from "./Styles/PackagesListScreenStyle";
// import { Colors } from '../Themes'
// Components
import ItemRemito from "../Components/ItemRemito";
import HeaderRemito from "../Components/HeaderRemito";
import Header from "../Components/Header";
import Spinner from "../Components/Spinner";

class PackagesListScreen extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.clearWatch();
    this.props.navigation.navigate("WelcomeScreen");
  }

  state = {
    fetching: false,
    updating : false,
    tabIndex: 0,
    dataObjects: {},
    saveproximity : false,
    latitude : null,
    longitude : null
  };

  renderRow = ({ item }) => {
    return (
      <ItemRemito
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
  }

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

  componentWillReceiveProps(newProps) {
    //console.tron.display({name: 'props', value: newProps})
    this.setState({
      sync: newProps.sync,
      dataObjects: newProps.remitos,
      data: newProps.remitos,
      fetching: newProps.fetching,
    });

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
    this.myWatchPosition();
  }

  componentWillUnmount() {
    this.clearWatch();
  }

  watchID = null;

  myWatchPosition() {
    console.log("init myWatchPosition",this.watchID)
    this.setState({ gpsfetch : true })

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          gpsfetch : false,
          error: null,
        }, 
          () => {
            console.log("myWatchPosition get new position", this.state.latitude)
            this.onAdquireLocation(position.coords.latitude, position.coords.longitude);
            this.updateIndex(0);
          }
        );
      },
      (error) => { 
        this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
        console.log('error',error)
        this.setState({ gpsfetch : false })
      }
    );
  }

  onRequestingRemitos = todos => {
    this.setState({ fetching: true });
    this.props.requestRemitos(this.props.hojaruta.numeroHojaRuta, todos);
  };  
   

  onPressSingleItem = item => {
    // console.tron.log({ item: 'item', value: item })
    this.props.selectedRemitos(item);
    //clearwatch
    this.clearWatch();
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
    });
  }

  onCapturePackage = packagescanned => {
    var dataCloned = [ ...this.state.dataObjects]
    dataCloned.push(packagescanned);
    this.setState({ dataObjects: dataCloned })
  }

  // distance gps
  getDistance = destination => {

    if (!this.state.latitude) {
      // console.log("invalid coords ", this.state.latitude)
      return "?";
    }

    // console.log("Dest",destination);
    // console.log("state",this.state.longitude);
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(destination.latitud - this.state.latitude); 
    const dLon = this.deg2rad(destination.longitud - this.state.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.state.latitude)) *
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

    return (
      <View style={styles.container}>

        <Header
          title="PACKAGES"
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
            // ListFooterComponent={this.renderFooter}
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
