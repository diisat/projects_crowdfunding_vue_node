<template>
  <div class="align">
    <v-dialog v-model="dialogoEditar" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edita tu proyecto:</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field outlined v-model="nuevoNombre" label="Nombre" required></v-text-field>
                <v-textarea
                  outlined
                  rows="4"
                  row-height="30"
                  class="margenCampos"
                  label="Descripción"
                  v-model="nuevaDescripcion"
                ></v-textarea>
                <v-text-field
                  outlined
                  class="margenCampos"
                  v-model="nuevaVigencia"
                  label="Vigencia (días)"
                ></v-text-field>
                <v-text-field
                  outlined
                  class="margenCampos"
                  v-model="nuevaCuentaBancaria"
                  label="Cuenta Bancaria"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#A51F1F" text @click="dialogoEditar = false">Cancelar</v-btn>
          <v-btn color="#2D7C39" text @click="editar()">Terminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogoDonar" persistent max-width="600px">
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
          <v-btn color="#A51F1F" text @click="dialogoDonar = false">Cerrar</v-btn>
          <v-btn color="#2D7C39" text @click="donar()">Terminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogoContribuyentes" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">Estas son las personas que han contribuido a tu proyecto:</span>
        </v-card-title>
        <v-card-text>
          <v-simple-table fixed-header class="txt-left tablaContribuyentes">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="border border-first border-top txt-center">Nombre Completo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(nom, index) in nombresContribuyentes" :key="index">
                  <td class="border">{{nom}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#A51F1F" text @click="dialogoContribuyentes = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout align-center="true">
      <v-flex>
        <v-card raised>
          <v-img v-if="this.esArte == true" src="../images/arte.jpg" height="200px"></v-img>
          <v-img v-if="this.esDeporte == true" src="../images/deporte.jpg" height="200px"></v-img>
          <v-img v-if="this.esTecnologia == true" src="../images/tecnologia.jpg" height="200px"></v-img>
          <v-img v-if="this.esEducacion == true" src="../images/educacion.jpg" height="200px"></v-img>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{this.nombreAutor}}</div>
              <v-list-item-title class="headline mb-1">{{proyecto.nombre}}</v-list-item-title>
              <div class="body-2">Categoría: {{proyecto.descripcion}}</div>

              <v-expand-transition>
                <div class="margenContenidoExtra" v-if="this.desplegarTodo == true">
                  <!-- <v-divider></v-divider> -->
                  <div
                    class="margenArriba body-2"
                  >{{proyecto.dineroActual}}$ / {{proyecto.dineroNecesario}}$</div>
                  <v-progress-linear color="#2D7C39" height="15" v-model="progresoPorcentaje"></v-progress-linear>
                  <div class="margenArriba body-2">Categoría: {{proyecto.categoria}}</div>
                  <div class="margenArriba body-2">Vigencia: {{proyecto.vigencia}} días</div>
                  <div class="margenArriba body-2">Cuenta Bancaria: {{proyecto.cuentaBancaria}}</div>
                </div>
              </v-expand-transition>
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
              @click="abrirDialogoDonar()"
              v-if="this.desplegarTodo == true && this.esPropio == false"
              color="#2D7C39"
              text
            >Donar</v-btn>
            <v-btn
              @click="abrirDialogoContribuyentes()"
              v-if="this.desplegarTodo == true && this.esPropio == true"
              color="#2D7C39"
              text
            >Mirar Contribuyentes</v-btn>
            <v-btn
              @click="abrirDialogoEditar"
              v-if="this.desplegarTodo == true && this.esPropio == true"
              icon
              class="ma-2"
              color="black"
              dark
            >
              <v-icon dark>mdi-wrench</v-icon>
            </v-btn>
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
      esArte: false,
      esDeporte: false,
      esEducacion: false,
      esTecnologia: false,
      nuevoNombre: "",
      nuevaDescripcion: "",
      nuevaVigencia: undefined,
      nuevaCuentaBancaria: undefined,
      nombresContribuyentes: [],
      esPropio: false,
      nuevasMisDonaciones: [],
      nuevosContribuyentes: [],
      nuevaCantidad: 0,
      cantidadDonacion: 0,
      dialogoDonar: false,
      dialogoContribuyentes: false,
      dialogoEditar: false,
      nombreAutor: "",
      desplegarTodo: false,
      progresoPorcentaje: 0,
      progreso: "",
      color: ""
    };
  },
  created() {
    if(this.proyecto.categoria == "Deporte"){
      this.esDeporte = true;
    }else if(this.proyecto.categoria == "Arte"){
      this.esArte = true;
    }else if(this.proyecto.categoria == "Educación"){
      this.esEducacion = true;
    }else if(this.proyecto.categoria == "Tecnología"){
      this.esTecnologia = true;
    }

    this.nuevoNombre = this.proyecto.nombre;
    this.nuevaDescripcion = this.proyecto.descripcion;
    this.nuevaVigencia = this.proyecto.vigencia;
    this.nuevaCuentaBancaria = this.proyecto.cuentaBancaria;
    axios.get("/usuario/" + this.proyecto.idCreador).then(response => {
      if (response.status == 200) {
        this.nombreAutor =
          response.data.nombres + " " + response.data.apellidos;
      }
    });
    this.progresoPorcentaje =
      (this.proyecto.dineroActual / this.proyecto.dineroNecesario) * 100;
    if (this.id_usu == this.proyecto.idCreador) {
      this.esPropio = true;
    }
    this.proyecto.contribuyentes.forEach(idContri => {
      axios.get("/usuario/" + idContri).then(response => {
        if (response.status == 200) {
          this.nombresContribuyentes.push(
            response.data.nombres + " " + response.data.apellidos
          );
        }
      });
    });
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
    abrirDialogoEditar() {
      this.dialogoEditar = true;
    },
    abrirDialogoDonar() {
      this.dialogoDonar = true;
    },
    abrirDialogoContribuyentes() {
      this.dialogoContribuyentes = true;
    },
    editar() {
      if (isNaN(this.nuevaVigencia) || isNaN(this.nuevaCuentaBancaria)) {
        alert(
          "Los campos deben de Vigencia y Cuenta Bancaria deben ser numéricos"
        );
        this.nuevaVigencia = this.proyecto.vigencia;
        this.nuevaCuentaBancaria = this.proyecto.cuentaBancaria;
      } else {
        let proyectoEditado = {
          nombre: this.nuevoNombre,
          descripcion: this.nuevaDescripcion,
          vigencia: this.nuevaVigencia,
          cuentaBancaria: this.nuevaCuentaBancaria
        };
        axios
          .put("/proyecto/" + this.proyecto._id, proyectoEditado)
          .then(response => {
            if (response.status == 200) {
              alert("El proyecto se ha editado");
              this.proyecto.nombre = this.nuevoNombre;
              this.proyecto.descripcion = this.nuevaDescripcion;
              this.proyecto.vigencia = this.nuevaVigencia;
              this.cuentaBancaria = this.nuevaCuentaBancaria;
            }
          });
      }
      this.dialogoEditar = false;
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

      this.dialogoDonar = false;
    }
  }
};
</script>

<style>
.style {
  font-family: Arial, Helvetica, sans-serif;
}

.tablaContribuyentes {
  width: 98%;
  margin: 0.6em auto;
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
