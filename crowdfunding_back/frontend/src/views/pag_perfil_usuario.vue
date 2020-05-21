<template>
  <div>
    <v-card class="mx-auto" max-width="80%" color="#C62828" tile>
      <v-row align="center" class="fill-height">
        <v-col align-self="start" cols="4">
          <!-- <v-col
          align-self="start"
          class="pa-0"
          cols="12"
          >-->
          <!-- AVATAR -->
          <v-avatar class="profile" color="grey" size="170" tile>
            <v-img v-if="this.genero == 'Femenino'" src="../images/avatar_mujer.jpg"></v-img>
            <v-img v-if="this.genero == 'Masculino'" src="../images/avatar_hombre.jpg"></v-img>
          </v-avatar>
        </v-col>

        <!-- INFO -->
        <v-col>
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title">{{nombres}} {{apellidos}}</v-list-item-title>
              <v-list-item-subtitle>Edad: {{edad}}</v-list-item-subtitle>
              <v-list-item-subtitle>Profesión: {{profesion}}</v-list-item-subtitle>
              <v-list-item-subtitle>Ciudad: {{ciudad}}</v-list-item-subtitle>
              <v-list-item-subtitle>Correo Electrónico: {{correo}}</v-list-item-subtitle>
              <v-list-item-subtitle>Sitios Web: {{sitiosWeb}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>

        <v-col>
          <!-- BOTON EDITAR -->
          <v-btn
            @click="abrirDialogoEditar()"
            type="submit"
            color="#43A047"
            dark
            class="titulo"
          >EDITAR MI PERFIL</v-btn>
        </v-col>

        <v-col>
          <!-- BOTON EDITAR -->
          <v-btn
            @click="abrirReporteGeneral()"
            type="submit"
            color="#A4A4A4"
            dark
            class="titulo"
          >REPORTE GENERAL</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col v-for="proy in misProyectos" :key="proy.nombre" cols="12" md="4">
                <app-proyecto :proyecto="proy"></app-proyecto>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col v-for="proy in misDonaciones" :key="proy.nombre" cols="12" md="4">
                <app-proyecto :proyecto="proy"></app-proyecto>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-dialog v-model="dialogoReporte" persistent max-width="700px">
      <v-card class="mx-auto text-center" color="white" max-width="700">
        <v-card-text>
          <div color="black" class="tituloReporte display-1 font-weight-thin">
            <b>Porcentaje de Dinero Obtenido para todos tus proyectos:</b>
          </div>
          <v-sheet color="#E5E5E5">
            <v-sparkline
              :value="value"
              :labels="labels"
              color="black"
              height="150"
              padding="2"
              stroke-linecap="round"
              smooth
            ></v-sparkline>
          </v-sheet>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-center">
          <v-btn color="#A51F1F" text @click="dialogoReporte = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogoEditar" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edita tu proyecto:</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field outlined v-model="nuevoNombres" label="Nombres" required></v-text-field>
                <v-text-field outlined v-model="nuevoApellidos" label="Apellidos" required></v-text-field>
                <v-text-field outlined v-model="nuevaEdad" label="Edad" required></v-text-field>
                <v-text-field outlined v-model="nuevoCiudad" label="Ciudad" required></v-text-field>
                <v-text-field outlined v-model="nuevaProfesion" label="Profesión" required></v-text-field>
                <v-text-field outlined v-model="nuevoCorreo" label="Correo Electrónico" required></v-text-field>
                <v-text-field outlined v-model="nuevoSitiosWeb" label="Sitios Web" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#A51F1F" text @click="dialogoEditar = false">Cancelar</v-btn>
          <v-btn color="#2D7C39" text @click="editarPerfil()">Terminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Proyecto from "../components/Proyectos";
import axios from "../plugins/axios";

export default {
  components: {
    appProyecto: Proyecto
  },
  data() {
    return {

      ultimoAgregado:false,

      labels: [],
      value: [],

      id: "",
      nombres: "",
      apellidos: "",
      correo: "",
      contrasena: "",
      edad: 0,
      profesion: "",
      ciudad: "",
      genero: "",
      sitiosWeb: "",
      misProyectos: [],
      misDonaciones: [],
      cont: 0,
      tab: null,
      items: [{ tab: "MIS PROYECTOS" }, { tab: "MIS DONACIONES" }],
      dialogoEditar: false,

      nuevoNombres: "",
      nuevoApellidos: "",
      nuevaEdad: 0,
      nuevoCiudad: "",
      nuevaProfesion: "",
      nuevoCorreo: "",
      nuevaContrasena: "",
      nuevoSitiosWeb: "",

      dialogoReporte: false
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
    genero_usu() {
      return this.$store.state.genero;
    },
    sitiosWeb_usu() {
      return this.$store.state.sitiosWeb;
    },
    misProyectos_usu() {
      return this.$store.state.misProyectos;
    },
    misDonaciones_usu() {
      return this.$store.state.misDonaciones;
    }
  },
  created() {
    (this.id = this.id_usu),
      (this.nombres = this.nombres_usu),
      (this.apellidos = this.apellidos_usu),
      (this.correo = this.correo_usu),
      (this.edad = this.edad_usu),
      (this.profesion = this.profesion_usu),
      (this.ciudad = this.ciudad_usu),
      (this.genero = this.genero_usu),
      (this.sitiosWeb = this.sitiosWeb_usu),
      (this.nuevoNombres = this.nombres_usu),
      (this.nuevoApellidos = this.apellidos_usu),
      (this.nuevoCorreo = this.correo_usu),
      (this.nuevaEdad = this.edad_usu),
      (this.nuevaProfesion = this.profesion_usu),
      (this.nuevoCiudad = this.ciudad_usu),
      (this.nuevoSitiosWeb = this.sitiosWeb_usu),

      this.value.push(0);
      this.labels.push(" ");

      this.misProyectos_usu.forEach(element => {
        axios.get("/proyecto/" + element + "").then(response => {
          if (response.status == 200) {
            this.misProyectos.push(response.data);
            var porcentajeCompleto =(response.data.dineroActual / response.data.dineroNecesario) * 100;
            var porcentajeAcotado = parseInt(porcentajeCompleto.toFixed(0));
            this.value.push(porcentajeAcotado);
            this.labels.push(" (" + porcentajeAcotado + "%)");
          }
        });
      });



    this.misDonaciones_usu.forEach(element => {
      axios.get("/proyecto/" + element + "").then(response => {
        if (response.status == 200) {
          this.misDonaciones.push(response.data);
        }
      });
    });
  },
  methods: {
    abrirReporteGeneral() {
      this.dialogoReporte = true;
      if(this.ultimoAgregado == false){
        this.value.push(0);
      this.labels.push(" ");
      this.ultimoAgregado = true;
      }
    },
    abrirDialogoEditar() {
      this.dialogoEditar = true;
    },
    editarPerfil() {
      if (isNaN(this.nuevaEdad)) {
        alert("El campo de edad debe ser numérico.");
        this.nuevaEdad = this.edad;
      } else {
        let usuarioEditado = {
          nombres: this.nuevoNombres,
          apellidos: this.nuevoApellidos,
          edad: this.nuevaEdad,
          profesion: this.nuevaProfesion,
          sitiosWeb: this.nuevoSitiosWeb,
          ciudad: this.nuevoCiudad,
          correo: this.nuevoCorreo
        };
        axios.put("/usuario/" + this.id, usuarioEditado).then(response => {
          if (response.status == 200) {
            alert("El usuario se ha editado");
            this.nombres = this.nuevoNombres;
            this.apellidos = this.nuevoApellidos;
            this.edad = this.nuevaEdad;
            this.profesion = this.nuevaProfesion;
            this.sitiosWeb = this.nuevoSitiosWeb;
            this.ciudad = this.nuevoCiudad;
            this.correo = this.nuevoCorreo;

            this.$store.commit("changeTheNombres", this.nuevoNombres);
            this.$store.commit("changeTheApellidos", this.nuevoApellidos);
            this.$store.commit("changeTheCorreo", this.nuevoCorreo);
            this.$store.commit("changeTheEdad", this.nuevaEdad);
            this.$store.commit("changeTheProfesion", this.nuevaProfesion);
            this.$store.commit("changeTheCiudad", this.nuevoCiudad);
            this.$store.commit("changeTheSitiosWeb", this.nuevoSitiosWeb);

            this.dialogoEditar = false;
          }
        });
      }
    }
  }
};
</script>

<style>
.margen {
  margin: 2%;
}

.tituloReporte {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
 