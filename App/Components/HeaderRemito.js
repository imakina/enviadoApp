import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { SearchBar } from "react-native-elements";
import styles from "../Containers/Styles/RemitosListScreenStyle";
import { Colors } from "../Themes/";

export default class HeaderRemito extends Component {

  static propTypes = {
    tabIndex: PropTypes.number,
    saveproximity : PropTypes.bool,
    updateIndex : PropTypes.func,
    handleSaveProximity : PropTypes.func,
    onSearch : PropTypes.func,
    onClearSearch : PropTypes.func,
  };

  render() {

    return (
      <View>
        <View style={{ flexDirection: "row", height: 40 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={()=>this.props.updateIndex(0)}
          >
            <Text
              style={[
                styles.textButtonGroup,
                this.props.tabIndex == 0 ? styles.textButtonSelected : ""
              ]}
            >
              Pendientes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={()=>this.props.updateIndex(1)}
          >
            <Text
              style={[
                styles.textButtonGroup,
                this.props.tabIndex == 1 ? styles.textButtonSelected : ""
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
        </View>

        { this.props.tabIndex == 0 ?
        <View style={styles.proximityCheck}>
          <Text style={styles.proximityCheckText}>
          {
            this.props.saveproximity ? " Ordenado por proximidad ":" Ordenado por BackOffice "
          }
          </Text>
          <Switch
              value={this.props.saveproximity}
              onValueChange={this.props.handleSaveProximity}
              disabled={false}
              onTintColor={Colors.backgroundVariant}
            />
        </View>
        :
        null
        }
        <SearchBar
          onChangeText={this.props.onSearch}
          onClearText={this.props.onClearSearch}
          placeholder="Escriba aqui ..."
          lightTheme
          round
        />
      </View>
    );
  }
}
