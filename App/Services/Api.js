// a library to wrap and simplify api calls
import apisauce from "apisauce";

// our "constructor"
// const create = (baseURL = 'https://api.github.com/') => {
// const create = (baseURL = "http://clientes.enviado.com/api/") => {
const create = (baseURL = "http://test.softsencillo.com/api/") => {
// const create = (baseURL = "http://localhost:8080/") => {
  // const create = (baseURL = "http://desa.clientes.enviado.softsencillo.com/") => {
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
      "Cache-Control": "no-cache"
    },
    // 10 second timeout...
    timeout: 10000
  });

  // if (__DEV__ && console.tron) {
  //   console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  //   api.addMonitor(console.tron.apisauce)
  // }

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
  const getRoot = () => api.get("");
  const getRate = () => api.get("rate_limit");
  const getUser = username => api.get("search/users", { q: username });
  //no fletero
  //const postLogin = (u,p) => api.post('api/authentication/login', {username: u, password: p })
  // const postLogin = (u, p) => api.post("api/authentication/loginfletero", { username: u, password: p });
  const postLogin = (u, p) => api.post("authentication/loginfletero", { username: u, password: p });
  //remitos por hoja de ruta
  //const getRemitos = (token) => api.get('api/remitos/ListadoRemitoRuteo', { token: token })
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
  // ordenes retiro
  const postOrdenRetiro = (token, body) => api.post("ordenretiroqr/crearorden/?token=" + token, body);
  const postOrdenRetiroCerrar = (token, body) => api.post("ordenretiroqr/cerrarorden/?token=" + token, body);
  const getOrdenRetiro = (fletero) => api.get("remitos/ListadoOrdenesRetiroQR", { fletero: fletero });
  const getRemitosQR = (numero_orden) => api.get("remitos/ListadoRemitosQR", { ordenRetiro: numero_orden });
  const getPackagesQR = (numero_orden) => api.get("remitos/ListadoPackagesQR", { ordenRetiro: numero_orden });
  
  // consulta remitos (cantidad)
  // localhost:55222/Remitos/ListadoRemitosQR?ordenRetiro=12345
  // consulta packages (para hacer el cierre en deposito por id_orden_retiro_qr)
  // localhost:55222/Remitos/ListadoPackagesQR?ordenRetiro=12345

// OrdenRetiroQR/CrearOrden?
// http://test.softsencillo.com/api/Remitos/ListadoOrdenesRetiroQR?fletero=31922
  // sp_mobile_update_status_confirmacion

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
  };
};

// let's return back our create method as the default.
export default {
  create
};
