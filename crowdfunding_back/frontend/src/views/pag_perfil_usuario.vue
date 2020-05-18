<template>
  <v-container grid-list-md fluid>
    <v-row v-for="usu in usuarios" :key="usu.nombres">
      <app-usuario :usuario="usu"></app-usuario>
    </v-row>
  </v-container>
  
</template>

<script>
import axios from '../plugins/axios'
import Usuario from '../components/Usuarios'
export default {
  components: {
    appUsuario: Usuario
  },
  data() {
    return {
      usuarios: [],
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
    axios.get("/usuario").then(response =>{
      if(response.status==200){
        response.data.forEach(element => {
          this.usuarios.push(element);
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
 