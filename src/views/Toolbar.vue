<template>
  <div class="c-toolbar">
    <v-app-bar class="c-bg-toolbar" flat absolute>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="$emit('toogle')"></v-app-bar-nav-icon>
      <v-spacer class="hidden-sm-and-up"></v-spacer>
      <v-toolbar-title>
        <router-link class="c-text" to="/">
          <span class="font-weight-regular display-1 font-italic px-4">Technology Toys</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn text class="c-btn">
          <router-link to="/" class="c-text">Home</router-link>
        </v-btn>
        <v-btn text class="c-btn">
          <router-link to="/about" class="c-text">About Us</router-link>
        </v-btn>
        <v-btn text class="c-btn">
          <router-link to="/me" class="c-text">Me</router-link>
        </v-btn>
        <v-btn class="c-btn" text @click="logout">
          <span class="c-text">Logout</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    }
  }
};
</script>

<style lang="scss" scoped>
.c-toolbar {
  height: 64px;
}
.c-text {
  text-decoration: none;
}
</style>
