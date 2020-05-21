<template>
  <div>
    <h2 class="margen">Registro</h2>
    <form @submit.prevent="crearUsuario">

      <v-text-field class="margen" v-model="nombres" label="Nombres"></v-text-field>
      <v-text-field class="margen" v-model="apellidos" label="Apellidos"></v-text-field>

      <p id="genero_p" class="margen">Género : </p>
      <v-radio-group v-model="genero" class="margen">
          <v-radio label="Femenino" value="Femenino"></v-radio>
          <v-radio label="Masculino" value="Masculino"></v-radio>
      </v-radio-group>

      

      <v-text-field class="margen" v-model="correo" label="Email"></v-text-field>
      <v-text-field
        v-model="contrasena"
        :type="'password'"
        label="Contraseña"
        hint="At least 8 characters"
        class="input-group--focused margen"
      ></v-text-field>

      <v-text-field class="margen" v-model="edad" label="Edad"></v-text-field>
      <v-text-field class="margen" v-model="profesion" label="Profesión"></v-text-field>
      <v-text-field class="margen" v-model="ciudad" label="Ciudad"></v-text-field>
      <v-text-field class="margen" v-model="sitiosWeb" label="Sitios Web"></v-text-field>

      <v-btn type="submit" color="green" class="margen">REGISTRAR</v-btn>
      <v-row class="margen"><p class="registro_p" >¿Ya tienes una cuenta?</p><router-link class="registro_p" to="/iniciarSesion"> ¡Inicia sesión!</router-link></v-row>
    </form>
  </div>
</template>

<script>
import axios from '../plugins/axios'
export default {
  data() {
    return {
      user: {
        nombres: "",
        apellidos: "",
        contrasena: "",
        correo: "",
        edad: 0,
        profesion: "",
        ciudad: "",
        sitiosWeb: "",
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        genero: ""
       
      }
      // rules: {
      //   required: value => !!value || "Required.",
        
      // }
    };
  },
  methods: {      
      crearUsuario(){


          let usuario = {
            nombres: this.nombres,
            apellidos: this.apellidos,
            correo: this.correo,
            contrasena: this.contrasena,
            edad: this.edad,
            profesion: this.profesion,
            ciudad: this.ciudad,
            sitiosWeb: this.sitiosWeb,
            genero: this.genero,
            misProyectos: [],
            misDonaciones: []        
        }
        
      
        axios.post("/usuario",usuario)
            .then(
                response => 
                    console.log(response)
        )
        
        alert("Registro exitoso. Ahora inicia sesión!");
        this.$router.push("/iniciarSesion");
      }
      
  } 
};
</script>

<style>
.margen {
  margin-top: 1%;
}
#genero_p {
  font-size: 75%;
  color: gray;
}
.registro_p{
  text-align: center;
  font-style: italic;
  font-size: medium;
  color: gray;
}

</style>