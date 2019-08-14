<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app></v-navigation-drawer>
    <v-app-bar @toogle="drawer=!drawer" app></v-app-bar>
    <v-content transition="slide-x-transition">
      <v-layout>
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
  </v-app>
</template>

<script>
import NavigationDrawer from "@/views/Drawer";
import SnackBar from "@/components/Snackbar/Snackbar";
import AppBar from "@/views/Toolbar";

export default {
  components: {
    vAppBar: AppBar,
    vNavigationDrawer: NavigationDrawer,
    vSnackBar: SnackBar
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
  }
};
</script>
