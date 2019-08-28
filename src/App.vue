<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app v-if="isAdmin.role === 'admin'"></v-navigation-drawer>
    <v-app-bar @toogle="drawer=!drawer" app v-if="isAuthenticated"></v-app-bar>
    <v-content transition="slide-x-transition">
      <v-layout fill-height>
        <v-snack-bar></v-snack-bar>
        <v-snackbar
          :message="message"
          :color="color"
          :top="y === 'top'"
          :bottom="y === 'bottom'"
          :left="x ==='left'"
          :right="x === 'right'"
          :multi-line="mode === 'multi-line'"
          :vertical="mode === 'vertical'"
          v-model="snackbar"
        >
          {{message}}
          <v-btn text dark @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
        <router-view v-on:showSnackbar="showSnackbar"></router-view>
      </v-layout>
    </v-content>
    <v-footer app v-if="isAuthenticated"></v-footer>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/views/Drawer";
import SnackBar from "@/components/Snackbar/Snackbar";
import AppBar from "@/views/Toolbar";
import Footer from "@/views/Footer";

export default {
  components: {
    vAppBar: AppBar,
    vNavigationDrawer: NavigationDrawer,
    vSnackBar: SnackBar,
    vFooter: Footer
  },

  data() {
    return {
      color: "",
      snackbar: false,
      message: "",
      timeout: null,
      y: null,
      x: null,
      mode: null,
      drawer: null
    };
  },

  methods: {
    showSnackbar(message, timeout = 3000, yPos = "top", xPos, mode) {
      this.message = message;
      this.timeout = timeout;
      this.y = yPos;
      this.x = xPos;
      this.mode = mode;
      this.snackbar = true;
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isAdmin() {
      return this.$store.getters.isAdmin;
      // console.log(isAdmin, "123");
    }
  }
};
</script>
