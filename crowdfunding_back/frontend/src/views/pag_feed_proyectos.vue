<template>
  <v-container grid-list-md fluid>
    <v-row v-for="proy in proyectos" :key="proy.nombre">
      <app-proyecto :proyecto="proy"></app-proyecto>
    </v-row>
  </v-container>
  
</template>

<script>
import axios from '../plugins/axios'
import Proyecto from '../components/Proyectos'
export default {
  components: {
    appProyecto: Proyecto
  },
  data() {
    return {
      proyectos: [],
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
    axios.get("/proyecto").then(response =>{
      if(response.status==200){
        response.data.forEach(element => {
          this.proyectos.push(element);
        });
      }
    });
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