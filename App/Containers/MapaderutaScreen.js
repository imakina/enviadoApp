import React, { Component } from 'react'
import { View, Text,FlatList, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Header } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MapaderutaActions from '../Redux/MapaderutaRedux'

import NavigationBar from 'react-native-navbar';

// Styles
import styles from './Styles/MapaderutaScreenStyle'
import I18n from 'react-native-i18n'

class MapaderutaScreen extends Component {

  state = {
    fetching:false,
    dataObjects: [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'}
    ]
  }

  componentDidMount () {
    this.setState({ fetching: true })
    this.props.requestQuieroMapa('00000389','NGtyTmxJaDlDSHNla3BBZTVZTm12RVEybjRoVTZFdlcwYnlBMTJZQi9iMD06MA==')
  }

  componentWillReceiveProps (newProps) {
    //console.tron.display({name: 'props', value: newProps})
    this.setState({ dataObjects: newProps.payload })
    this.setState({ fetching: newProps.fetching })
  }

  renderRow ({item}) {

    return (
    
    <ListItem
        hideChevron
        title={item.idRemito}
        subtitle={item.razonSocial}
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
      title: 'Remitos',
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
  // console.tron.display({value: state})
  return {
    payload: state.mapaderuta.payload,
    fetching: state.mapaderuta.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestQuieroMapa: (hojaruta,token) => dispatch(MapaderutaActions.mapaderutaRequest(hojaruta,token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapaderutaScreen)
