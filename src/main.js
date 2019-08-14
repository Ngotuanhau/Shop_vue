import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "@/plugin/vuetify";
import VeeValidate from "vee-validate";
import "./styles/_main.scss";

Vue.use(VeeValidate);
Vue.use(axios);

window.axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3333";

Vue.config.productionTip = false;

const token = localStorage.getItem("user-token");
if (token) {
    axios.defaults.headers.common["Authorization"] = token;
}

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount("#app");