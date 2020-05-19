<template>
  <div >

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row :align="alignmentBoton" :justify="justifyBoton">
            <v-btn to="/publicar" color="#A51F1F" dark >Publica</v-btn>
            <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn  color="#A51F1F" dark v-on="on">Filtros</v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(filtro, index) in filtros"
                :key="index"
                @click="cambiarFiltro(filtro)"
              >
                <v-list-item-title>{{ filtro.titulo }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </v-row>
          <v-row :align="alignmentFiltro" :justify="justifyFiltro">
            
          </v-row>
        </v-col>
     
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="proy in proyectos" :key="proy.nombre" cols="12" md="4">
          <app-proyecto :proyecto="proy"></app-proyecto>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
      alignmentBoton: 'start',
      justifyBoton: 'start',
      alignmentFiltro: 'end',
      justifyFiltro: 'end',
      filtroActual: "",
      proyectosTodos: [],
      proyectos: [],
      filtros: [
        { titulo: "Deporte" },
        { titulo: "Educación" },
        { titulo: "Tecnología" },
        { titulo: "Arte" },
        { titulo: "Todos" }
      ]
    };
  },
  computed: {},
  created() {
    axios.get("/proyecto").then(response => {
      if (response.status == 200) {
        response.data.forEach(element => {
          this.proyectosTodos.push(element);
        });
      }
    });
    this.proyectos = this.proyectosTodos;
  },
  mounted() {},
  methods: {
    cambiarFiltro(filtro) {
      if (filtro.titulo == "Todos") {
        this.proyectos = this.proyectosTodos;
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
.margen {
  margin-left: 1%;
  margin-right: 1%;
}
.filtrosEstilo {
  margin-left: 2%;
}
</style>