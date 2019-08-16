<template>
  <v-layout class="c-bg-login">
    <v-img :src="images.bg_login" class="c-bg-login" alt="hinh anh">
      <v-flex class="c-form-login" xs6 md4 offset-md4 offset-xs3 pa-5>
        <v-avatar width="100px" height="100px">
          <v-img :src="images.logo"></v-img>
        </v-avatar>
        <ValidationObserver ref="observer">
          <v-form slot-scope="{ invalid, validated }">
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

            <v-flex class="c-gr-button">
              <v-btn
                @click.native="submit"
                :disabled="invalid || !validated"
                class="c-btn c-btn-login mb-3"
                text
              >
                <span class="c-btn-login-text">RESET PASSWORD</span>
              </v-btn>
            </v-flex>
          </v-form>
        </ValidationObserver>

        <v-divider class="mt-10"></v-divider>
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

  data() {
    return {
      images: {
        bg_login: require("../../assets/login.png"),
        logo: require("../../assets/logo_1.jpg")
      },
      password: "",
      passwordConfirm: "",
      show: false
    };
  },

  methods: {
    submit() {
      axios
        .post(
          `/change_password/${this.$route.params.token}/${this.$route.params.email}`,
          { password: this.password, passwordConfirm: this.passwordConfirm }
        )
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
.c-btn-face {
  background-color: $bg-color-btn-face;
}

.c-btn-login-text,
.c-btn-face-text {
  padding: 5px 60px;
  color: $color-text;
}

.c-tran-login {
  color: $color-text;
  text-align: center;
  text-decoration: none;
}
</style>
