import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, List, Header, Icon, SearchBar, ButtonGroup } from 'react-native-elements'
import openMap from 'react-native-open-maps';
import getDirections from 'react-native-google-maps-directions';

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

    const customDomicilio = domicilio.split('|')[0]
    // const customDomicilio = domicilio.replace('|tpoprop: Casa','')

    const dist = this.getDistance({latitud:this.state.latitude,longitud:this.state.longitude}, {latitud:item.latitud,longitud:item.longitud})

    const distance = parseFloat(Math.round(dist * 100) / 100).toFixed(2) + ' kms';

    console.log(distance);

    return (

      // <ListItem
      //     // fontFamily="NunitoRegular"
      //     subtitleStyle={styles.item}
      //     textInputStyle={styles.item}
      //     title={item.nroRemito}
      //     subtitle={customDomicilio}
      //     badge={badge}
      //     containerStyle={{ backgroundColor: 'white' }}
      //     onPress={() => this.onPressSingleItem(item)}
      //     leftIcon={customIcon}
      //     leftIconOnPress={() => this.onPressMap(item)}
      //   />
      // <TouchableOpacity style={{flex:0.7}} onPress={() => this.onPressDirection(item)}>
      //   <Icon
      //     name={'map'}
      //     color={Colors.backgroundVariant}
      //   />
      // </TouchableOpacity>

      <View style={styles.shadow}>
        <TouchableOpacity style={styles.listitem} onPress={() => this.onPressSingleItem(item)}>

          <View style={styles.row}>
            <TouchableOpacity style={{ flex: 0.5, alignSelf: 'flex-start' }} onPress={() => this.onPressOpenMaps(item)}>
              <Icon
                name={customIconName}
                color={item.latitud.trim() === '' ? '#BFBFBF' : '#27ae60'}
                size={28}
                type='font-awesome'
              />
            </TouchableOpacity>
            <View style={{ flex: 2 }}>
              <Text style={styles.numero}>{item.nroRemito}</Text>
            </View>
            <View style={{ flex: 3 }}>
              {/* <Icon
                name={'globe'}
                color={Colors.facebook}
                size={28}
                type='font-awesome'
              /> */}
              <Text style={styles.distance}> {distance}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.domicilio}>{customDomicilio}</Text>
          </View>

        </TouchableOpacity>
      </View>

    )

}

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
      <View>

        <View style={{flexDirection:'row', height: 40}}>
          <TouchableOpacity style={{flex:1}} onPress={() => this.updateIndex(0)}>
            <Text style={[styles.textButtonGroup, (this.state.tabIndex == 0)?styles.textButtonSelected:'']}>Pendientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={() => this.updateIndex(1)}>
            <Text style={[styles.textButtonGroup, (this.state.tabIndex == 1)?styles.textButtonSelected:'']}>Todos</Text>
          </TouchableOpacity>
        </View>

        {/* <ButtonGroup
          selectedBackgroundColor={Colors.backgroundVariant}
          onPress={this.updateIndex}
          selectedIndex={this.state.tabIndex}
          buttons={['Todos', 'Pendientes']}
          containerStyle={{height: 35}}
          textStyle={styles.itembutton} 
          selectedTextStyle={styles.itembutton} 	
          /> */}

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
        this.onRequestingRemitos(false)
        break;
      case 1:
        //update the list
        this.onRequestingRemitos(true)
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
      return <Text style={[styles.item, {padding:20, textAlign:'center', marginTop:30}]}> Buscando ... </Text>
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

  // distance gps
  getDistance = (origin,destination) => {
    console.log(origin.latitud + ' ' + destination.latitud)
    console.log(origin.longitud + ' ' + destination.longitud)
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(destination.latitud-origin.latitud);  // this.deg2rad below
    const dLon = this.deg2rad(destination.longitud-origin.longitud); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(origin.latitud)) * Math.cos(this.deg2rad(destination.latitud)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }
  
  deg2rad = (deg) => { return deg * (Math.PI/180); }
  // end distance gps
  

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
    this.onRequestingRemitos(false)
    this.myCurrentPosition()
  }

  myCurrentPosition() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        // console.log("my position",position);
        // console.log("destination",this.state.marker.latitud);
        // this.mergeLot();
        // let start = this.state.latitude +","+ this.state.longitude
        // let end = this.state.marker.latitud +","+ this.state.marker.longitud
        // this.getDirections(start, end)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      // {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000} 
    );

  }
  
  onRequestingRemitos = (todos) => {
    this.setState({ fetching: true })
    this.props.requestRemitos(this.props.hojaruta.numeroHojaRuta, todos)
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
    // console.log({name:'map', value:item})
    this.props.selectedRemitos(item)
    //navigation
    const markers = [].push(item)
    // console.tron.display({name:'unequipo', value:markers})
    this.props.navigation.navigate('MapScreen', { markers: null })
  }

  onPressOpenMaps = (item) => {
    console.log(item)
    // openMap({ latitude: parseFloat(item.latitud), longitude: parseFloat(item.longitud)});
    this.handleGetDirections(item)
  }

  handleGetDirections = (item) => {
    const data = {
       source: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      },
      destination: {
        latitude: parseFloat(item.latitud),
        longitude: parseFloat(item.longitud)
      },
      params: [
        {
          key: "dirflg",
          value: "d"
        }
      ]
    }
 
    getDirections(data)
  }

  // onPressDirection = (item) => {
  //   console.log({name:'direction', value:item})
  //   this.props.selectedRemitos(item)
  //   //navigation
  //   const markers = [].push(item)
  //   this.props.navigation.navigate('DirectionScreen', { marker: item })
  // }

  onPressMarkers = () => {
    const markers=this.state.dataObjects.filter(
      function(item){
        return item.latitud !== '';
      }).map(function(item){
        return item;
      }
    );
    this.props.navigation.navigate('MapScreen', { markers: markers})
  }

  render () {

    const { fetching } = this.state;
  
    return (
      <View style={styles.container}>

        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'LISTA REMITOS', style: styles.navigation }} 
          leftComponent={{ 
            icon: 'chevron-left',
            color: Colors.background,
            onPress: () => this.props.navigation.navigate('HojaRutaScreen')
          }}
          rightComponent={{ 
            icon: 'map', 
            color: Colors.background,
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
    requestRemitos: (hoja,todos) => dispatch(RemitosActions.remitosRequest(hoja,todos)),
    selectedRemitos: (remito) => dispatch(RemitosActions.remitoSelected(remito))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemitosListScreen)
