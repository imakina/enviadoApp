import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { SearchBar, ButtonGroup } from "react-native-elements";
import styles from "../Containers/Styles/RemitosListScreenStyle";
import { Colors } from "../Themes/";
// import console = require("console");

// const component1 = () => <Text>Hello</Text>
// const component2 = () => <Text>World</Text>
// const component3 = () => <Text>ButtonGroup</Text>

export default class HeaderRemito extends Component {

  static propTypes = {
    tabIndex: PropTypes.number,
    saveproximity : PropTypes.bool,
    updateIndex : PropTypes.func,
    handleSaveProximity : PropTypes.func,
    onSearch : PropTypes.func,
    onClearSearch : PropTypes.func,
    onPressDistance : PropTypes.func
  };

  onChangeTab = newIndex => {
    // console.log("changing index to ", newIndex);
    this.props.updateIndex(newIndex);
  }
  
  updateIndex (selectedIndex) {
    // console.log("changing index to ", selectedIndex);
    this.props.updateIndex(selectedIndex);
  }

  pressDistance = () => {
    // console.tron.log('header press remito');
    this.props.onPressDistance();
  }
  
  render() {

    const buttons = ['Pendientes', 'Todos']
    const proximidad = this.props.saveproximity ? " Ordenado por proximidad ":" Ordenado por BackOffice "
        
    return (

      <View>

        <ButtonGroup
          selectedButtonStyle={{'backgroundColor':Colors.backgroundVariant}}
          selectedBackgroundColor={Colors.backgroundVariant}
          selectedTextStyle={{'color':Colors.snow}}
          onPress={this.onChangeTab}
          selectedIndex={this.props.tabIndex}
          buttons={buttons} />

        <SearchBar
          onChangeText={this.props.onSearch}
          onClearText={this.props.onClearSearch}
          placeholder="Escriba aqui ..."
          lightTheme
          round
        />

        { this.props.tabIndex == 0 ?

          <View style={styles.proximityCheck}>
            <Text style={styles.proximityCheckText}>{proximidad}</Text>
            <Switch
              value={this.props.saveproximity}
              onValueChange={() => this.props.handleSaveProximity()}
              disabled={false}
              // onTintColor={Colors.backgroundVariant}
              trackColor={Colors.backgroundVariant}
            />
            <TouchableOpacity
              style={{ 'backgroundColor':Colors.backgroundVariant, padding:7, margin: 3 }}
              onPress={() => this.pressDistance()}>
              <Text>Guardar</Text>
            </TouchableOpacity>
          </View>
          
        :
          null
        }

      </View>
    );
  }
}
