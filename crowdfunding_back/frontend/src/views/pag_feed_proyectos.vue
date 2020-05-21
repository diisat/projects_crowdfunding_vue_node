<template>
  <v-content>
    <v-parallax height="200" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
    <p id="frase">ENTRE MÁS CASTORES HAYAN, MEJOR SERÁ LA REPRESA</p>
    <center>
      <v-btn class="btnEstilo" to="/publicar" color="#9CCC65" dark>¡FINANCIA TU PROYECTO!</v-btn>
    </center>
    <br />
    <hr />

    <v-menu offset-y>
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              class="filtrosEstilo"
              color="#A51F1F"
              dark
              v-on="{ ...tooltip, ...menu }"
              id="filtrarPor"
            >FILTRAR POR</v-btn>
          </template>
          <span>Filtro Actual: {{filtroActual}}</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item v-for="(filtro, index) in filtros" :key="index" @click="cambiarFiltro(filtro)">
          <v-list-item-title>{{ filtro.titulo }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-container>
      <v-row>
        <v-col v-for="proy in proyectos" :key="proy.nombre" cols="12" md="4">
          <app-proyecto :proyecto="proy"></app-proyecto>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from "../plugins/axios";
import Proyecto from "../components/Proyectos";
export default {
  components: {
    appProyecto: Proyecto
  },
  data() {
    return {
      filtroActual: "Todos",
      proyectosTodos: [],
      proyectos: [],
      filtros: [
        { titulo: "Arte" },
        { titulo: "Deporte" },
        { titulo: "Educación" },
        { titulo: "Tecnología" },
        { titulo: "Terminados" },
        { titulo: "Activos" },
        { titulo: "Todos" }
      ]
    };
  },
  computed: {
    id_usu() {
      return this.$store.state.id;
    }
  },
  created() {
    axios.get("/proyecto").then(response => {
      if (response.status == 200) {
        response.data.forEach(element => {
          if (element.idCreador != this.id_usu)
            this.proyectosTodos.push(element);
        });
      }
    });
    this.proyectos = this.proyectosTodos;
  },
  mounted() {},
  methods: {
    cambiarFiltro(filtro) {
      this.filtroActual = filtro.titulo;
      if (filtro.titulo == "Todos") {
        this.proyectos = this.proyectosTodos;
      }else if(filtro.titulo == "Activos"){
        this.proyectos = [];
        this.proyectosTodos.forEach(element => {
          if (element.activo == true) {
            this.proyectos.push(element);
          }
        });
      }else if (filtro.titulo == "Terminados") {
        this.proyectos = [];
        this.proyectosTodos.forEach(element => {
          if (element.activo == false) {
            this.proyectos.push(element);
          }
        });
      } else {
        this.proyectos = [];
        this.proyectosTodos.forEach(element => {
          if (element.categoria == filtro.titulo) {
            this.proyectos.push(element);
          }
        });
      }
    }
  }
};
</script>

<style>
/* #filtrarPor {
  float: right;
  
} */

#frase {
  text-align: center;
  font-style: italic;
  font-size: 150%;
  color: green;
}
.margen {
  margin-left: 1%;
  margin-right: 1%;
}

.btnEstilo {
  margin-left: 4%;
}

.filtrosEstilo {
  margin-left: 2%;
}
</style>