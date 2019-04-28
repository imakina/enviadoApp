// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
// const create = (baseURL = "http://clientes.enviado.com/api/") => {
const create = (baseURL = "http://test.softsencillo.com/api/") => {
// const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 0
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const postLogin = (u, p) => api.post("authentication/loginfletero", { username: u, password: p });
  const getRemitos = (hojaruta, token, t) =>
    api.get("remitos/ListadoRemitosHojaRuta", {
      hojaruta: hojaruta,
      mobile: t,
      token: token
    });
  const getRemitosTodos = (hojaruta, token) =>
    api.get("remitos/ListadoRemitosHojaRutaTodos", {
      hojaruta: hojaruta,
      token: token
    });
  const getHojaRuta = (car_id, estado) => api.get("remitos/ListadoHojasRuta", { car_id: car_id, estado: estado });
  const getMotivos = token => api.get("remitos/motivos", { token: token });
  const postRemitoEstado = (token, body) => api.post("remitos/actualizaestado/?token=" + token, body);
  const postActualizaOrden = (token, body) => api.post("remitos/ActualizarOrdenRemito/?token=" + token, body);
  // http://clientes.enviado.com/api/remitos/ActualizarOrdenRemito/?token=NGtyTmxJaDlDSHNla3BBZTVZTm12RVEybjRoVTZFdlcwYnlBMTJZQi9iMD06MA==
  // ordenes retiro
  const postOrdenRetiro = (token, body) => api.post("ordenretiroqr/crearorden/?token=" + token, body);
  const postOrdenRetiroCerrar = (token, body) => api.post("ordenretiroqr/cerrarorden/?token=" + token, body);
  const getOrdenRetiro = (fletero) => api.get("remitos/ListadoOrdenesRetiroQR", { fletero: fletero });
  const getRemitosQR = (numero_orden) => api.get("remitos/ListadoRemitosQR", { ordenRetiro: numero_orden });
  const getPackagesQR = (numero_orden) => api.get("remitos/ListadoPackagesQR", { ordenRetiro: numero_orden });
  

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    postLogin,
    getRemitos,
    getRemitosTodos,
    getHojaRuta,
    getMotivos,
    postRemitoEstado,
    postOrdenRetiro,
    postOrdenRetiroCerrar,
    getOrdenRetiro,
    getPackagesQR,
    getRemitosQR,
    postActualizaOrden
  }
}

// let's return back our create method as the default.
export default {
  create
}
