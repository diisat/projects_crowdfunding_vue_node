<template>
  <v-card
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{proyecto.nombre}}</div>
        <v-list-item-title class="headline mb-1">Jose</v-list-item-title>
        <v-list-item-subtitle>{{proyecto.descripcion}}</v-list-item-subtitle>
      </v-list-item-content>

     <!--  <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar> -->
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    subject: {
      type: Object
    }
  },
  /* data(){
    return {
      nombreAutor: "Jose"
    }
  } */
};
</script>

<style>
.style {
  font-family: Arial, Helvetica, sans-serif;
}

#titulo {
  color: #3342ff;
}
.margen {
  margin: 5px;
  align-content: flex-end;
}
</style>
