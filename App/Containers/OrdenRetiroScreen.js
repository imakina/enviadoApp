import React, { Component } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
// import { Button } from "react-native-elements";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import OrdenRetiroActions from "../Redux/OrdenRetiroRedux";
// Components
// import ButtonIcon from "../Components/ButtonIcon";
import Header from "../Components/Header";
import Spinner from "../Components/Spinner";
// Styles
import styles from "./Styles/OrdenRetiroScreenStyle";

import { Colors } from '../Themes'

class OrdenRetiroScreen extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      fetching: this.props.ordenretiro.fetching,
      dataObjects: [],
      active: null
      // dataObjects: this.props.ordenes.ordenes,
      // active: this.props.ordenes.active
    };
  }

  goBack = () => this.props.navigation.navigate("WelcomeScreen");

  componentDidMount() {

    this.setState({ fetching: true });
    this.props.getOrdenRetiro();

  }

  componentWillReceiveProps(newProps) {

    // console.log("newpropos",newProps);
    
    this.setState({
      dataObjects: newProps.ordenretiro.ordenes,
      active: newProps.ordenretiro.active,
      fetching: newProps.ordenretiro.fetching
    });

  }

  onPressingPackagesPorOrdenRetiro = (item, active) => {

    this.props.activeOrdenRetiro(item.ID_ORDEN_RETIRO);
    this.props.navigation.navigate("PackageListScreen");

    //hojarutaselected
    // if (active) this.props.navigation.navigate("PackageListScreen");
    // else {
    //   Alert.alert(
    //     "Hoja NO Activa",
    //     "Esta hoja debe descargarse para poder trabajar, si la descarga, perdera los datos que no se hayan sincronzado en la hoja activa actual, quiere descargarla de todos modos?",
    //     [
    //       {
    //         text: "Activarla",
    //         onPress: () => this.onActivateHojaRuta(item)
    //       },
    //       {
    //         text: "No, continuo con la actual",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel"
    //       }
    //     ],
    //     { cancelable: false }
    //   );
    // }
  };

  onActivateHojaRuta = item => {
    //hojarutaselected
    this.setState({ fetching: true });
    this.props.activeHojaRuta(item.numeroHojaRuta);
  };

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index;

  renderHeader = () => {
    // console.tron.display({name: 'dataobjects', value: this.state.dataObjects})
    let text = this.state.dataObjects === null
        ? "No tiene Ordenes de Retiro disponibles"
        : "Ordenes disponibles";
    return <Text style={styles.help}>{text}</Text>;
  };

  renderRow({ item }) {
    const active = true; //this.state.active == item.NUMERO_ORDEN_RETIRO;
    const alerta = active
      ? "Orden de Retiro ACTIVA"
      : "Debe descargarse para comenzar a actualizar";
    return (
      <View style={styles.groupHojas}>
        <View style={{ padding: 2 }}>
          {/* <ButtonIcon
            icon={{ name: "map", type: "font-awesome" }}
            text={item.numeroHojaRuta}
            onPress={() => this.onPressingPackagesPorOrdenRetiro(item, active)}
            type={active ? "" : "inactive"}
          /> */}
          <Button
            icon={{
              name: "map",
              size: 30,
              color: "white",
              type : "font-awesome"
            }}
            title={item.NUMERO_ORDEN_RETIRO}
            buttonStyle={{backgroundColor:Colors.facebook, borderRadius: 5, marginTop: 10}}
            onPress={() => this.onPressingPackagesPorOrdenRetiro(item, active)}
          />
        </View>
      </View>
    );
  }

  render() {
    const { fetching } = this.props.ordenretiro.fetching;
    // console.tron.log("re-render", this.props.hojaruta.active);
    return (
      <View style={styles.container}>
        <Header
          title="ORDEN DE RETIRO"
          left={{ icon: "chevron-left", onPress: () => this.goBack() }}
        />

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
          //initialNumToRender={this.oneScreensWorth}
          // ListFooterComponent={this.renderFooter}
          //ListEmptyComponent={this.renderEmpty}
          // ItemSeparatorComponent={this.renderSeparator}
          extraData={[this.state.active, this.state.fetching]}
        />

        <View style={styles.spinnerContainer}>{fetching && <Spinner />}</View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state",state);
  return {
    user: state.login.account,
    packages: state.packages,
    ordenretiro: state.ordenretiro
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rehydrateOrdenRetiro: () => dispatch(OrdenRetiroActions.ordenRetiroRehydrate()),
    activeOrdenRetiro: hr => dispatch(OrdenRetiroActions.ordenRetiroActive(hr)),
    getOrdenRetiro: () => dispatch(OrdenRetiroActions.ordenRetiroRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdenRetiroScreen);
