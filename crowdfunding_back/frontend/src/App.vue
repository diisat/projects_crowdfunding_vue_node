<template>
  <v-app>
    <main>
      <div class="app-container">
        <header class="app-header">
          <v-toolbar visible="false">
            <v-toolbar-items>
              
              <!-- <v-icon class="profile" color="grey" size="40" tile>
               <v-img src="../images/castor.png"></v-img>
             </v-icon> -->

              <v-btn v-if="this.sesionIniciada == false" to="/iniciarSesion">Iniciar Sesion</v-btn>
              <v-btn v-if="this.sesionIniciada == false" to="/registro">Registro</v-btn>
              </v-toolbar-items>

              <v-spacer></v-spacer>
              <v-btn  v-if="this.sesionIniciada == true" to="/proyectos" text>Proyectos</v-btn>
               <v-btn  v-if="this.sesionIniciada == true" to="/perfil" text>Perfil</v-btn>

              <v-btn icon  v-if="this.sesionIniciada == true" @click="cerrarSesion"><v-icon>mdi-export</v-icon> </v-btn>
              <!-- <v-btn v-if="this.sesionIniciada == true" @click="cerrarSesion">Salir</v-btn> -->
            
          </v-toolbar>
        </header>
          <router-view></router-view>
      </div>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      sesionIniciada: false
    };
  },
  methods: {
    cambiarBarra() {
      if (this.sesionIniciada == true) {
        this.sesionIniciada = false;
      } else {
        this.sesionIniciada = true;
      }
    },
    cerrarSesion() {
      if (confirm("Seguro desea cerrar sesion?")) {
        this.$store.commit("changeTheID", "");
        this.$store.commit("changeTheNombres", "");
        this.$store.commit("changeTheApellidos", "");
        this.$store.commit("changeTheCorreo", "");
        this.$store.commit("changeTheContrasena", "");
        this.$store.commit("changeTheEdad", "");
        this.$store.commit("changeTheProfesion", "");
        this.$store.commit("changeTheCiudad", "");
        this.$store.commit("changeTheSitiosWeb", "");
        this.$store.commit("changeTheMisProyectos", []);
        this.$store.commit("changeTheMisDonaciones", []);
        this.sesionIniciada = false;
        this.$router.push("/iniciarSesion");
      }
    }
  },
  mounted() {
    this.bus.$on("cambiarBarra", () => {
      this.cambiarBarra();
    });
  },
  created() {
    this.$router.push("/iniciarSesion");
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto|Material+Icons");
*,
*:before,
*:after {
  box-sizing: border-box;
}



.botonBarra {
  color: #2d7c39;
}

body {
  margin: 0;
  padding: 0;
}

main {
  font-family: "Roboto", "sans-serif";
  background: #fff top center repeat;
  color: #444;
}

h1,
p {
  margin: 0 0 1em 0;
}

img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.app-container {
  max-width: 100%;
  margin: 0 auto;
  /* background-color: #e8e8e8; */
  background-color: #fff;
}

.app-container > * {
  border-radius: 5px;
  font-size: 150%;
  margin-bottom: 3%;
}

.app-header,
.app-footer {
  flex: 0 1 100%;
  text-align: center;
  background-color: #fff;
}
</style>