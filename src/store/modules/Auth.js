import axios from "axios";
import router from "../../router";
import VueCookies from "vue-cookies";

const state = {
    token: VueCookies.get("token") || "",
    user: VueCookies.get("user") || "",
    users: []
};

const getters = {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.user,
    // isAuthenticatedSuperAdmin: state => state.user,
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
                    // console.log(response);
                    const token = response.data.token;
                    const user = response.data.user;
                    VueCookies.set("user", user);
                    VueCookies.set("token", token);
                    commit("setUser", user);
                    commit("setToken", token);
                    resolve(response);
                })
                .catch(error => {
                    commit("setError", error.message);
                    commit("setStatus", "failure");
                    VueCookies.remove("token");
                    VueCookies.remove("user");

                    reject(error);
                });
        });
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit("setLogout");
            VueCookies.remove("token");
            VueCookies.remove("user");

            resolve();
        });
    }
};

const mutations = {
    setUser(state, user) {
        state.status = "success";
        state.user = user;
    },
    setToken(state, token) {
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