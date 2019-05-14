import React from "react";
import { View, Text, FlatList, Alert, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
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
import MaKitButton from '../Components/MaKitButton';
import MaKitSpinner from '../Components/MakitSpinner'

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
  keyExtractor = (item, index) => index.toString();

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20;

  onSpread = (arr) => {
    return arr.slice();
  }

  componentWillReceiveProps(newProps) {
    // console.log("nrew props",newProps);

    if (this.props.user.deposito)
      this.setState({
        dataObjects: this.onSpread(newProps.packages.legacy)});
  }

  componentDidMount() {}

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
    const numberList = '0123456789';
    const charList = 'abcdefghijklmnopqrstuvwxyz';

    // check duplicity
    if (this.state.dataObjects.includes(package_scanned))
      isduplicated = true; 
    
    if (this.props.user.deposito)
      this.props.packages.packages.map((elem) => {
        if (elem.codigoqr == package_scanned) {
          // console.log("duplicated", package_scanned)
          isduplicated = true;
        }
      });

    // if (charList.indexOf(package_scanned.toLowerCase()) > -1 && 
    // numberList.indexOf(package_scanned) > -1)
    //   isduplicated = true;

    if (isduplicated) return;
    // end check duplicity
    
    // only if its not deposito
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

    this.props.updatePackage(package_scanned, idordenretiro_qr, this.state.scan, this.state.signature);
    
  }
 
  onScanned = scanned => {
    console.tron.log({ name: "package_receive_scan", value: scanned });
    console.log("package_receive_scan", scanned);
    this.setState({ scan : scanned });
    // this.onSigning()
  };

  // called from signature
  onSignature = sign => {
    console.tron.log({ name: "package_receive_signature", value: sign });
    console.log("package_receive_signature", sign)
    this.setState({ signature: sign }, function() {
      this.props.savePackage()
    });
  };
  
  // onSavePakages = () => {
  //   this.props.navigation.navigate("SignatureScreen", {
  //     onBarcode: this.onScanned,
  //     onSign: this.onSignature,
  //     step: "barcode"
  //   });
  // }

  onSavePakages = () => {
    // this.props.navigation.navigate("SignatureScreen", {
    //   onBarcode: this.onScanned,
    //   onSign: this.onSignature,
    //   step: "barcode"
    // });
    this.props.savePackage()
  }



  render() {

    const { alert, fetching } = this.props
    const headerTitle = `REMITOS   ${this.props.packages.packages.length} / ${this.props.packages.legacy.length}`  

    return (

      <ScrollView style={styles.container}>

        <Header
          title={headerTitle}
          left={{ icon: "chevron-left", onPress: () => this.goBack() }}
          right={{ icon: "camera", onPress: () => this.onCamera() }}
        />

        <View>
        
          {
            fetching ?
              null
            :
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
        }

        <View style={styles.spinnerContainer}>
          <MaKitSpinner
            show={fetching}
          />
        </View>


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

      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  // console.log("thepackages",state)
  return {
    packages: state.packages,
    fetching: state.packages.fetching,
    user: state.login,
    ordenretiro: state.ordenretiro.active,
    alert: state.alert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestPackages: (ordenretiro) => dispatch(PackagesActions.packagesRequest(ordenretiro)),
    savePackage: () => dispatch(PackagesActions.packageSave()),
    updatePackage: (thispackage, deposito) => dispatch(PackagesActions.packageUpdate(thispackage, deposito)),
    clearAlert: () => dispatch(AlertActions.alertClear())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesListScreen);
