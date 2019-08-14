const state = {
    snackbar: {
        visible: false,
        message: null,
        timeout: 6000,
        multiline: false,
        type: ""
    }
};

const mutations = {
    showSnackbar(state, payload) {
        state.snackbar.multiline = payload.message.length > 50 ? true : false;
        if (payload.multiline) {
            state.snackbar.multiline = payload.multiline;
        }
        if (payload.timeout) {
            state.snackbar.timeout = payload.timeout;
        }

        payload.visible = true;
        state.snackbar = Object.assign({}, payload);
    },

    closeSnackbar(state) {
        state.snackbar = Object.assign({}, {
            visible: false,
            message: null,
            timeout: 6000,
            multiline: false,
            type: ""
        });
    }
};

export default {
    state,
    mutations
};