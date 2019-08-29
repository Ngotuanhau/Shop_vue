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
    //GET PRODUCTS-------------------------------------------------------------
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
    },

    //ADD PRODUCT-------------------------------------------------------------
    async addProduct({ commit }, product) {
        const response = await axios
            .post("/products", product)
            .then(response => {
                console.log(response);
                commit("setAddProduct", product);
            })
            .catch(error => {
                commit("setAddProductError", error);
            });
    }
};

const mutations = {
    setProducts(state, products) {
        state.products = Object.assign(products, state.products);
        state.status = "Get Products Success!!";
    },

    setAddProduct(state, product) {
        state.product = state.products.unshift(product);
        state.status = "Add Product Success";
    },

    setAddProductError(state) {
        state.status = "Add Product Failure!!";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};