import React from "react";
import { View, Text, FlatList, Alert, ScrollView } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { connect } from "react-redux";
// import getDirections from "react-native-google-maps-directions";
// import YourActions from '../Redux/YourRedux'
import PackagesActions from "../Redux/PackagesRedux";
import AlertActions from '../Redux/AlertRedux'

// Styles
import styles from "./Styles/PackagesListScreenStyle";
import { Colors } from '../Themes'
// Components
import Header from "../Components/Header";
import MaKitButton from '../Components/MaKitButton'

class PackagesListScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      updating : false,
      dataObjects: [],
      scanned : [],
      // packages : this.props.packages.packages 
    };
  }

  goBack = () => {
    this.props.navigation.navigate("OrdenRetiroScreen");
  }

  // subtitle={new Date().toLocaleString('es-EN', { hour12: true, 
                                      //  hour: "numeric", 
                                      //  minute: "numeric"})}
                                      // title={item.NUMERO_REMITO}
  
  getItem= (item) => {

    let matched = 'transparent';

    if (this.props.user.deposito)
      this.props.packages.packages.map((elem) => {
        // console.log(elem.codigoqr + ' ' +  item.codigo_qr);
        if (elem.codigoqr == item.codigo_qr)
          matched = Colors.backgroundVariant;
      })

    return (this.props.user.deposito) ?
      { 
        title : item.codigo_qr,
        containerStyle : { backgroundColor : matched }
      }
    :
      {
        title : item,
        containerStyle : { }
      }

  }
                                    

  renderRow = ({ item }) => {

    // console.log(item)

    return (

      <ListItem
        // leftIcon={{ name : 'radio-button-checked'}}
        leftIcon={{ name : 'radio-button-checked', color: 'gray'}}
        {...this.getItem(item)}
      />

    );
  };

  // Render a footer?
  renderFooter = () => {};

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

  renderSeparator = () => 
  <View
    style={{
      height: 1,
      width: "86%",
      backgroundColor: "#CED0CE",
      marginLeft: "14%"
    }}
  />;

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index;

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20;

  // onSearch = some => {
  //   // console.tron.log(some)
  //   if (some.length == 0) {
  //     data = this.state.data;
  //   } else {
  //     data = this.state.data
  //       .filter(item => item.nroRemito.indexOf(some) > 0)
  //       .map(item => item);
  //   }

  //   this.setState({
  //     dataObjects: data
  //   });
  // };

  // onClearSearch = () => {
  //   this.setState({
  //     dataObjects: this.state.data
  //   });
  // };

  onSpread = (arr) => {
    return arr.slice();
  }

  componentWillReceiveProps(newProps) {
    // console.log("nrew props",newProps);

    if (this.props.user.deposito)
      this.setState({
        dataObjects: this.onSpread(newProps.packages.legacy)});
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
  onCapturePackage = package_scanned => {
    let isduplicated = false;
    let idordenretiro_qr = "";
    //console.log(package_scanned);
    // let newStateArray = this.state.dataObjects.toJS();
    
    // check duplicity
    // console.log(package_scanned + 'is duplicated');
    if (this.state.dataObjects.includes(package_scanned))
      isduplicated = true; 
    
    if (this.props.user.deposito)
      this.props.packages.packages.map((elem) => {
        if (elem.codigoqr == package_scanned) {
          // console.log("duplicated", package_scanned)
          isduplicated = true;
        }
      });

    if (isduplicated) return;
    // end check duplicity
    
    // 
    // console.log('newState',newStateArray);
    if (!this.props.user.deposito) {
      let newStateArray = this.state.dataObjects.slice();
      newStateArray.push(package_scanned);
      this.setState({dataObjects: newStateArray});
    }
    // 

    if (this.props.user.deposito)
      this.props.packages.legacy.map((elem) => {
        if (elem.codigo_qr == package_scanned) {
          // console.log("duplicated", package_scanned)
          idordenretiro_qr = elem.id_orden_retiro_qr;
        }
      });

    // build unique payload
    // let new_package = {}
    //   new_package.codigoqr=package_scanned,
    //   new_package.car_id=this.props.user.account.car_id,
    //   new_package.orden_retiro=this.props.ordenretiro,
    //   new_package.latitud=-34.34,
    //   new_package.longitud=-54.23,
    // end build unique
    
    // console.log("newpackage",new_package);
    // this.props.updatePackage(new_package);
    this.props.updatePackage(package_scanned, idordenretiro_qr);
    
  }

  onSavePakages = () => {
    this.props.savePackage();
  }

  render() {

    const { alert } = this.props
    const headerTitle = `REMITOS   ${this.props.packages.packages.length} / ${this.props.packages.legacy.length}`  

    return (

      <ScrollView style={styles.container}>

        <Header
          title={headerTitle}
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
            // ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.renderSeparator}
          />

          {
            this.state.dataObjects.length > 0 &&

              <View style={styles.formContainer}>
                <MaKitButton
                  icon={{ name: "check", type : "font-awesome", color: "white" }}
                  text={"ENVIAR"}
                  type={"order"}
                  onPress={() => this.onSavePakages()} 
                  style={{marginTop:10, marginBottom: 10}}
                />
              </View>
          }

        </View>

        {
          alert.type === 'alert-success' &&
            Alert.alert(
              'Paquetes',
              alert.message,
              [
                {text: 'OK', onPress: () => this.props.clearAlert()},
              ],
              { cancelable: false }
            )
        }

        {/* <Text style={styles.infotext}>
          esta orden contiene {this.props.packages.legacy.length} paquetes.
        </Text>

        <Text style={styles.infosubtext}>
            de los cuales han sido escaneados {this.props.packages.packages.length} paquetes.
        </Text> */}

      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  // console.log("thepackages",state)
  return {
    // remitos: state.remitos.remitos,
    packages: state.packages,
    fetching: state.remitos.fetching,
    user: state.login,
    // hojaruta: state.hojaruta.active,
    ordenretiro: state.ordenretiro.active,
    // sync
    // sync: state.sync,
    // location : state.location
    alert: state.alert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //requestRemitos: (hoja, todos) => dispatch(RemitosActions.remitosRequest(hoja, todos)),
    requestPackages: (ordenretiro) => dispatch(PackagesActions.packagesRequest(ordenretiro)),
    // rehydrateRemitos: () => dispatch(RemitosActions.remitosRehydrate()),
    // selectedRemitos: remito => dispatch(RemitosActions.remitoSelected(remito)),
    // attemptSync: () => dispatch(SyncActions.syncRequest()),
    // adquireLocation: (location) => dispatch(LocationActions.locationAdquire()),
    savePackage: () => dispatch(PackagesActions.packageSave()),
    updatePackage: (thispackage, deposito) => dispatch(PackagesActions.packageUpdate(thispackage, deposito)),
    clearAlert: () => dispatch(AlertActions.alertClear())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesListScreen);
