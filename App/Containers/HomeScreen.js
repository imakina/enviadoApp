import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker'
import { Icon } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from '../Redux/LoginRedux'
// Components
import ButtonIcon from '../Components/ButtonIcon';
import Header from '../Components/Header';
// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      image: null,
    }
  }

  onPressingHojaDeRuta = () => {
    this.props.navigation.navigate('HojaRutaScreen')
  }

  onPressingLogout = () => {
    // const { navigation } = this.props
    // navigation.state.params.onLogout();
    // navigation.navigate('LoginScreen')
    this.props.attemptLogout()
  }

  // onSelectImage() {
  //   this.onChangeImage();
  //   // this.props.navigation.navigate('CameraScreen', { onImage : this.getImage })
  // }

  // getImage = (image) => {
  //   console.log(image.mediaUri);
  //   this.setState({ image : image })
  // }

  persistImage(response) {
    // parse image
    const picture = 'data:image/jpeg;base64,' + response.data
    // update localstorage
    this.setState({ image: picture })
    this.props.updatePicture(picture)
  }

  onSelectImage() {

    const options = {
      title: 'Foto de Perfil',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar una foto...',
      chooseFromLibraryButtonTitle: 'Seleccionar de la Galeria...',
      permissionDenied: {
        title: '',
        text: 'EnviadoApp quiere acceder a la cámara para poder usarla desde la aplicación',
        reTryTitle: 'Ir a Configuración',
        okTitle: 'Cancelar'
      },
      cameraType: 'front',
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        this.setState({ pickFoto: false }, () => setTimeout(() => this.setState({ pickFoto: true }), 100))
      } else if (response.error) {
        // console.log(response.error)
      } else if (response.customButton) {
        // console.log(response.customButton)
      } else {
        this.persistImage(response)
        // this.setState({ image : 'data:image/jpeg;base64,' + response.data })
      }
    })
  }

  componentDidMount() {
    console.tron.log(this.props.user)
    this.setState({ user: this.props.user })

    //profilePic
    if (this.props.picture)
      this.setState({ image: this.props.picture })
  }

  render() {

    const {
      car_id,
      token,
      car_first_nm,
      car_last_nm,
      mail
    } = this.state.user

    const {
      image
    } = this.state

    return (
      <View style={styles.container}>

        <Header
          left={{ icon: 'bars' }}
          right={{ icon: 'sign-out', onPress: () => this.onPressingLogout() }}
          title="ENVIADO.COM"
        />

        <View style={styles.main}>

          {image ?

            <TouchableOpacity
              onPress={() => this.onSelectImage()}>
              <Image
                style={styles.capture}
                source={{ uri: image }}
              />
            </TouchableOpacity>

            :

            <Icon
              // reverse
              name='ios-camera-outline'
              type='ionicon'
              color='#27ae60'
              size={100}
              onPress={() => this.onSelectImage()}
            />

          }

          <View style={{ padding: 10, alignItems: 'center' }}>
            <Text style={styles.nombre}>{car_first_nm} {car_last_nm}</Text>
            <Text style={styles.hoja}>CarID{car_id}</Text>
            <Text style={styles.mail}>{mail}</Text>
          </View>

        </View>

        <View style={[styles.formContainer]}>
          <ButtonIcon
            icon={{ name: 'road', type: 'font-awesome' }}
            text="HOJAS DE RUTA"
            onPress={() => this.onPressingHojaDeRuta()}
          />
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.tron.display({name:'stop_home',value: state}) 
  return {
    user: state.login.account,
    picture: state.login.picture,
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: () => dispatch(LoginActions.loginOut()),
    updatePicture: (img) => dispatch(LoginActions.loginPicture(img)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
