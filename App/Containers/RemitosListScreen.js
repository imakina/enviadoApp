import React from 'react'
import { View, Text, FlatList, TouchableHighlight, Alert, SearchBar } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Header } from 'react-native-elements'
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
    this.state = {
      hoja : props.navigation.state.params.hoja,
      car_id : props.navigation.state.params.car_id
    }
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

  renderPerson(item) {

    const badge = {
      value: `☆ ${item.nroRemito}`,
      badgeContainerStyle: { right: 10, backgroundColor: '#56579B' },
      badgeTextStyle: { fontSize: 12 },
    };

    return (

      <ListItem
        hideChevron
        title={`${item.nombreDestinatario.toLowerCase()}`}
        subtitle={`${item.domicilioDestinatario.toLowerCase()}`}
        badge={badge}
        containerStyle={{ backgroundColor: 'white' }}
        onPress={() => this.onPress(item)}
      />
    )

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

    // return (
    //
    //   <TouchableHighlight
  	// 		onPress={() => this.goToNextScreen(item)}
  	// 		underlayColor='black'
  	// 	>
    //
    //   <View style={styles.row} >
    //     <View style={styles.info} >
    //       <Text style={styles.level1}>{item.nroRemito}</Text>
    //       <Text style={styles.level2}>{item.nombreDestinatario.toLowerCase()}</Text>
    //       <Text style={styles.level3}>{item.domicilioDestinatario.toLowerCase()}</Text>
    //     </View>
    //   </View>
    //
    //   </TouchableHighlight>
    // )

    function transform(uncapitalized) {
      return uncapitalized
      .toLowerCase()
      .trim()
      .split(' ')
      .reduce((nombre, item, index) => {    
        //console.tron.log({nombre,item,index})
        return (nombre.substring(0,1).toUpperCase() + nombre.substring(1) + ' ' + item.substring(0,1).toUpperCase() + item.substring(1))
      })
    };

    const nombre = item.nombreDestinatario
      .toLowerCase()
      .trim()
      .split(' ')
      .reduce((nombre, item, index) => {    
        //console.tron.log({nombre,item,index})
        return (nombre.substring(0,1).toUpperCase() + nombre.substring(1) + ' ' + item.substring(0,1).toUpperCase() + item.substring(1))
      })

    const badge = {
      value: `☆ ${item.nroRemito}`,
      badgeContainerStyle: { right: 10, backgroundColor: '#56579B' },
      badgeTextStyle: { fontSize: 12 },
    };

    //const nombre = transform(item.nombreDestinatario) 

    return (
    
    <ListItem
        hideChevron
        title={nombre}
        subtitle={item.domicilioDestinatario}
        badge={badge}
        containerStyle={{ backgroundColor: 'white' }}
        onPress={() => this.onPressSingleItem(item)}  
      />
    )

  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    //<SearchBar placeholder="Type Here..." lightTheme round />
    //<Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}></Text>

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
    this.setState({ dataObjects: newProps.payload })
    this.setState({ fetching: newProps.fetching })
  }

  componentDidMount () {
    this.setState({ fetching: true })
    const { hoja } = this.state
    this.props.requestRemitos(hoja)
  }

  onPressSingleItem = (item) => {
    //console.tron.log({item:'item', value:item})
    const { hoja, car_id } = this.state
    this.props.navigation.navigate('RemitoDetailScreen', { item : item, hoja : hoja, car_id : car_id })
  }

  render () {

    const { fetching } = this.state;

    const leftButtonConfig = {
      title: I18n.t('back'),
      handler: () => this.props.navigation.navigate('HomeScreen'),
    }

    const titleConfig = {
      title: 'Remitos ',
      style: {color:'#FFF'}
    }

    return (
      <View style={styles.container}>

        <NavigationBar
          style={styles.navigation}
          title={titleConfig}
          leftButton={leftButtonConfig}
          statusBar={{style: 'light-content', hidden: false, tintColor: '#2ecc71'}}
        />

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          //ListHeaderComponent={this.renderHeader}
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

        <View style={styles.fullfit}>
        </View>

      </View>
        
      )
  }
}

const mapStateToProps = (state) => {
  //console.tron.display({value: state})
  return {
    payload: state.remitos.payload,
    fetching: state.remitos.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestRemitos: (hoja) => dispatch(RemitosActions.remitosRequest(hoja))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemitosListScreen)
