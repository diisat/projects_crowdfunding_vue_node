<template>
  <div class="align">
    <v-card raised>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{this.nombreAutor}}</div>
          <v-list-item-title class="headline mb-1">{{proyecto.nombre}}</v-list-item-title>
          <v-list-item-subtitle>{{proyecto.descripcion}}</v-list-item-subtitle>
        </v-list-item-content>

        <!--  <v-list-item-avatar
        tile
        size="80"
        color="grey"
        ></v-list-item-avatar>-->
      </v-list-item>
    </v-card>
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
      nombreAutor: "Jose Galvis"
    };
  },
  created() {
    axios.get("/usuario/" + this.proyecto.idCreador).then(response => {
      if (response.status == 200) {
        this.nombreAutor = response.data.nombres +" "+ response.data.apellidos
      }
    });
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
</style>
