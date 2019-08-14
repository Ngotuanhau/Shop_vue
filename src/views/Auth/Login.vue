<template>
  <v-layout class="c-bg-login">
    <v-img :src="images.bg_login" class="c-bg-login" alt="hinh anh">
      <v-flex class="c-form-login" xs6 md4 offset-md4 offset-xs3 pa-5>
        <v-avatar width="100px" height="100px">
          <v-img :src="images.logo"></v-img>
        </v-avatar>
        <ValidationObserver ref="observer">
          <v-form slot-scope="{ invalid, validated }">
            <VTextFieldWithValidation rules="required|email" v-model="email" label="E-mail" />
            <VTextFieldWithValidation
              rules="required|min:6"
              v-model="password"
              label="Password"
              :append-icon="show ? '$vuetify.icons.eye' : '$vuetify.icons.eye_off'"
              @click:append="show = !show"
              :type="show ? 'text' : 'password'"
            />

            <v-flex class="c-gr-button">
              <v-btn
                class="c-btn c-btn-login mb-3"
                text
                @click.prevent="submit"
                :disabled="invalid || !validated"
              >
                <span class="c-btn-login-text">Sign In</span>
              </v-btn>
            </v-flex>
          </v-form>
        </ValidationObserver>
        <span>
          <router-link
            to="/reset_pass"
            class="c-tran-forgot font-weight-regular font-italic"
          >Forgot your password</router-link>
        </span>
        <v-divider class="mt-10"></v-divider>
        <span class="c-tran-create">
          You have don't an account?
          <br />You can
          <router-link
            class="c-tran-create font-weight-regular font-italic"
            to="/sign_up"
          >Create now!</router-link>
        </span>
      </v-flex>
    </v-img>
  </v-layout>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import VTextFieldWithValidation from "@/components/input/VTextFieldWithValidation";

export default {
  components: {
    ValidationObserver,
    VTextFieldWithValidation
  },

  data() {
    return {
      images: {
        bg_login: require("../../assets/login.png"),
        logo: require("../../assets/logo_1.jpg")
      },
      email: "",
      password: "",
      show: false
    };
  },

  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", user)
        .then(() => this.$router.push("/"))
        .catch(error =>
          this.$store.commit(
            "showSnackbar",
            {
              message: error.response.data.message,
              timeout: 4000,
              multiline: false,
              type: "error"
            },
            { module: "Snackbar" }
          )
        );
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
.c-btn-face {
  background-color: $bg-color-btn-face;
}

.c-btn-login-text,
.c-btn-face-text {
  padding: 5px 60px;
  color: $color-text;
}

.c-tran-create,
.c-tran-forgot {
  color: $color-text;
  text-align: center;
  text-decoration: none;
}
</style>
