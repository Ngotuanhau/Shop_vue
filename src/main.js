import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import vuetify from "@/plugin/vuetify";
import VeeValidate from "vee-validate";
import "./styles/_main.scss";
import plugin_axios from "./plugin/plugin_axios";

Vue.use(VeeValidate);
Vue.use(plugin_axios);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount("#app");