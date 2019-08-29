<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input', $event)" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete Item</v-card-title>
        <v-card-text>
          You want delete item --- {{item.name}}
          <br />Click Ok! to delete
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('input', false)">Close</v-btn>
          <v-btn color="green darken-1" text @click="deleteProduct(item.id)">OK!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    value: false,
    item: {}
  },

  methods: {
    deleteProduct(id) {
      axios.delete(`/products/${id}`).then(response => {
        let products = this.$store.getters.products;
        const item = products.find(item => item.id === id);
        const index = products.indexOf(item);
        if (index >= 0) {
          products.splice(index, 1);
        }
        this.$store.commit("setProducts", products);
      });
      this.$emit("input", false);
    }
  }
};
</script>

<style>
</style>