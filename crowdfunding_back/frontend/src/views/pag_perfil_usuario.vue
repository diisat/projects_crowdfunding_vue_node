<template>
  <v-card
    class="mx-auto"
    max-width="80%"
    tile
  >
    <v-img
      height="300"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
            tile
          >
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="title">{{nombres}}</v-list-item-title>
              <v-list-item-subtitle>{{profesion}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
  
</template>

<script>

export default {
  components: {
   
  },
  data() {
    return {
      id: '',
      nombres: '',
      apellidos: '',
      correo: '',
      contrasena: '',
      edad: 0,
      profesion: '',
      ciudad:'',
      sitiosWeb: '',
      misProyectos:'',
      misDonaciones:''

    };
  },
  computed: {
    id_usu() {
      return this.$store.state.id;
    },
    nombres_usu() {
      return this.$store.state.nombres;
    },
    apellidos_usu() {
      return this.$store.state.apellidos;
    },
    correo_usu() {
      return this.$store.state.correo;
    },
    edad_usu() {
      return this.$store.state.edad;
    },
    profesion_usu() {
      return this.$store.state.profesion;
    },
    ciudad_usu() {
      return this.$store.state.ciudad;
    },
    sitiosWeb_usu() {
      return this.$store.state.sitiosWeb;
    },
    misProyectos_usu() {
      return this.$store.state.misProyectos;
    },
    misDonaciones_usu() {
      return this.$store.state.misDonaciones;
    },
    
  },
  created() {
    (this.id = this.id_usu),
    (this.nombres = this.nombres_usu),
    (this.apellidos = this.apellidos_usu),
    (this.correo = this.correo_usu),
    (this.edad = this.edad_usu),
    (this.profesion = this.profesion_usu),
    (this.ciudad = this.ciudad_usu),
    (this.sitiosWeb = this.sitiosWeb_usu),
    (this.misProyectos = this.misProyectos_usu),
    (this.misDonaciones = this.misDonaciones_usu)
      
  }  
};
</script>

<style>
.margen {
  margin: 2%;
}
</style>
 