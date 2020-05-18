import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    edad: 0,
    profesion: '',
    ciudad:'',
    sitiosWeb: '',
    misProyectos:'',
    misDonaciones:''

  },
  mutations: {

    changeTheID(state, newID) {
      state.id = newID;
    },
    changeTheNombres(state, newNombres) {
      state.nombres = newNombres;
    },
    changeTheApellidos(state, newApellidos) {
      state.apellidos = newApellidos;
    },
    changeTheCorreo(state, newCorreo) {
      state.correo = newCorreo;
    },
    changeTheContrasena(state, newContrasena) {
      state.contrasena = newContrasena;
    },
    changeTheEdad(state, newEdad) {
        state.edad = newEdad;
    },
    changeProfesion(state, newProfesion) {
        state.profesion = newProfesion;
    },
    changeCiudad(state, newCiudad) {
        state.ciudad = newCiudad;
    },
    changeSitiosWeb(state, newSitiosWeb) {
        state.sitiosWeb = newSitiosWeb;
    },
    changeMisProyectos(state, newMisProyectos) {
        state.sitiosWeb = newMisProyectos;
    },
    changeMisDonaciones(state, newMisDonaciones) {
        state.sitiosWeb = newMisDonaciones;
    },
    
  },
  actions: {

    changeID({ commit }, newID) {
      commit("changeTheID", newID)
    },
    changeNombre({ commit }, newNombres) {
      commit("changeTheNombres", newNombres)
    },
    changeApellido({ commit }, newApellidos) {
      commit("changeTheApellidos", newApellidos)
    },
    changeEmail({ commit }, newCorreo) {
      commit("changeTheCorreo", newCorreo)
    },
    changeContrasena({ commit }, newContrasena) {
      commit("changeTheContrasena", newContrasena)
    },
    changeEdad({ commit }, newEdad) {
        commit("changeTheEdad", newEdad)
    },
    changeProfesion({ commit }, newProfesion) {
        commit("changeTheProfesion", newProfesion)
    },
    changeCiudad({ commit }, newCiudad) {
        commit("changeTheCiudad", newCiudad)
    },
    changeSitiosWeb({ commit }, newSitiosWeb) {
        commit("changeTheSitiosWeb", newSitiosWeb)
    },
    changeMisProyectos({ commit }, newMisProyectos) {
        commit("changeTheMisProyectos", newMisProyectos)
    },
    changeMisDonaciones({ commit }, newMisDonaciones) {
        commit("changeTheMisDonaciones", newMisDonaciones)
    }
    
  }

});