<template>
  <v-app>
    <main>
      <div class="app-container">
        <header class="app-header">
          <v-toolbar visible="false">
            <v-toolbar-items>
              <v-btn v-if="this.sesionIniciada == true" to="/proyectos" text>Proyectos</v-btn>
              <v-btn v-if="this.sesionIniciada == true" to="/perfil">Perfil</v-btn>

              <v-btn v-if="this.sesionIniciada == false" to="/iniciarSesion">Iniciar Sesion</v-btn>
              <v-btn v-if="this.sesionIniciada == false" to="/registro">Registro</v-btn>

              <v-spacer></v-spacer>

              <v-btn
                v-if="this.sesionIniciada == true"
                @click="cerrarSesion"
              >Salir</v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </header>
        <router-view></router-view>
        <hr>
        <footer class="app-footer dark-brown">
          <p>123 Main Street | Smithfield, RI 90987 | 345-456-5678</p>
        </footer>
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
  padding: 3%;
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
  background-color: #fff;
}

.app-container > * {
  border-radius: 5px;
  font-size: 150%;
  margin-bottom: 10px;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(150px, auto);
}

.wrapper > * {
  padding: 15px;
  border-radius: 5px;
}

.panel {
  /* needed for the flex layout*/
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 1 200px;
}

.tall-panel {
  grid-row-end: span 2;
}

.app-header,
.app-footer {
  flex: 0 1 100%;
  padding: 15px;
  text-align: center;
}

/* We need to set the margin used on flex items to 0 as we have gaps in grid.  */
@supports (display: grid) {
  .wrapper > * {
    margin: 0;
  }
}
</style>