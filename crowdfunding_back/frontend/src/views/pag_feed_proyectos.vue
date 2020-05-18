<template>
  <!-- <v-container grid-list-md fluid>
    <v-row v-for="pro in proyectos" :key="pro.id">
      <app-proyecto :proyecto="pro"></app-proyecto>
    </v-row>
  </v-container> -->
  <h1>HOLAA</h1>
</template>

<script>
import axios from '../plugins/axios'
//import Proyecto from '../components/Proyectos'
export default {
  components: {
    //appProyecto: Proyecto
  },
  data() {
    return {
      success: false,
      proyectos: [],
      titulo: null,
      descripcion: null
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
    axios.get("/proyectos").then(response => console.log(response))
  },
  mounted() {
    
  }
};
</script>

<style>
.margen {
  margin: 2%;
}
</style>