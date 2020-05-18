<template>
  <div class="margen">
    <h2 class="titulo">Inicio de Sesion</h2>
      <v-text-field  v-model="email" label="Email"></v-text-field>
      <v-text-field
        v-model="contrasena"
        :type="'password'"
        label="Contraseña"
      ></v-text-field>
      <v-btn @click="iniciarSesion" type="submit" color=#A51F1F dark class="titulo" >INICIAR SESION</v-btn>
  </div>
</template>

<script>
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
      iniciarSesion(){
      }
  }
};
</script>

<style>
.margen {
  margin-left: 20%;
  margin-right: 20%;
}

.titulo{
    margin-top: 10%;
    text-align: center;
    margin-bottom: 5%;
}


</style>