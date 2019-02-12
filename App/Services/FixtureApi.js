export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  getRemitos: () => {
    return {
      ok: true,
      data: require('../Fixtures/remitos.json')
    }
  },
  getHojaRuta: () => {
    return {
      ok: true,
      data: require('../Fixtures/hojaruta.json')
    }
  },
  postLogin: () => {
    return {
      ok: true,
      data: require('../Fixtures/user.json')
    }
  },
  getMotivos: () => {
    return {
      ok: true,
      data: require('../Fixtures/motivos.json')
    }
  },
  postOrdenRetiro: () => {
    return {
      ok: true,
      data: require('../Fixtures/ordenesretiroqr.json')
    }
  },
  getOrdenesRetiro: () => {
    return {
      ok: true,
      data: require('../Fixtures/ordenesretiro.json')
    }
  }
}
