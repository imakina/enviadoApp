import React, { Component } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { connect } from "react-redux";
// import { Button } from "react-native-elements";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import HojaRutaActions from "../Redux/HojaRutaRedux";
// Components
import ButtonIcon from "../Components/ButtonIcon";
import Header from "../Components/Header";
import Spinner from "../Components/Spinner";
// Styles
import styles from "./Styles/HojaRutaScreenStyle";

// const PENDING_STATE = "0";

class HojaRutaScreen extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      fetching: false,
      dataObjects: this.props.hojas
    };
  }

  goBack = () => this.props.navigation.navigate("HomeScreen");

  componentDidMount() {
    // this.setState({ fetching: true });
    // this.props.requestHojaRuta(this.props.user.car_id, PENDING_STATE);
    // this.setState({ user : this.props.user })

    // In case we dont get any hojaruta
    // need to recover from async
    if (!this.props.hojas) {
      this.setState({ fetching: true });
      this.props.rehydrateHojaRuta();
    }
  }

  componentWillReceiveProps(newProps) {
    // console.tron.display({ name: "hojas", value: newProps.hojas });
    // if (newProps.hojas !== this.state.dataObjects)
    this.setState({
      dataObjects: newProps.hojas
    });

    this.setState({
      fetching: newProps.fetching
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
            onPress: () => console.log("Activada baby")
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
    // console.tron.log(item);
    const active = this.props.active == item.numeroHojaRuta;
    const alerta = active ? "ACTIVA, hoja de ruta actual" : "Debe descargarse";
    return (
      <View style={styles.groupHojas}>
        <View style={{ padding: 2 }}>
          <ButtonIcon
            icon={{ name: "map", type: "font-awesome" }}
            text={item.numeroHojaRuta}
            onPress={() => this.onPressingRemitosPorHojaRuta(item, active)}
            type={active ? "" : "inactive"}
          />
        </View>
        <View style={{ padding: 2 }}>
          <Text> {alerta} </Text>
          <Text> Remitos incluidos : 23 </Text>
          <Text> Para sincronizar : 20 </Text>
          <Text> Fendientes de actualizar : 3 </Text>
          <Text> Kms totales : 12km </Text>
          {/* <ButtonIcon
            icon={{ name: "check", type: "font-awesome" }}
            text={"Activar"}
            onPress={() => this.onActivateHojaRuta(item)}
          /> */}
        </View>
      </View>
    );
  }

  render() {
    const { fetching } = this.state;

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
        />

        <View style={styles.spinnerContainer}>{fetching && <Spinner />}</View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.tron.display({ name: "statepropsremitoslist", value: state });
  return {
    hojas: state.hojaruta.hojas,
    fetching: state.hojaruta.fetching,
    active: state.hojaruta.active,
    user: state.login.account
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
