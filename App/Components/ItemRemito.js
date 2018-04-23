import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./Styles/ItemRemitoStyles";
import { Colors } from "../Themes/";

export default class ItemRemito extends Component {
  static propTypes = {
    latitud: PropTypes.number,
    longitud: PropTypes.number,
    item: PropTypes.object,
    onPressSingleItem: PropTypes.func,
    onPressOpenMaps: PropTypes.func
  };

  // distance gps
  getDistance = destination => {
    // console.tron.log(this.props.latitud + " " + destination.latitud);
    // console.tron.log(this.props.longitud + " " + destination.longitud);
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(destination.latitud - this.props.latitud); // this.deg2rad below
    const dLon = this.deg2rad(destination.longitud - this.props.longitud);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.props.latitud)) *
        Math.cos(this.deg2rad(destination.latitud)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km

    if (d > 100) return "N/D";

    return d || "N/D";
  };

  deg2rad = deg => {
    return deg * (Math.PI / 180);
  };
  // end distance gps

  render() {
    const { item } = this.props;

    // const nombre = item.nombreDestinatario
    //   .toLowerCase()
    //   .trim()
    //   .split(" ")
    //   .reduce((nombre, item, index) => {
    //     return (
    //       nombre.substring(0, 1).toUpperCase() +
    //       nombre.substring(1) +
    //       " " +
    //       item.substring(0, 1).toUpperCase() +
    //       item.substring(1)
    //     );
    //   });

    const domicilio = item.domicilioDestinatario
      .toLowerCase()
      .trim()
      .split(" ")
      .reduce((nombre, item, index) => {
        return (
          nombre.substring(0, 1).toUpperCase() +
          nombre.substring(1) +
          " " +
          item.substring(0, 1).toUpperCase() +
          item.substring(1)
        );
      });

    const customIconName =
      item.domicilioDestinatario.indexOf("|TpoProp: CASA") === -1
        ? "building-o"
        : "home";
    const customDomicilio = domicilio.split("|")[0].substring(0, 40);

    const tempDist = this.getDistance({
      latitud: item.latitud,
      longitud: item.longitud
    });
    // format distance
    const distance = isNaN(tempDist)
      ? tempDist
      : parseFloat(Math.round(tempDist * 100) / 100).toFixed(2) + " kms";

    const updated = item.estado_mobile == 7;

    return (
      <View style={styles.shadow}>
        <TouchableOpacity
          style={[styles.listitem, updated ? styles.updated : ""]}
          onPress={this.props.onPressSingleItem}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.3 }}>
              <TouchableOpacity onPress={this.props.onPressOpenMaps}>
                <Icon
                  name={customIconName}
                  color={item.latitud.trim() === "" ? "#BFBFBF" : "#27ae60"}
                  size={40}
                  type="font-awesome"
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 2 }}>
              <View style={{ flexDirection: "column" }}>
                <View>
                  <Text style={styles.numero}>
                    {item.nroRemito}
                    {updated ? " (actualizado)" : ""}
                  </Text>
                </View>
                <View>
                  <Text style={styles.distance}>{distance}</Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.domicilio}>{customDomicilio}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
