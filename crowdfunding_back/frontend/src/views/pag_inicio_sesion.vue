<template>
  <div class="margen">
    <h2 class="titulo">INICIO DE SESIÓN</h2>
    <v-text-field outlined v-model="email" label="Correo electrónico"></v-text-field>
    <v-text-field outlined v-model="contrasena" :type="'password'" label="Contraseña"></v-text-field>
    <v-row><p class="registro_p" >¿Primera vez en FUNDI?</p><router-link class="registro_p" to="/registro"> ¡Registrate aquí!</router-link></v-row>
    <center><v-btn @click="iniciarSesion" type="submit" color="#A51F1F" dark class="titulo" width=100% >ENTRAR</v-btn></center>
  </div>
</template>

<script>
import axios from "../plugins/axios";
export default {
  data() {
    return {
      email: "",
      contrasena: "",
      respuesta: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },
  methods: {
    iniciarSesion() {
      axios.get("/usuario").then(response => {
        if (response.status == 200) {
          response.data.forEach(element => {
            if (element.correo == this.email) {
              if (element.contrasena == this.contrasena) {
                alert("Ha iniciado sesión");
                this.respuesta = true;

                this.$store.commit("changeTheID", element._id);
                this.$store.commit("changeTheNombres", element.nombres);
                this.$store.commit("changeTheApellidos", element.apellidos);
                this.$store.commit("changeTheCorreo", element.correo);
                this.$store.commit("changeTheContrasena",element.contrasena);
                this.$store.commit("changeTheEdad", element.edad);
                this.$store.commit("changeTheProfesion", element.profesion);
                this.$store.commit("changeTheCiudad", element.ciudad);
                this.$store.commit("changeTheGenero", element.genero);
                this.$store.commit("changeTheSitiosWeb", element.sitiosWeb);
                this.$store.commit("changeTheMisProyectos", element.misProyectos);
                this.$store.commit("changeTheMisDonaciones", element.misDonaciones);

            
                this.bus.$emit("cambiarBarra");
                this.$router.push("/proyectos");
              }
            }
          });
        }
        if (this.respuesta == false) {
          alert("Correo o contraseña inválida");
        }
      });
    }
  }
};
</script>

<style>

.registro_p{
  text-align: center;
  font-style: italic;
  font-size: medium;
  color: gray;
}

.margen {
  margin-left: 20%;
  margin-right: 20%;
}
.page {
  position: fixed;
  width: inherit;
}
.titulo {
  margin-top: 10%;
  text-align: center;
  margin-bottom: 5%;
}
</style>