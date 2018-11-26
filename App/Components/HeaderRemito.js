import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { SearchBar, ButtonGroup } from "react-native-elements";
import styles from "../Containers/Styles/RemitosListScreenStyle";
import { Colors } from "../Themes/";

const component1 = () => <Text>Hello</Text>
const component2 = () => <Text>World</Text>
const component3 = () => <Text>ButtonGroup</Text>

export default class HeaderRemito extends Component {

  static propTypes = {
    tabIndex: PropTypes.number,
    saveproximity : PropTypes.bool,
    updateIndex : PropTypes.func,
    handleSaveProximity : PropTypes.func,
    onSearch : PropTypes.func,
    onClearSearch : PropTypes.func,
  };

  onChangeTab = newIndex => {
    console.log("changing index to ", newIndex);
    this.props.updateIndex(newIndex);
  }
  
  updateIndex (selectedIndex) {
    // this.setState({selectedIndex})
    console.log("changing index to ", selectedIndex);
    this.props.updateIndex(selectedIndex);
  }
  
  render() {

    // console.log("tab",this.props.tabIndex);
    const buttons = ['Pendientes', 'Todos']
    // const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    //const { selectedIndex } = this.state

    return (

      <View>

        <ButtonGroup
          selectedBackgroundColor={Colors.backgroundVariant}
          selectedTextStyle={{'color':Colors.snow}}
          onPress={this.onChangeTab}
          selectedIndex={this.props.tabIndex}
          buttons={buttons} />

        { /* 
        <TouchableOpacity
          <View style={{ flexDirection: "row", height: 40 }}>
          

            style={{ flex: 1 }}
            onPress={()=>this.onChangeTab(0)}
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
            onPress={()=>this.onChangeTab(1)}
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

        */ }

        <SearchBar
          onChangeText={this.props.onSearch}
          onClearText={this.props.onClearSearch}
          placeholder="Escriba aqui ..."
          lightTheme
          round
        />

        { this.props.tabIndex == 0 ?
          <View style={styles.proximityCheck}>
            <Text style={styles.proximityCheckText}>
            {
              this.props.saveproximity ? " Ordenado por proximidad ":" Ordenado por BackOffice "
            }
            </Text>
            <Switch
              value={this.props.saveproximity}
              onValueChange={() => this.props.handleSaveProximity()}
              disabled={false}
              onTintColor={Colors.backgroundVariant}
            />
          </View>
        :
          null
        }

      </View>
    );
  }
}
