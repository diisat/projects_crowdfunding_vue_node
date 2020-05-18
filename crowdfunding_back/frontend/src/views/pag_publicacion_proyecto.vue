<template>
  <div class="margen">
    
    <h2 class="titulo">PUBLICACIÓN PROYECTO</h2>
    <v-text-field class="margenCampos" v-model="nombre" label="Nombre"></v-text-field>
    <v-text-field class="margenCampos" v-model="descripcion" label="Descripcion"></v-text-field>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="margenCampos" v-on="on">{{categoria}}</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(cate, index) in categorias"
          :key="index"
          @click="cambiarCategoria(cate)"
        >
          <v-list-item-title>{{ cate.titulo }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-text-field class="margenCampos" v-model="dineroNecesario" label="Dinero Necesario"></v-text-field>
    <v-text-field class="margenCampos" v-model="vigencia" label="Vigencia (días)"></v-text-field>
    <v-text-field class="margenCampos" v-model="cuentaBancaria" label="Cuenta Bancaria"></v-text-field>

    <v-btn @click="publicar" type="submit" color="#A51F1F" dark class="titulo">PUBLICAR</v-btn>
  </div>
</template>

<script>
import axios from "../plugins/axios";
export default {
  data() {
    return {
      nombre: "",
      descripcion: "",
      dineroNecesario: "",
      vigencia: "",
      cuentaBancaria: "",
      categoria: "Escoja la categoría",
      categorias: [
        { titulo: "Deporte" },
        { titulo: "Educación" },
        { titulo: "Tecnología" },
        { titulo: "Arte" }
      ]
    };
  },
  methods: {
    publicar() {
      if (
        this.nombre == "" ||
        this.descripcion == "" ||
        this.dineroNecesario == "" ||
        this.vigencia == "" ||
        this.cuentaBancaria == "" ||
        this.categoria == "Escoja la categoría"
      ) {
        alert("Complete todos los campos");
      } else {
        let proyecto = {
          nombre: this.nombre,
          descripcion: this.descripcion,
          dineroNecesario: this.dineroNecesario,
          dineroActual: 0,
          vigencia: this.vigencia,
          cuentaBancaria: this.cuentaBancaria,
          categoria: this.categoria,
          contribuyentes: [],
          idCreador: "5ec2f073db56da355cdab2ca"
        };
        axios.post("/proyecto", proyecto).then(response => {
          if (response.data == "Proyecto creado satisfactoriamente") {
            this.resultadoBueno = true;
            this.$router.push("/proyectos");
          }
        });
      }
    },
    cambiarCategoria(cat) {
      this.categoria = cat.titulo;
    }
  }
};
</script>

<style>
.margen {
  margin-left: 20%;
  margin-right: 20%;
}

.titulo {
  margin-top: 10%;
  text-align: center;
  margin-bottom: 5%;
}

.margenCampos {
  margin-top: 3%;
}
</style>