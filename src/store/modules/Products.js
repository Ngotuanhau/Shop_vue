import axios from "axios";

const state = {
    products: [],
    product: ""
};

const getters = {
    products: state => state.products,
    product: state => state.product
};

const actions = {
    getProducts({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/products")
                .then(response => {
                    let products = response.data;
                    commit("setProducts", products);
                    resolve(products);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};

const mutations = {
    setProducts(state, products) {
        state.products = Object.assign(products, state.products);
        state.status = "Get Products Success!!";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};