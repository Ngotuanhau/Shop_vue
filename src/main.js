import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "@/plugin/vuetify";
import VeeValidate from "vee-validate";
import "./styles/_main.scss";
import VueCookies from "vue-cookies";
import setAuthToken from "./helpers/token";

Vue.use(VueCookies);
Vue.use(VeeValidate);
Vue.use(axios);

Vue.config.productionTip = false;

window.axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3333";

const token = VueCookies.get("user-token");
if (token) {
    setAuthToken(token);
}

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount("#app");