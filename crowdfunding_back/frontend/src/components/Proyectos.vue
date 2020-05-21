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
                <v-switch v-model="nuevoActivo" class="ma-2 margenCampos" label="Proyecto Activo"></v-switch>
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
          <span class="headline">Reporte de tu proyecto:</span>
        </v-card-title>
        <v-card-text>
          <div class="reporte">Cantidad de dinero Necesaria: {{proyecto.dineroNecesario}}$</div>
          <div class="reporte">Cantidad de dinero Actual: {{proyecto.dineroActual}}$</div>
          <div class="reporte">Porcentaje completado: {{progresoPorcentaje}}%</div>
          <v-data-table :headers="headers" :items="infoContribuyentes" item-key="nombre"></v-data-table>
        </v-card-text>

        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#A51F1F" text @click="dialogoContribuyentes = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout align-center="true">
      <v-flex>
        <v-card :color="dynamic" raised>
          <v-img v-if="this.esArte == true" src="../images/arte.jpg" height="200px"></v-img>
          <v-img v-if="this.esDeporte == true" src="../images/deporte.jpg" height="200px"></v-img>
          <v-img v-if="this.esTecnologia == true" src="../images/tecnologia.jpg" height="200px"></v-img>
          <v-img v-if="this.esEducacion == true" src="../images/educacion.jpg" height="200px"></v-img>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{this.nombreAutor}}</div>
              <v-list-item-title class="headline mb-1">{{proyecto.nombre}}</v-list-item-title>
              <div class="body-2">{{proyecto.descripcion}}</div>

              <v-expand-transition>
                <div class="margenContenidoExtra" v-if="this.desplegarTodo == true">
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
              v-if="this.desplegarTodo == true && this.esPropio == false && this.proyecto.activo"
              color="#2D7C39"
              text
            >Donar</v-btn>
            <v-btn
              @click="abrirDialogoContribuyentes()"
              v-if="this.desplegarTodo == true && this.esPropio == true"
              color="#2D7C39"
              text
            >Reporte</v-btn>
            <v-btn
              @click="abrirDialogoEditar()"
              v-if="this.desplegarTodo == true && this.esPropio == true && this.editable"
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
     series: [{
            data: []
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: [],
            }
          },
      headers: [
        {
          text: "Nombre Completo",
          align: "start",
          sortable: false,
          value: "nombre"
        },
        { text: "Cantidad de la donación", value: "cantidad", sortable: true }
      ],
      editable: undefined,
      nuevoActivo: undefined,
      dynamic: "",
      esArte: false,
      esDeporte: false,
      esEducacion: false,
      esTecnologia: false,
      nuevoNombre: "",
      nuevaDescripcion: "",
      nuevaVigencia: undefined,
      nuevaCuentaBancaria: undefined,
      infoContribuyentes: [],
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
      progresoPorcentaje: 0
    };
  },
  created() {
    if (this.proyecto.dineroActual == this.proyecto.dineroNecesario) {
      this.editable = false;
    } else {
      this.editable = true;
    }
    if (this.proyecto.activo == true) {
      this.dynamic = "#F7F7F7";
    } else {
      this.dynamic = "#A4A4A4";
    }

    if (this.proyecto.categoria == "Deporte") {
      this.esDeporte = true;
    } else if (this.proyecto.categoria == "Arte") {
      this.esArte = true;
    } else if (this.proyecto.categoria == "Educación") {
      this.esEducacion = true;
    } else if (this.proyecto.categoria == "Tecnología") {
      this.esTecnologia = true;
    }

    this.nuevoActivo = this.proyecto.activo;
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


    this.proyecto.contribuyentes.forEach(contribu => {
      axios.get("/usuario/" + contribu.idContribuyente).then(response => {
        if (response.status == 200) {
          let elContri = {
            nombre: response.data.nombres + " " + response.data.apellidos,
            cantidad: contribu.cantidad,
            
          };
          
          this.infoContribuyentes.push(elContri);
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
    },
    nombres_usu() {
      return this.$store.state.nombres;
    },
    apellidos_usu() {
      return this.$store.state.apellidos;
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
          cuentaBancaria: this.nuevaCuentaBancaria,
          activo: this.nuevoActivo
        };
        axios
          .put("/proyecto/" + this.proyecto._id, proyectoEditado)
          .then(response => {
            if (response.status == 200) {
              alert("El proyecto se ha editado");
              this.proyecto.nombre = this.nuevoNombre;
              this.proyecto.descripcion = this.nuevaDescripcion;
              this.proyecto.vigencia = this.nuevaVigencia;
              this.proyecto.cuentaBancaria = this.nuevaCuentaBancaria;
              this.proyecto.activo = this.nuevoActivo;
              this.dialogoEditar = false;
              if (this.proyecto.activo == true) {
                this.dynamic = "#F7F7F7";
              } else {
                this.dynamic = "#A4A4A4";
              }
            }
          });
      }
    },
    donar() {
      this.nuevaCantidad =
        parseInt(this.proyecto.dineroActual, 10) +
        parseInt(this.cantidadDonacion, 10);

      this.nuevosContribuyentes = this.proyecto.contribuyentes;

      let proyectoEstado = true;

      if (
        this.nuevaCantidad > this.proyecto.dineroNecesario ||
        this.nuevaCantidad == this.proyecto.dineroNecesario
      ) {
        this.nuevaCantidad = this.proyecto.dineroNecesario;
        proyectoEstado = false;
        let contri = {
          idContribuyente: this.id_usu,
          cantidad:
            parseInt(this.proyecto.dineroNecesario, 10) -
            parseInt(this.proyecto.dineroActual, 10)
        };
        this.nuevosContribuyentes.push(contri);
      } else {
        let contri = {
          idContribuyente: this.id_usu,
          cantidad: parseInt(this.cantidadDonacion, 10)
        };
        this.nuevosContribuyentes.push(contri);
      }

      this.proyecto.dineroActual = this.nuevaCantidad;

      this.proyecto.activo = proyectoEstado;

      if (this.proyecto.activo == true) {
        this.dynamic = "#F7F7F7";
      } else {
        this.dynamic = "#A4A4A4";
      }

      let proyectoActualizado = {
        dineroActual: this.nuevaCantidad,
        contribuyentes: this.nuevosContribuyentes,
        activo: proyectoEstado
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

#chart {
  justify-content: center;
  display: inline-block;
  /* margin-left: 20%; */
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

.reporte {
  text-align: start;
  font-size: 100%;
  margin-left: 2%;
  margin-bottom: 2%;
}
</style>
