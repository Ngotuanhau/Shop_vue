<template>
  <v-footer class="c-bg-footer py-4 px-5">
    <v-layout>
      <v-flex class="c-text" xs12 md6>
        &copy;{{ new Date().getFullYear() }}
        <strong>Vuetify</strong>
      </v-flex>
      <!-- <v-flex class="c-group-icon" xs12 md6>
        <v-btn text class="c-btn">
          <v-icon color="brown lighten-1">$vuetify.icons.twitter</v-icon>
        </v-btn>
        <v-btn text class="c-btn">
          <v-icon color="brown lighten-1">$vuetify.icons.google</v-icon>
        </v-btn>
        <v-btn text class="c-btn">
          <v-icon color="brown lighten-1">$vuetify.icons.instagram</v-icon>
        </v-btn>
        <v-btn text class="c-btn">
          <v-icon color="brown lighten-1">$vuetify.icons.facebook</v-icon>
        </v-btn>
      </v-flex>-->
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style lang="scss" scoped>
// .c-bg-footer {
//   background-color: $main-bg-color-3;
// }
// .c-text {
//   color: $text-color-1;
//   display: flex;
//   align-items: center;
// }
// .c-group-icon {
//   display: flex;
//   justify-content: flex-end;
// }
// .c-btn {
//   min-width: 15px;
//   margin: 6px 0;
// }
</style>
