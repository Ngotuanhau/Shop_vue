import Vue from "vue";
import Router from "vue-router";
// import store from "@/store/index";
import firebase from "firebase";

import Home from "@/views/Home";
import Login from "@/views/Auth/Login";
import SignUp from "@/views/Auth/SignUp";
import ResetPass from "@/views/Auth/ResetPass";

Vue.use(Router);

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/sign_up",
            name: "sign_up",
            component: SignUp,
            meta: {
                guest: true
            }
        },
        {
            path: "/reset_pass",
            name: "reset_pass",
            component: ResetPass,
            meta: {
                guest: true
            }
        },
        {
            path: "/",
            component: {
                render: h => h("router-view")
            },
            meta: {
                requiresAuth: true
            },
            children: [{
                path: "/",
                name: "home",
                component: Home
            }]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = firebase.auth().currentUser;
    if (requiresAuth && !currentUser) next("login");
    else if (!requiresAuth && currentUser) next("/");
    else next();
});

// else if (!requiresAuth && isAuthenticated) {
//     next({
//         path: "/"
//     });
// }

// if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isAuthenticated) {
//         next({
//             path: "/login",
//             params: {
//                 nextUrl: to.fullPath
//             }
//         });
//         return;
//     }
// }
// next();

export default router;