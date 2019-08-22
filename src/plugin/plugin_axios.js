import axios from "axios";
import VueCookies from "vue-cookies";

export default {
    install(Vue, options) {
        window.axios = axios;
        axios.defaults.baseURL = "http://127.0.0.1:3333";
        axios.interceptors.request.use(
            config => {
                const token = VueCookies.get("user-token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );
    }
};