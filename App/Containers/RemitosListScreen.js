import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Icon, SearchBar } from "react-native-elements";
import openMap from "react-native-open-maps";
import getDirections from "react-native-google-maps-directions";

// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import RemitosActions from "../Redux/RemitosRedux";
// Styles
import styles from "./Styles/RemitosListScreenStyle";
import { Colors } from "../Themes";
// Components
import ItemRemito from "../Components/ItemRemito";
import Header from "../Components/Header";
import Spinner from "../Components/Spinner";

class RemitosListScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  goBack = () => this.props.navigation.navigate("HojaRutaScreen");

  state = {
    fetching: false,
    tabIndex: 0,
    dataObjects: this.props.remitos
  };

  renderRow = ({ item }) => {
    return (
      <ItemRemito
        latitud={this.state.latitude}
        longitud={this.state.longitude}
        onPressSingleItem={() => this.onPressSingleItem(item)}
        onPressOpenMaps={() => this.onPressOpenMaps(item)}
        item={item}
      />
    );
  };

  // renderRowOld({ item }) {

  //   const nombre = item.nombreDestinatario
  //     .toLowerCase()
  //     .trim()
  //     .split(' ')
  //     .reduce((nombre, item, index) => {
  //       return (nombre.substring(0, 1).toUpperCase() + nombre.substring(1) + ' ' + item.substring(0, 1).toUpperCase() + item.substring(1))
  //     })

  //   const domicilio = item.domicilioDestinatario
  //     .toLowerCase()
  //     .trim()
  //     .split(' ')
  //     .reduce((nombre, item, index) => {
  //       return (nombre.substring(0, 1).toUpperCase() + nombre.substring(1) + ' ' + item.substring(0, 1).toUpperCase() + item.substring(1))
  //     })

  //   const badge = {
  //     value: `$ ${item.importe} ${item.tipoPago.trim()}`,
  //     badgeContainerStyle: { right: 10, backgroundColor: '#56579B' },
  //     badgeTextStyle: { fontSize: 14, padding: 2 },
  //   };

  //   const customIconName = (item.domicilioDestinatario.indexOf("|TpoProp: CASA") === -1) ? "building-o" : "home"

  //   const customIcon = {
  //     name: customIconName,
  //     color: `${item.latitud.trim() === '' ? '#BFBFBF' : '#27ae60'}`,
  //     size: 30,
  //     type: 'font-awesome'
  //   }

  //   const customDomicilio = domicilio.split('|')[0].substring(0, 40)

  //   const dist = this.getDistance({ latitud: this.state.latitude, longitud: this.state.longitude }, { latitud: item.latitud, longitud: item.longitud })

  //   const distance = parseFloat(Math.round(dist * 100) / 100).toFixed(2) + ' kms';

  //   // console.log(distance);

  //   return (

  //     <View style={styles.shadow}>

  //       <TouchableOpacity style={styles.listitem} onPress={() => this.onPressSingleItem(item)}>

  //         <View style={{ flexDirection: 'row' }}>

  //           <View style={{ flex: 0.3 }}>

  //             <TouchableOpacity onPress={() => this.onPressOpenMaps(item)}>
  //               <Icon
  //                 name={customIconName}
  //                 color={item.latitud.trim() === '' ? '#BFBFBF' : '#27ae60'}
  //                 size={40}
  //                 type='font-awesome'
  //               />
  //             </TouchableOpacity>

  //           </View>

  //           <View style={{ flex: 2 }}>

  //             <View style={{ flexDirection: 'column' }}>

  //               <View >
  //                 <Text style={styles.numero}>{item.nroRemito}</Text>
  //               </View>

  //               <View >
  //                 <Text style={styles.distance}> {distance}</Text>
  //               </View>

  //             </View>

  //           </View>

  //         </View>

  //         <View>
  //           <Text style={styles.domicilio}>{customDomicilio}</Text>
  //         </View>

  //       </TouchableOpacity>
  //     </View>

  //   )

  // }

  // Render a header?
  renderHeader = () => (
    <View>
      <View style={{ flexDirection: "row", height: 40 }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.updateIndex(0)}
        >
          <Text
            style={[
              styles.textButtonGroup,
              this.state.tabIndex == 0 ? styles.textButtonSelected : ""
            ]}
          >
            Pendientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.updateIndex(1)}
        >
          <Text
            style={[
              styles.textButtonGroup,
              this.state.tabIndex == 1 ? styles.textButtonSelected : ""
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
      </View>

      <SearchBar
        onChangeText={this.onSearch}
        onClearText={this.onClearSearch}
        placeholder="Escriba aqui ..."
        lightTheme
        round
      />
    </View>
  );

  updateIndex = index => {
    // console.tron.log("updating index");
    // this.setState({ tabIndex: index });
    // switch (index) {
    //   case 0:
    //     //update the list
    //     this.onRequestingRemitos(false);
    //     break;
    //   case 1:
    //     //update the list
    //     this.onRequestingRemitos(true);
    //     break;
    // }
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
      dataObjects: newProps.remitos,
      data: newProps.remitos,
      fetching: newProps.fetching
    });
  }

  componentDidMount() {
    // get remitos list
    this.setState({ tabIndex: 0 });
    // this.onRequestingRemitos(false);
    // if (!this.props.remitos) {
    //   console.tron.log("remitosscreen-rehydrating");
    //   this.setState({ fetching: true });
    //   this.props.rehydrateRemitos();
    // }
    this.myCurrentPosition();
  }

  myCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
        // console.log("my position",position);
        // console.log("destination",this.state.marker.latitud);
        // this.mergeLot();
        // let start = this.state.latitude +","+ this.state.longitude
        // let end = this.state.marker.latitud +","+ this.state.marker.longitud
        // this.getDirections(start, end)
      },
      error =>
        this.setState({ error: error.message, latitude: 0, longitude: 0 }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
      // {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000}
    );
  }

  // onRequestingRemitos = todos => {
  //   this.setState({ fetching: true });
  //   this.props.requestRemitos(this.props.hojaruta.numeroHojaRuta, todos);
  // };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //console.tron.log({name:info, value:error})
  }

  onPressSingleItem = item => {
    // console.tron.log({ item: 'item', value: item })
    this.props.selectedRemitos(item);
    //navigation
    this.props.navigation.navigate("RemitoScreen");
  };

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

  onPressMarkers = () => {
    const markers = this.state.dataObjects
      .filter(function(item) {
        return item.latitud !== "";
      })
      .map(function(item) {
        return item;
      });
    this.props.navigation.navigate("MapScreen", { markers: markers });
  };

  render() {
    const { fetching } = this.state;

    return (
      <View style={styles.container}>
        <Header
          title="LISTA REMITOS"
          left={{ icon: "chevron-left", onPress: () => this.goBack() }}
        />

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          // ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          // ItemSeparatorComponent={this.renderSeparator}
        />

        <View style={styles.spinnerContainer}>{fetching && <Spinner />}</View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    remitos: state.remitos.remitos,
    fetching: state.remitos.fetching,
    user: state.login.payload,
    hojaruta: state.hojaruta.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // requestRemitos: (hoja, todos) =>
    //   dispatch(RemitosActions.remitosRequest(hoja, todos)),
    rehydrateRemitos: () => dispatch(RemitosActions.remitosRehydrate()),
    selectedRemitos: remito => dispatch(RemitosActions.remitoSelected(remito))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemitosListScreen);
