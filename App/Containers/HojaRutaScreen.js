import React, { Component } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { connect } from "react-redux";
// import { Button } from "react-native-elements";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import HojaRutaActions from "../Redux/HojaRutaRedux";
// Components
import MaKitButton from "../Components/MaKitButton";
import Header from "../Components/Header";
// import Spinner from "../Components/Spinner";
import MaKitSpinner from '../Components/MakitSpinner'
// Styles
import styles from "./Styles/HojaRutaScreenStyle";

// const PENDING_STATE = "0";

class HojaRutaScreen extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      fetching: false,
      dataObjects: this.props.hojaruta.hojas,
      active: this.props.hojaruta.active
    };
  }

  goBack = () => this.props.navigation.navigate("HomeScreen");

  componentDidMount() {
    // this.setState({ fetching: true });
    // this.props.requestHojaRuta(this.props.user.car_id, PENDING_STATE);
    // this.setState({ user : this.props.user })
    // In case we dont get any hojaruta
    // need to recover from async
    // if (!this.props.hojas) {
    //   this.setState({ fetching: true });
    //   this.props.rehydrateHojaRuta();
    // }
  }

  componentWillReceiveProps(newProps) {
    // console.tron.display({ name: "newProps", value: newProps.hojaruta.active });
    // if (newProps.hojas !== this.state.dataObjects)
    this.setState({
      dataObjects: newProps.hojaruta.hojas,
      active: newProps.hojaruta.active,
      fetching: newProps.hojaruta.fetching
    });
  }

  onPressingRemitosPorHojaRuta = (item, active) => {
    //hojarutaselected
    if (active) this.props.navigation.navigate("RemitosListScreen");
    else {
      Alert.alert(
        "Hoja NO Activa",
        "Esta hoja debe descargarse para poder trabajar, si la descarga, perdera los datos que no se hayan sincronzado en la hoja activa actual, quiere descargarla de todos modos?",
        [
          {
            text: "Activarla",
            onPress: () => this.onActivateHojaRuta(item)
          },
          {
            text: "No, continuo con la actual",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
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
    let text =
      this.state.dataObjects === null
        ? "No tiene asignadas hojas de rutas"
        : "Hojas disponibles";
    return <Text style={styles.help}>{text}</Text>;
  };

  renderRow({ item }) {
    const active = this.state.active == item.numeroHojaRuta;
    const alerta = active
      ? "Hoja de ruta ACTIVA"
      : "Debe descargarse para comenzar a actualizar";
    return (
      <View style={styles.groupHojas}>
        <View style={{ padding: 2 }}>
          <MaKitButton
            icon={{ name: "map", type: "font-awesome" }}
            text={item.numeroHojaRuta}
            onPress={() => this.onPressingRemitosPorHojaRuta(item, active)}
            type={active ? "" : "inactive"}
          />
        </View>
        <View style={{ paddingTop: 8 }}>
          <Text> {alerta} </Text>
          <Text></Text>
          {active ? (
            <View>
              <Text> Remitos totales : {this.props.remitos.quantity} </Text>
              <Text> Pendientes de syncronización : {this.props.remitos.updated}</Text>
              <Text> Distancia total : 12000 km</Text>
              <Text>
                {/* {" "}
                Sin Cambios :
                {this.props.remitos.quantity - this.props.remitos.updated} */}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  render() {
    const { fetching } = this.props;
    // console.tron.log("re-render", this.props.hojaruta.active);
    return (
      <View style={styles.container}>
        <Header
          title="HOJAS DE RUTA"
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

        <View style={styles.spinnerContainer}>
            <MaKitSpinner show={fetching}/>
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.tron.display({ name: "statepropsremitoslist", value: state });
  return {
    // hojas: state.hojaruta.hojas,
    fetching: state.hojaruta.fetching,
    // active: state.hojaruta.active,
    hojaruta: state.hojaruta,
    user: state.login.account,
    remitos: state.remitos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // requestHojaRuta: (car_id, estado) =>
    //   dispatch(HojaRutaActions.hojaRutaRequest(car_id, estado)),
    rehydrateHojaRuta: () => dispatch(HojaRutaActions.hojaRutaRehydrate()),
    activeHojaRuta: hr => dispatch(HojaRutaActions.hojaRutaActive(hr))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HojaRutaScreen);
