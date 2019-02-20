import React from "react";
import { View, Text, FlatList } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { connect } from "react-redux";
// import getDirections from "react-native-google-maps-directions";
// import YourActions from '../Redux/YourRedux'
import PackagesActions from "../Redux/PackagesRedux";
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
    this.props.navigation.navigate("OrdenRetiroScreen");
  }

  state = {
    fetching: false,
    updating : false,
    dataObjects: [],
  };

  renderRow = ({ item }) => {

    return (

      <ListItem
        // key={i}
        leftIcon={{ name : 'radio-button-checked'}}
        // title={item.NUMERO_REMITO}
        title={item}
        rightElement={null}
        // subtitle={new Date().toLocaleString('es-EN', { hour12: true, 
                                            //  hour: "numeric", 
                                            //  minute: "numeric"})}
      />
    );
  };

  // Render a footer?
  renderFooter = () => {
    if (this.state.dataObjects.length > 0)
      return  (
        <View>

          <Button
            icon={{
              name: "check",
              size: 30,
              color: "white",
              type : "font-awesome"
            }}
            title={"Enviar"}
            buttonStyle={{backgroundColor:Colors.facebook, borderRadius: 5, marginTop: 10}}
            onPress={() => this.onSavePakages()}
          />

        </View>
      )
    else
        return null
  };

  // Show this when data is empty
  renderEmpty = () => {

    // if (this.state.fetching)
      return (
        <View>
          <Text
            style={[
              styles.item,
              { padding: 20, textAlign: "center", marginTop: 30 }
            ]}
          >
            Presione el icono de la camara para comenzar a escanear
          </Text>
        </View>
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
    // console.tron.display({name: 'props', value: newProps})
    // console.log('changeProps', newProps);
    
    // this.setState({
    //   sync: newProps.sync,
    //   dataObjects: newProps.packages,
    //   data: newProps.packages,
    //   fetching: newProps.fetching,
    // });

  }

  componentDidMount() {
  }

  // fire event
  onCamera() {
    // Camera on, param function to save producto
    this.props.navigation.navigate("SignatureScreen", {
      onPackage: this.onCapturePackage, 
      step : "package"
    });
  }

  // callback event
  onCapturePackage = packagescanned => {
    //console.log(packagescanned);
    let newStateArray = this.state.dataObjects.slice();
    newStateArray.push(packagescanned);
    this.setState({dataObjects: newStateArray});

    // build unique payload
    let new_package = {}
      new_package.codigoqr=packagescanned,
      new_package.car_id=this.props.user.car_id,
      new_package.id_orden_retiro_qr=this.props.ordenretiro,
      new_package.latitud=-34.34,
      new_package.longitud=-54.23,
    // end build unique
    console.log("newpackage",new_package);
    this.props.updatePackage(new_package);
  }

  onSavePakages = () => {
    this.props.savePackage();
  }

  render() {

    return (
      <View style={styles.container}>

        <Header
          title="PAQUETES"
          left={{ icon: "chevron-left", onPress: () => this.goBack() }}
          right={{ icon: "camera", onPress: () => this.onCamera() }}
        />

        <View>
        
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

        <Text style={styles.infotext}>
          esta orden contiene {this.props.packages.legacy.length} paquetes.
        </Text>

        <Text style={styles.infosubtext}>
            de los cuales han sido escaneados {this.props.packages.packages.length} paquetes.
        </Text>

      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log("thepackages",state)
  return {
    // remitos: state.remitos.remitos,
    packages: state.packages,
    fetching: state.remitos.fetching,
    user: state.login.account,
    // hojaruta: state.hojaruta.active,
    ordenretiro: state.ordenretiro.active,
    // sync
    // sync: state.sync,
    // location : state.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //requestRemitos: (hoja, todos) => dispatch(RemitosActions.remitosRequest(hoja, todos)),
    requestPackages: (ordenretiro) => dispatch(PackagesActions.packagesRequest(ordenretiro)),
    // rehydrateRemitos: () => dispatch(RemitosActions.remitosRehydrate()),
    // selectedRemitos: remito => dispatch(RemitosActions.remitoSelected(remito)),
    // attemptSync: () => dispatch(SyncActions.syncRequest()),
    adquireLocation: (location) => dispatch(LocationActions.locationAdquire()),
    savePackage: () => dispatch(PackagesActions.packageSave()),
    updatePackage: thispackage => dispatch(PackagesActions.packageUpdate(thispackage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesListScreen);
