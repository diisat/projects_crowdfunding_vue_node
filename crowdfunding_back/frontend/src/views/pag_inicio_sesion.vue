<template>
  <div class="margen">
    <h2 class="titulo">Inicio de Sesion</h2>
    <v-text-field v-model="email" label="Email"></v-text-field>
    <v-text-field v-model="contrasena" :type="'password'" label="Contraseña"></v-text-field>
    <v-btn @click="iniciarSesion" type="submit" color="#A51F1F" dark class="titulo">INICIAR SESION</v-btn>
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
.margen {
  margin-left: 20%;
  margin-right: 20%;
}

.titulo {
  margin-top: 10%;
  text-align: center;
  margin-bottom: 5%;
}
</style>