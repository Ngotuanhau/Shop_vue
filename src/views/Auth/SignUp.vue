<template>
  <v-layout class="c-bg-login">
    <v-img :src="images.bg_login" class="c-bg-login">
      <v-flex class="c-form-login" xs6 md4 offset-md4 offset-xs3 pa-3>
        <v-avatar width="100px" height="100px">
          <v-img :src="images.logo"></v-img>
        </v-avatar>
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
                dark
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
                dark
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
                dark
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
                dark
                class="ma-0"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="Password" rules="required|min:6" vid="password">
              <v-text-field
                slot-scope="{errors,valid}"
                v-model="password"
                :error-messages="errors"
                :success="valid"
                label="Password"
                type="password"
                required
                dark
                class="ma-0"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="Password Confirmation" rules="required|confirmed:password">
              <v-text-field
                slot-scope="{errors,valid}"
                v-model="passwordConfirm"
                :error-messages="errors"
                :success="valid"
                label="Password Confirmation"
                type="password"
                required
                dark
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
                dark
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
                <span class="c-btn-login-text">Sign up</span>
              </v-btn>
            </v-flex>
          </v-form>
        </ValidationObserver>
        <!-- Form validate -->
        <v-divider light></v-divider>
        <span>
          <router-link
            to="/reset_pass"
            class="c-tran-forgot font-weight-regular font-italic"
          >Forgot your password</router-link>
        </span>
        <v-divider light></v-divider>
        <span class="c-tran-login">
          go back
          <router-link class="c-tran-login font-weight-regular font-italic" to="/login">Login!</router-link>
        </span>
      </v-flex>
    </v-img>
  </v-layout>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },

  props: ["message"],

  data() {
    return {
      images: {
        bg_login: require("../../assets/login.png"),
        logo: require("../../assets/logo_1.jpg")
      },
      fullname: "",
      username: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  },

  methods: {
    submit() {
      const user = {
        fullname: this.fullname,
        username: this.username,
        phone: this.phone,
        address: this.address,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      };
      axios
        .post("/signup", user)
        .then(response => {
          console.log(response);
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
          this.$router.push("/login");
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
          return;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../styles/main.scss";

.c-bg-login {
  display: flex;
  align-items: center;
  height: 722px;
  width: 100%;
}

.c-form-login {
  background-color: $bg-color-login;
  border-radius: 10px;
  width: 100%;
  display: block;
  text-align: center;
}

.c-gr-button {
  display: grid;
  justify-content: center;
  margin-top: 10px;
}

.c-btn {
  border-radius: 20px;
}

.c-btn-login {
  background-color: $bg-color-btn-login;
}

.c-btn-login-text {
  padding: 5px 60px;
  color: $color-text;
}

.c-tran-login,
.c-tran-forgot {
  color: $color-text;
  text-align: center;
  text-decoration: none;
}
</style>
