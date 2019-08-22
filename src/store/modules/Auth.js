import axios from "axios";
import router from "../../router";
import VueCookies from "vue-cookies";

const state = {
    token: VueCookies.get("user-token") || "",
    user: {},
    users: [],
    email: {}
};

const getters = {
    isAuthenticated: state => !!state.token,
    isAuthenticatedAdmin: state => state.user,
    isAuthenticatedSuperAdmin: state => state.user,
    authStatus: state => state.status
};
/* eslint-disable */

const actions = {
    signup({ commit }, user) {
        return new Promise((resolve, reject) => {
            axios
                .post("/signup", user)
                .then(response => {
                    console.log(response);
                    const message = response.data.message;
                    commit("setStatus", "success");
                    router.push("/login");
                })
                .catch(error => {
                    commit("setError", error.message);
                    commit("setStatus", "failure");
                });
        });
    },

    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            axios
                .post("/login", user)
                .then(response => {
                    console.log(response);
                    const token = response.data.data.token;
                    VueCookies.set("user-token", token);
                    commit("setUser", token);
                    resolve(response);
                })
                .catch(error => {
                    commit("setError", error.message);
                    commit("setStatus", "failure");
                    VueCookies.remove("user-token");
                    reject(error);
                });
        });
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit("setLogout");
            VueCookies.remove("user-token");
            resolve();
        });
    }
};

const mutations = {
    setUser(state, token, user) {
        state.status = "success";
        state.token = token;
    },
    setError(state, error) {
        state.error = error;
    },
    setStatus(state, status) {
        state.status = status;
    },
    setLogout(state) {
        state.status = "";
        state.token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};