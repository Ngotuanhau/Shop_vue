<template>
  <v-layout>
    <v-dialog
      :value="value"
      @input="$emit('input', $event)"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="brown lighten-4">
          <v-btn icon @click="$emit('input', false)">
            <v-icon color="brown lighten-1">$vuetify.icons.close</v-icon>
          </v-btn>
          <v-toolbar-title style="color:#8D6E63">Edit Profile</v-toolbar-title>
        </v-toolbar>

        <v-form ref="form">
          <v-card-text>
            <v-container>
              <v-layout wrap class="create_form">
                <v-flex>
                  <v-text-field v-model="editData.fullname" label="Full name*"></v-text-field>
                </v-flex>

                <v-flex>
                  <v-text-field v-model="editData.phone" label="Phone*"></v-text-field>
                </v-flex>

                <v-flex>
                  <v-text-field v-model="editData.address" label="Address*"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="brown lighten-1" text @click="$emit('input', false)">Close</v-btn>
            <v-btn color="brown lighten-1" text @click.prevent="submit">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    value: false,
    item: {}
  },

  data() {
    return {
      editData: {}
    };
  },

  watch: {
    value(val) {
      if (val) {
        this.editData = Object.assign({}, this.item);
      }
    }
  },

  methods: {
    submit() {
      axios
        .put("/account/update_profile", this.editData)
        .then(response => {
          console.log(response);
          this.item.fullname = response.data.data.fullname;
          this.item.phone = response.data.data.phone;
          this.item.address = response.data.data.address;
          this.$store.commit(
            "showSnackbar",
            {
              message: response.data.message,
              timeout: 3000,
              multiline: false,
              type: "success"
            },
            { module: "Snackbar" }
          );
          this.$emit("input", false);
        })
        .catch(error => {
          this.$store.commit(
            "showSnackbar",
            {
              message: error.response.data.message,
              timeout: 3000,
              multiline: false,
              type: "error"
            },
            { module: "Snackbar" }
          );
        });
    }
  }
};
</script>

<style scoped>
.create_form {
  display: block;
}
</style>
