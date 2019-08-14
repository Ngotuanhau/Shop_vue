<template>
  <v-snackbar
    top
    v-model="snackbar.visible"
    :color="snackbar.type"
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline === true"
  >
    {{ snackbar.message }}
    <v-btn text @click="closeSnackbar">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    snackbar() {
      return this.$store.state.Snackbar.snackbar;
    }
  },

  methods: {
    ...mapMutations(["closeSnackbar"])
  }
};
</script>

<style>
</style>
