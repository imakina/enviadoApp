import React, { Component } from 'react'
import { View, Text, FlatList, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Button, Header } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import HojaRutaActions from '../Redux/HojaRutaRedux'

import NavigationBar from 'react-native-navbar';

// Styles
import styles from './Styles/HojaRutaScreenStyle'
import I18n from 'react-native-i18n'

var Spinner = require('react-native-spinkit')

const PENDING_STATE = '0'

class HojaRutaScreen extends Component {
  
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      fetching:false,
      dataObjects: []
    }
  }

  componentDidMount () {
    this.setState({ fetching: true })
    this.props.requestHojaRuta(this.props.user.car_id, PENDING_STATE)
    this.setState({ user : this.props.user })
  }

  componentWillReceiveProps (newProps) {
    //console.tron.display({name: 'props', value: newProps})
    this.setState({ 
      dataObjects: newProps.payload,
      fetching: newProps.fetching 
    })
  }

  onPressingRemitosPorHojaRuta = (item) => {
    //hojarutaselected
    this.props.selectedHojaRuta(item)
    this.props.navigation.navigate('RemitosListScreen')
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
    // <ListItem
    //     title={item.numeroHojaRuta}
    //     subtitle={item.car_id}
    //     //badge={badge} 
    //     containerStyle={{ backgroundColor: 'white' }}
    //     onPress={() => this.onPressingRemitosPorHojaRuta(item)} 
    //   />


    <View style={{ padding: 15}}>
    
      <Button
        raised
        icon={{name: 'map', size: 60}}
        buttonStyle={styles.button}
        textStyle={{textAlign: 'center'}}
        containerViewStyle={styles.buttonContainer}
        title={item.numeroHojaRuta}
        onPress={() => this.onPressingRemitosPorHojaRuta(item)} 
      />

    </View>

    )

  }

  render () {

    const { 
      fetching,
      user
    } = this.state;

  //   const leftButtonConfig = {
  //     title: '< Inicio', 
  //     handler: () => this.props.navigation.navigate('HomeScreen'),
  //   }

  //   const titleConfig = {
  //     title: 'Hojas de Ruta ',
  //     style: {color:'#FFF'}
  //   }

  //   const statusBarConfig = {
  //     style: 'light-content', 
  //     hidden: false, 
  //     tintColor: '#2ecc71'
  // }
  
    return (

      <View style={styles.container}>

        {/* <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
          statusBar={statusBarConfig}
          rightComponent={{ icon: 'menu', color: '#27ae60' }}
        /> */}

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'HOJAS DE RUTA', style: { color: '#27ae60' } }} 
          leftComponent={{ 
            icon: 'chevron-left', 
            color: '#27ae60',
            onPress: () => this.props.navigation.navigate('HomeScreen')
          }}
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
  // console.tron.display({name:'statepropsremitoslist',value: state})  
  return {
    payload: state.hojaruta.payload,
    fetching: state.hojaruta.fetching,
    user: state.login.account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestHojaRuta: (car_id,estado) => dispatch(HojaRutaActions.hojaRutaRequest(car_id,estado)),
    selectedHojaRuta: (hojaruta) => dispatch(HojaRutaActions.hojaRutaSelected(hojaruta))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HojaRutaScreen)
