import Vuex from "vuex";
import Vue from "vue";

import Auth from "./modules/Auth";
import Snackbar from "./modules/Snackbar";
import Products from "./modules/Products";

//Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
    modules: {
        Auth,
        Snackbar,
        Products
    }
});