<template>
  <v-app-bar class="c-bg-toolbar" absolute v-if="isAuthenticated">
    <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="$emit('toogle')"></v-app-bar-nav-icon>
    <v-spacer class="hidden-sm-and-up"></v-spacer>
    <v-toolbar-title>
      <router-link class="c-text" to="/">
        <span class="font-weight-regular display-1 font-italic px-4">Technology Toys</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn class="c-btn" text @click="logout">
        <span>Logout</span>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style lang="scss" scoped>
.c-text {
  text-decoration: none;
}
</style>
