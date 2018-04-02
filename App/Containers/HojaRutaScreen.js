import React, { Component } from 'react'
import { View, Text, FlatList, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// import { ListItem } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import HojaRutaActions from '../Redux/HojaRutaRedux'
// Components
import ButtonIcon from '../Components/ButtonIcon'
import Header from '../Components/Header';
// Styles
import styles from './Styles/HojaRutaScreenStyle'

var Spinner = require('react-native-spinkit')

const PENDING_STATE = '0'

class HojaRutaScreen extends Component {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      fetching: false,
      dataObjects: []
    }
  }

  goBack = () => this.props.navigation.navigate('HomeScreen')

  componentDidMount() {
    this.setState({ fetching: true })
    this.props.requestHojaRuta(this.props.user.car_id, PENDING_STATE)
    // this.setState({ user : this.props.user })
  }

  componentWillReceiveProps(newProps) {
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

  renderHeader = () => {
    // console.tron.display({name: 'dataobjects', value: this.state.dataObjects})
    let text = (this.state.dataObjects === null) ? "No tiene asignadas hojas de rutas" : "Estas son las hojas de ruta disponibles"
    return <Text style={styles.help}>{text}</Text>
  }

  renderRow({ item }) {

    return (

      <View style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 20 }}>

        <ButtonIcon
          icon={{ name: 'map', type: 'font-awesome' }}
          text={item.numeroHojaRuta}
          onPress={() => this.onPressingRemitosPorHojaRuta(item)}
        />

      </View>

    )

  }

  render() {

    const {
      fetching,
      // user
    } = this.state;

    return (

      <View style={styles.container}>

        <Header
          title='HOJAS DE RUTA'
          left={{ icon: 'chevron-left', onPress: () => this.goBack() }}
        />

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          //initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
        //ListEmptyComponent={this.renderEmpty}
        // ItemSeparatorComponent={this.renderSeparator}
        />

        <View style={styles.spinnerContainer}>
          {fetching && (
            <Spinner
              style={styles.spinner}
              isVisible={true}
              size={100}
              type={'9CubeGrid'}
              color={'#2ecc71'} />
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
    requestHojaRuta: (car_id, estado) => dispatch(HojaRutaActions.hojaRutaRequest(car_id, estado)),
    selectedHojaRuta: (hojaruta) => dispatch(HojaRutaActions.hojaRutaSelected(hojaruta))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HojaRutaScreen)
