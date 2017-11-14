import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, List, Header, Icon, SearchBar } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import RemitosActions from '../Redux/RemitosRedux'

import NavigationBar from 'react-native-navbar';
import I18n from 'react-native-i18n'

// Styles
import styles from './Styles/RemitosListScreenStyle'

var Spinner = require('react-native-spinkit')

class RemitosListScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    // this.state = {
    //   hoja : props.navigation.state.params.hoja,
    //   //car_id : props.navigation.state.params.car_id
    // }
    //console.tron.log({screen:'CameraScreen', value: this.state.hoja})
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    fetching:false,
    dataObjects : []
    // dataObjects: [
    //   {title: 'First Title', description: 'First Description'},
    //   {title: 'Second Title', description: 'Second Description'},
    //   {title: 'Third Title', description: 'Third Description'},
    //   {title: 'Fourth Title', description: 'Fourth Description'},
    //   {title: 'Fifth Title', description: 'Fifth Description'},
    //   {title: 'Sixth Title', description: 'Sixth Description'},
    //   {title: 'Seventh Title', description: 'Seventh Description'}
    // ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {

    const nombre = item.nombreDestinatario
      .toLowerCase()
      .trim()
      .split(' ')
      .reduce((nombre, item, index) => {    
        //console.tron.log({nombre,item,index})
        return (nombre.substring(0,1).toUpperCase() + nombre.substring(1) + ' ' + item.substring(0,1).toUpperCase() + item.substring(1))
      })

    const domicilio = item.domicilioDestinatario
      .toLowerCase()
      .trim()
      .split(' ')
      .reduce((nombre, item, index) => {    
        //console.tron.log({nombre,item,index})
        return (nombre.substring(0,1).toUpperCase() + nombre.substring(1) + ' ' + item.substring(0,1).toUpperCase() + item.substring(1))
      })

    const badge = {
      value: `$ ${item.importe} ${item.tipoPago.trim()}` ,
      badgeContainerStyle: { right: 10, backgroundColor: '#56579B' },
      badgeTextStyle: { fontSize: 14, padding: 2 },
    };


    const customIconName = (item.domicilioDestinatario.indexOf("|TpoProp: CASA")===-1)?"building-o":"home"
    // {item.nombreDestinatario.indexOf("tpoProp:casa")>0:'#BFBFBF':'red'}

    const customIcon = { 
      name: customIconName,
      color: `${item.latitud.trim()===''?'#BFBFBF':'#27ae60'}`,
      size:30,
      type:'font-awesome'
    }

    const customChevron = { 
      name: 'pencil',
      type:'font-awesome'
    }

    const customDomicilio = domicilio.replace('|tpoprop: Casa','')

    //const nombre = transform(item.nombreDestinatario) 

    // return (
      // hideChevron
      // <ListItem
      //     title={nombre}
      //     title='dos'
      //     subtitle={item.domicilioDestinatario}
      //     badge={badge}
      //     containerStyle={{ backgroundColor: 'white' }}
      //     onPress={() => this.onPressSingleItem(item)}  
      // <Text style={styles.description}>El Tipo de Pago es : {item.tipoPago.trim()===''?'no aplica':item.tipoPago}</Text>
      // <Text style={styles.description}>El Tipo de Pago es : {item.tipoPago.trim()===''?'no aplica':item.tipoPago}</Text>
      //   />

      // <View style={styles.greatbox} >
      
      //     <View style={styles.imagem} >
      //       <Icon
      //         name='globe'
      //         type='font-awesome'
      //         color={item.latitud.trim()===''?'#BFBFBF':'red'}
      //         size={40}
      //         onPress={() => this.onPressMap(item)} 
      //       />
      //     </View>

      //     <TouchableOpacity onPress={() => this.onPressSingleItem(item)}>
      //       <View style={styles.box} >
      //         <Text style={styles.title}>{item.nroRemito} - (${item.importe} {item.tipoPago.trim()})</Text>
      //         <Text style={styles.subtitle}>{nombre}</Text>
      //         <Text style={styles.direction} numberOfLines={3}>{item.domicilioDestinatario}</Text>
      //         <Text style={styles.description} numberOfLines={3}>{item.observaciones}</Text>
      //       </View>
      //     </TouchableOpacity>
        
      // </View>

      // subtitle={
      //   <View style={styles.subtitleView}>
      //     <Text style={styles.ratingText}>{nombre}</Text>
      //     <Text style={styles.ratingText}>{item.domicilioDestinatario}</Text>
      //   </View>
      // }

    return (

      <ListItem
          
          title={item.nroRemito}
          subtitle={customDomicilio}
          badge={badge}
          containerStyle={{ backgroundColor: 'white' }}
          onPress={() => this.onPressSingleItem(item)}
          leftIcon={customIcon}
          leftIconOnPress={() => this.onPressMap(item)}
        />

)

}
// rightIcon={customChevron}
// onPressRightIcon={() => this.onPressSignature(item)}

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <SearchBar placeholder="Type Here..." lightTheme round />
    // <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={{padding:20, textAlign:'center', marginTop:30}}> Buscando ... </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  // fetching = false

  componentWillReceiveProps (newProps) {
    //console.tron.display({name: 'props', value: newProps})
    this.setState({ 
      dataObjects: newProps.payload,
      fetching: newProps.fetching 
    })
  }

  componentDidMount () {
    // get remitos list
    this.onRequestingRemitos()
  }
  
  onRequestingRemitos = () => {
    this.setState({ fetching: true })
    this.props.requestRemitos(this.props.hojaruta.numeroHojaRuta)
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //console.tron.log({name:info, value:error})
  }

  onPressSingleItem = (item) => {
    // console.tron.log({item:'item', value:item})
    this.props.selectedRemitos(item)
    //navigation
    this.props.navigation.navigate('RemitoScreen')
  }

  onPressMap = (item) => {
    console.tron.log({name:'map', value:item})
    this.props.selectedRemitos(item)
    //navigation
    //this.props.navigation.navigate('MapScreen')
  }

  // onPressSignature = (item) => {
  //   console.tron.log({name:'map', value:item})
  //   this.props.selectedRemitos(item)
  //   //navigation
  //   this.props.navigation.navigate('SignatureScreen')
  // }


  render () {

    const { fetching } = this.state;

    // const leftButtonConfig = {
    //   title: "< Hoja de Ruta", //I18n.t('back'),
    //   handler: () => this.props.navigation.navigate('HojaRutaScreen'),
    // }

    // const titleConfig = {
    //   title: 'Remitos',
    //   style: {color:'#FFF'}
    // }

    return (
      <View style={styles.container}>

        {/* <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
          statusBar={{style: 'light-content', hidden: false, tintColor: '#2ecc71'}}
          rightComponent={{ icon: 'menu', color: '#27ae60' }}
        /> */}

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'LISTA REMITOS', style: { color: '#27ae60' } }} 
          leftComponent={{ 
            icon: 'chevron-left',
            color: '#27ae60',
            onPress: () => this.props.navigation.navigate('HojaRutaScreen')
          }}
          rightComponent={{ 
            icon: 'refresh', 
            color: '#27ae60',
            onPress: () => this.onRequestingRemitos()
          }}
        />
          <FlatList
            contentContainerStyle={styles.listContent}
            data={this.state.dataObjects}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            ListHeaderComponent={this.renderHeader}
            // ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
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
  //console.tron.display({name:'statepropsremitoslist',value: state})
  return {
    payload: state.remitos.payload,
    fetching: state.remitos.fetching,
    user: state.login.payload,
    hojaruta : state.hojaruta.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestRemitos: (hoja) => dispatch(RemitosActions.remitosRequest(hoja)),
    selectedRemitos: (remito) => dispatch(RemitosActions.remitoSelected(remito))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemitosListScreen)
