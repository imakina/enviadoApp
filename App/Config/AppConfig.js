// Simple React Native specific changes

import '../I18n/I18n'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  nameApp: 'enviadoApp',
  statusBarConfig : {
    style: 'light-content', 
    hidden: false, 
    tintColor: '#2ecc71'
  }
}
