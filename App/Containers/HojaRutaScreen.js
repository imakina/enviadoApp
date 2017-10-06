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

var Spinner = require('react-native-spinkit')

class HojaRutaScreen extends Component {
  
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      car_id : props.navigation.state.params.car_id
    }
    //this.onPressingRemitosPorHojaRuta = this.onPressingRemitosPorHojaRuta.bind(this);
  }

  state = {
    fetching:false,
    dataObjects: []
  }

  componentDidMount () {
    this.setState({ fetching: true })
    // this.props.requestHojaRuta(this.state.car_id,'0')
    this.props.requestHojaRuta(this.props.user.car_id,'0')
  }

  componentWillReceiveProps (newProps) {
    //console.tron.display({name: 'props', value: newProps})
    this.setState({ dataObjects: newProps.payload })
    this.setState({ fetching: newProps.fetching })
  }

  onPressingRemitosPorHojaRuta = (item) => {
    // const { car_id } = this.state
    const { car_id } = this.props.user
    this.props.navigation.navigate('RemitosListScreen', { hoja : item.numeroHojaRuta })
  }

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  renderRow ({item}) {

    return (
    //{"numeroHojaRuta":"00000045","car_id":"31913","fletero":"Gorosito Jose","estado":"2"},
    //{"numeroHojaRuta":"00000161","car_id":"31913","fletero":"Gorosito Jose","estado":"2"},
    // hideChevron
    <ListItem
        title={item.numeroHojaRuta}
        subtitle={item.car_id}
        //badge={badge} 
        containerStyle={{ backgroundColor: 'white' }}
        onPress={() => this.onPressingRemitosPorHojaRuta(item)} 
      />
    )

  }

  render () {

    const { fetching } = this.state;

    const leftButtonConfig = {
      title: I18n.t('back'),
      handler: () => this.props.navigation.navigate('HomeScreen'),
    }

    const titleConfig = {
      title: 'Hojas de Ruta ' + this.props.user.car_id,
      style: {color:'#FFF'}
    }

    const statusBarConfig = {
      style: 'light-content', 
      hidden: false, 
      tintColor: '#2ecc71'
  }
  
    return (

      <View style={styles.container}>

        <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
          statusBar={statusBarConfig}
        />

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          //initialNumToRender={this.oneScreensWorth}
          //ListHeaderComponent={this.renderHeader}
          // ListFooterComponent={this.renderFooter}
          //ListEmptyComponent={this.renderEmpty}
          // ItemSeparatorComponent={this.renderSeparator}
        />

        <View style={styles.spinnerContainer}>
        { fetching && (
          <Spinner
            style={styles.spinner}
            isVisible={true}
            size={100}
            type={'9CubeGrid'}
            color={'#2ecc71'}/>
        )}
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payload: state.hojaruta.payload,
    fetching: state.hojaruta.fetching,
    user: state.login.payload,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestHojaRuta: (car_id,estado) => dispatch(HojaRutaActions.hojaRutaRequest(car_id,estado))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HojaRutaScreen)
