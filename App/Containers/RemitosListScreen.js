import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import RemitosActions from '../Redux/RemitosRedux'

// Styles
import styles from './Styles/RemitosListScreenStyle'

var Spinner = require('react-native-spinkit')

class RemitosListScreen extends React.PureComponent {

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
    // if (this.state.display) {
       //console.tron.display({name: 'renderrow', value: item})
    //   setState(display:false)
    // }
    return (
      <View style={styles.row}>
        <View style={styles.info} >
          <Text style={styles.level1}>{item.nroRemito}</Text>
          <Text style={styles.level2}>{item.nombreDestinatario.toLowerCase()}</Text>
          <Text style={styles.level3}>{item.domicilioDestinatario.toLowerCase()}</Text>
        </View>
      </View>
      //   <Text style={styles.boldLabel}>{item.title}</Text>
      //   <Text style={styles.label}>{item.description}</Text>
      // </View>
      // <View style={styles.row}>
      //   <View style={styles.info} >
      //     <Text style={styles.level1}>Remito: {item.nroRemito}</Text>
      //     <Text style={styles.level2}>{item.nombreDestinatario.toLowerCase()}</Text>
      //     <Text style={styles.level3}>{item.domicilioDestinatario.toLowerCase()}</Text>
      //   </View>
      //   // <View style={styles.actions}>
      //   //   <Image style={styles.image} source={Images.selectRoute} />
      //   // </View>
      // </View>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

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

  fetching = false

  componentWillReceiveProps (newProps) {
    //console.tron.display({name: 'props', value: newProps})
    this.setState({ dataObjects: newProps.payload })
    this.setState({ fetching: newProps.fetching })
  }

  componentDidMount () {
    this.setState({ fetching: true })
    this.props.requestRemitos()
  }

  render () {

    const { fetching } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}> Remitos </Text>
        </View>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          // ListHeaderComponent={this.renderHeader}
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
            color={'white'}/>
        )}
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.tron.display({value: state})
  return {
    payload: state.remitos.payload,
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestRemitos: () => dispatch(RemitosActions.remitosRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemitosListScreen)
