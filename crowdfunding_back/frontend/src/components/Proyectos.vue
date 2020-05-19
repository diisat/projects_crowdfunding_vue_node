<template>
  <div class="align">
    <v-dialog v-model="dialogo" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Estás a punto de realizar una donación!</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="cantidadDonacion" label="Cantidad ($)" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#A51F1F" text @click="dialogo = false">Cerrar</v-btn>
          <v-btn color="#2D7C39" text @click="donar()">Terminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout align-center="true">
      <v-flex>
        <v-card raised>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{this.nombreAutor}}</div>
              <v-list-item-title class="headline mb-1">{{proyecto.nombre}}</v-list-item-title>
              <v-list-item-subtitle>{{proyecto.descripcion}}</v-list-item-subtitle>
              <div class="margenContenidoExtra" v-if="this.desplegarTodo == true">
                <hr />
                <div
                  class="margenArriba body-2"
                >{{proyecto.dineroActual}}$ / {{proyecto.dineroNecesario}}$</div>
                <v-progress-linear color="#2D7C39" height="15" v-model="progresoPorcentaje"></v-progress-linear>
                <div class="margenArriba body-2">Categoría: {{proyecto.categoria}}</div>
                <div class="margenArriba body-2">Vigencia: {{proyecto.vigencia}} días</div>
                <div class="margenArriba body-2">Cuenta Bancaria: {{proyecto.cuentaBancaria}}</div>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn
              @click="cambiarDesplegar(true)"
              v-if="this.desplegarTodo == false"
              color="#2D7C39"
              text
            >Conocer más</v-btn>
            <v-btn
              @click="cambiarDesplegar(false)"
              v-if="this.desplegarTodo == true"
              color="#A51F1F"
              text
            >Minimizar</v-btn>
            <v-btn
              @click="abrirDialogo()"
              v-if="this.desplegarTodo == true"
              color="#2D7C39"
              text
            >Donar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "../plugins/axios";
export default {
  props: {
    proyecto: {
      type: Object
    }
  },
  data() {
    return {
      nuevasMisDonaciones: [],
      nuevosContribuyentes: [],
      nuevaCantidad: 0,
      cantidadDonacion: 0,
      dialogo: false,
      nombreAutor: "",
      desplegarTodo: false,
      progresoPorcentaje: 0,
      progreso: "",
      color: ""
    };
  },
  created() {
    axios.get("/usuario/" + this.proyecto.idCreador).then(response => {
      if (response.status == 200) {
        this.nombreAutor =
          response.data.nombres + " " + response.data.apellidos;
      }
    });
    this.progresoPorcentaje =
      (this.proyecto.dineroActual / this.proyecto.dineroNecesario) * 100;
  },
  computed: {
    id_usu() {
      return this.$store.state.id;
    },
    misDonaciones() {
      return this.$store.state.misDonaciones;
    }
  },
  methods: {
    cambiarDesplegar(valor) {
      this.desplegarTodo = valor;
    },
    abrirDialogo() {
      this.dialogo = true;
    },
    donar() {
      this.nuevaCantidad =
        parseInt(this.proyecto.dineroActual, 10) +
        parseInt(this.cantidadDonacion, 10);

      let condicion = false;
      this.proyecto.contribuyentes.forEach(element => {
        if (element == this.id_usu) {
          condicion = true;
        }
      });

      this.nuevosContribuyentes = this.proyecto.contribuyentes;

      if (condicion == false) {
        this.nuevosContribuyentes.push(this.id_usu);
      }

      if (this.nuevaCantidad > this.proyecto.dineroNecesario) {
        this.nuevaCantidad = this.proyecto.dineroNecesario;
      }

      this.proyecto.dineroActual = this.nuevaCantidad;

      let proyectoActualizado = {
        nombre: this.proyecto.nombre,
        descripcion: this.proyecto.descripcion,
        dineroNecesario: this.proyecto.dineroNecesario,
        dineroActual: this.nuevaCantidad,
        vigencia: this.proyecto.vigencia,
        cuentaBancaria: this.proyecto.cuentaBancaria,
        categoria: this.proyecto.categoria,
        contribuyentes: this.nuevosContribuyentes,
        idCreador: this.proyecto.idCreador
      };

      axios
        .put("/proyecto/" + this.proyecto._id, proyectoActualizado)
        .then(response => {
          if (response.status == 200) {
            this.dialogo = false;
            this.progresoPorcentaje =
              (this.proyecto.dineroActual / this.proyecto.dineroNecesario) *
              100;
            alert("Felicidades has hecho una donación");
          }
        });
      this.nuevasMisDonaciones = this.misDonaciones;
      let condi = false;
      this.nuevasMisDonaciones.forEach(element => {
        if (element == this.proyecto._id) {
          condi = true;
        }
      });
      if (condi == false) {
        this.nuevasMisDonaciones.push(this.proyecto._id);
        this.$store.commit("changeTheMisDonaciones", this.nuevasMisDonaciones);
      }

      let usuario = {
        misDonaciones: this.nuevasMisDonaciones
      };
      axios
        .put("/usuario/" + this.id_usu, usuario)
        .then(response => console.log(response));
    }
  }
};
</script>

<style>
.style {
  font-family: Arial, Helvetica, sans-serif;
}

.align {
  text-align: center;
  margin-top: 4%;
  margin-bottom: 4%;
}

#titulo {
  color: #3342ff;
}

.margenContenidoExtra {
  margin-top: 2%;
  margin-bottom: 2%;
}

.margenArriba {
  margin-top: 5%;
}
</style>
