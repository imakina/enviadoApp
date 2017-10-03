import React, { Component } from 'react'
import { View, Text, FlatList, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Header } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import HojaRutaActions from '../Redux/HojaRutaRedux'

import NavigationBar from 'react-native-navbar';

// Styles
import styles from './Styles/HojaRutaScreenStyle'
import I18n from 'react-native-i18n'

class HojaRutaScreen extends Component {
  
  state = {
    fetching:false,
    dataObjects: []
  }

  componentDidMount () {
    this.setState({ fetching: true })
    this.props.requestHojaRuta('31914','0')
  }

  componentWillReceiveProps (newProps) {
    //console.tron.display({name: 'props', value: newProps})
    this.setState({ dataObjects: newProps.payload })
    this.setState({ fetching: newProps.fetching })
  }

  renderRow ({item}) {

    return (
    //{"numeroHojaRuta":"00000045","car_id":"31913","fletero":"Gorosito Jose","estado":"2"},
    //{"numeroHojaRuta":"00000161","car_id":"31913","fletero":"Gorosito Jose","estado":"2"},
    <ListItem
        hideChevron
        title={item.numeroHojaRuta}
        subtitle={item.car_id}
        //badge={badge} 
        containerStyle={{ backgroundColor: 'white' }}
        //onPress={() => this.onPressSingleItem(item)} 
      />
    )

  }

  render () {
    
    const leftButtonConfig = {
      title: I18n.t('back'),
      handler: () => this.props.navigation.navigate('HomeScreen'),
    }

    const titleConfig = {
      title: 'Hoja de Ruta',
    }
  
    return (

      <View style={styles.container}>

        <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
        />

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          //keyExtractor={this.keyExtractor}
          //initialNumToRender={this.oneScreensWorth}
          //ListHeaderComponent={this.renderHeader}
          // ListFooterComponent={this.renderFooter}
          //ListEmptyComponent={this.renderEmpty}
          // ItemSeparatorComponent={this.renderSeparator}
        />

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payload: state.hojaruta.payload,
    fetching: state.hojaruta.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestHojaRuta: (car_id,estado) => dispatch(HojaRutaActions.hojaRutaRequest(car_id,estado))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HojaRutaScreen)
