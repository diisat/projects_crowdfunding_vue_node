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
    genero:'',
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
    changeTheProfesion(state, newProfesion) {
        state.profesion = newProfesion;
    },
    changeTheCiudad(state, newCiudad) {
        state.ciudad = newCiudad;
    },
    changeTheGenero(state, newGenero) {
      state.genero = newGenero;
  },
    changeTheSitiosWeb(state, newSitiosWeb) {
        state.sitiosWeb = newSitiosWeb;
    },
    changeTheMisProyectos(state, newMisProyectos) {
        state.misProyectos = newMisProyectos;
    },
    changeTheMisDonaciones(state, newMisDonaciones) {
        state.misDonaciones = newMisDonaciones;
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
    changeGenero({ commit }, newGenero) {
      commit("changeTheGenero", newGenero)
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