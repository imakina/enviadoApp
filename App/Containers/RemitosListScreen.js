import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, List, Header, Icon, SearchBar, ButtonGroup } from 'react-native-elements'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import RemitosActions from '../Redux/RemitosRedux'

// Styles
import styles from './Styles/RemitosListScreenStyle'
import { Colors } from '../Themes'

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
    tabIndex: 0,
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
      <View>

        <ButtonGroup
          selectedBackgroundColor={Colors.backgroundVariant}
          onPress={this.updateIndex}
          selectedIndex={this.state.tabIndex}
          buttons={['Todos', 'Pendientes']}
          containerStyle={{height: 35}}
          // textStyle={styles.buttonGroup} 
          selectedTextStyle={styles.buttonGroupSelected} 	
          />

        <SearchBar 
          onChangeText={this.onSearch}
          onClearText={this.onClearSearch}
          placeholder="Escriba aqui ..." 
          lightTheme 
          round />

      </View>

  updateIndex = (index) => {
    console.tron.log("updating index")
    this.setState({tabIndex: index})
    switch(index) {
      case 0:
        //update the list
        break;
      case 1:
        //update the list
        break;
    }
  }

    // <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () => { 
  
    if (this.state.fetching)
      return <Text style={{padding:20, textAlign:'center', marginTop:30}}> Buscando ... </Text>
    else 
      return null

  }

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

  onSearch = (some) => {
    // console.tron.log(some)
    if (some.length==0) {
      data = this.state.data
    } else {
      data=this.state.data.filter(function(item){
          return item.nroRemito.indexOf(some) > 0;
      }).map(function(item){
          return item;
      });
    }

    this.setState({ 
      dataObjects: data
    })
  }

  onClearSearch = () => {
    this.setState({ 
      dataObjects: this.state.data
    })
  }

  componentWillReceiveProps (newProps) {
    //console.tron.display({name: 'props', value: newProps})
    this.setState({ 
      dataObjects: newProps.payload,
      data: newProps.payload,
      fetching: newProps.fetching,
    })
  }

  componentDidMount () {
    // get remitos list
    this.setState({tabIndex:0})
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
    console.log({name:'map', value:item})
    this.props.selectedRemitos(item)
    //navigation
    const markers = [].push(item)
    console.tron.display({name:'unequipo', value:markers})
    this.props.navigation.navigate('MapScreen', { markers: null })
  }

  onPressMarkers = () => {
    const markers=this.state.dataObjects.filter(
      function(item){
        return item.latitud !== '';
      }).map(function(item){
        return item;
      }
    );
    console.tron.display({name:'markers', value:markers})
    this.props.navigation.navigate('MapScreen', { markers: markers})
  }

  render () {

    const { fetching } = this.state;

    // console.tron.log(this.state.tabIndex)

    return (
      <View style={styles.container}>

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'LISTA REMITOS', style: { color: '#27ae60' } }} 
          leftComponent={{ 
            icon: 'chevron-left',
            color: '#27ae60',
            onPress: () => this.props.navigation.navigate('HojaRutaScreen')
          }}
          rightComponent={{ 
            icon: 'map', 
            color: '#27ae60',
            onPress: () => this.onPressMarkers()
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
