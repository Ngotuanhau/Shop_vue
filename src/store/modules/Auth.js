import axios from "axios";
import router from "../../router";

const state = {
    token: localStorage.getItem("user-token") || "",
    user: {}
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};
/* eslint-disable */

const actions = {
    signup({ commit }, user) {
        return new Promise((resolve, reject) => {
            axios
                .post("http://127.0.0.1:3333/signup", user)
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
                .post("http://127.0.0.1:3333/login", user)
                .then(response => {
                    console.log(response);
                    const token = response.data.data.token;
                    const user = response.data.data.user;
                    localStorage.setItem("user-token", token);
                    axios.defaults.headers.common["Authorization"] = token;
                    commit("setUser", token, user);
                    resolve(response);
                })
                .catch(error => {
                    commit("setError", error.message);
                    commit("setStatus", "failure");
                    localStorage.removeItem("user-token");
                    reject(error);
                });
        });
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit("setLogout");
            localStorage.removeItem("user-token");
            delete axios.defaults.headers.common["Authorization"];
            resolve();
        });
    }
};

const mutations = {
    setUser(state, token, user) {
        state.status = "success";
        state.token = token;
        state.user = user;
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