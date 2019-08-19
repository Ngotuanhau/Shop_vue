<template>
  <v-layout class="c-bg-login">
    <v-flex>
      <h1>Setting Info Profile</h1>
    </v-flex>
    <v-flex class="c-form-login" xs6 md4 offset-md4 offset-xs3 pa-3>
      <!-- Form validate -->
      <ValidationObserver ref="observer">
        <v-form slot-scope="{ invalid, validated }">
          <ValidationProvider name="Full name" rules="required|max:30">
            <v-text-field
              slot-scope="{errors,valid}"
              v-model="fullname"
              :counter="30"
              :error-messages="errors"
              :success="valid"
              label="Full name"
              required
              class="ma-0"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="User name" rules="required|alpha_num|max:30">
            <v-text-field
              slot-scope="{errors,valid}"
              v-model="username"
              :counter="30"
              :error-messages="errors"
              :success="valid"
              label="User name"
              required
              class="ma-0"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="Phone number" rules="required|decimal|max:12">
            <v-text-field
              slot-scope="{errors,valid}"
              v-model="phone"
              :counter="12"
              :error-messages="errors"
              :success="valid"
              label="Phone number"
              required
              class="ma-0"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="E-mail" rules="required|email">
            <v-text-field
              slot-scope="{errors,valid}"
              v-model="email"
              :error-messages="errors"
              :success="valid"
              label="E-mail"
              required
              class="ma-0"
            ></v-text-field>
          </ValidationProvider>

          <ValidationProvider name="Address" rules="required|max:300">
            <v-text-field
              slot-scope="{errors,valid}"
              v-model="address"
              :counter="300"
              :error-messages="errors"
              :success="valid"
              label="Address"
              required
              class="ma-0"
            ></v-text-field>
          </ValidationProvider>
          <v-flex class="c-gr-button">
            <v-btn
              @click.native="submit"
              :disabled="invalid || !validated"
              class="c-btn c-btn-login mb-3"
              text
            >
              <span class="c-btn-login-text">Update</span>
            </v-btn>
          </v-flex>
        </v-form>
      </ValidationObserver>
      <!-- Form validate -->
    </v-flex>
  </v-layout>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },

  data() {
    return {
      fullname: "",
      username: "",
      phone: "",
      address: "",
      email: ""
    };
  },

  methods: {
    get_Profile() {
      axios.get("/account/me").then(response => {
        console.log(response);
      });
    }
  },

  mounted() {
    this.get_Profile();
  }
};
</script>
<style lang="scss" scoped>
@import "./../../styles/main.scss";

.c-bg-login {
  display: block;
  width: 100%;
}
</style>