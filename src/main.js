// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import vuetify from "./plugin/vuetify";

const fb = require("./helpers/firebase");

Vue.config.productionTip = false;

/* eslint-disable no-new */
let app;
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            vuetify,
            router,
            store,
            render: h => h(App)
        }).$mount("#app");
    }
});