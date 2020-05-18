<template>
<div class="align">
  <v-card
    raised
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{proyecto.nombre}}</div>
        <v-list-item-title class="headline mb-1">{{this.nombreAutor}}</v-list-item-title>
        <v-list-item-subtitle>{{proyecto.descripcion}}</v-list-item-subtitle>
      </v-list-item-content>

     <!--  <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar> -->
    </v-list-item>
  </v-card>
  </div>
</template>

<script>
export default {
  props: {
    proyecto: {
      type: Object
    }
  },
  data(){
    return {
      nombreAutor: "Jose Galvis"
    }
  }
};
</script>

<style>
.style {
  font-family: Arial, Helvetica, sans-serif;
}

.align{
  text-align: center;
  margin-top: 2%;
  margin-bottom: 2%;
}

#titulo {
  color: #3342ff;
}

</style>
