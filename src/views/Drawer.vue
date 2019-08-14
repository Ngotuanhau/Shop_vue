<template>
  <v-card>
    <v-navigation-drawer
      :value="value"
      @input="$emit('input', $event)"
      class="c-bg-drawer"
      fixed
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="c-text">Directional</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template v-slot:append>
        <div class="pa-2 brown lighten-1">
          <v-btn to="/login" class="c-btn" block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  props: {
    value: false
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("login");
        });
    }
  }
};
</script>

<style>
</style>
