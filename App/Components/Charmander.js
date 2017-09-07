import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/PikatchuStyle'

import { Images } from '../Themes'

export default class Left extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    //const charmander = 'http://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/d/d4/Charmander.gif';
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={ Images.charmander }
          style={[{ width: 30, height: 30, }, this.props.style]}/>
      </TouchableOpacity>
    );
  }
}


// import React from 'react-native';
// const {
//   Component,
//   Image,
//   Text,
//   View
// } = React;

// export default class Title extends Component {
//   render() {
//     const pickachu = 'http://vignette3.wikia.nocookie.net/pokemon/images/1/16/025Pikachu_OS_anime_10.png/revision/20150102074354';
//     return (
//       <View style={{ flexDirection: 'row', }}>
//         <Image
//           source={{ uri: pickachu }}
//           style={{ width: 20, height: 20, marginRight: 5, }}/>
//         <Text style={{ paddingTop: 3, color: '#FFAA00', }}>Pokemonopedia</Text>
//       </View>
//     );
//   }
// }