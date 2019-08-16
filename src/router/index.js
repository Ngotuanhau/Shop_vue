import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";

import Home from "@/views/Home";
import About from "@/views/About";
import Login from "@/views/Auth/Login";
import SignUp from "@/views/Auth/SignUp";
import ResetPass from "@/views/Auth/ResetPass";
import ChangePass from "@/views/Auth/ChangePass";

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
            path: "/change_pass/:token/:email",
            name: "change_pass",
            component: ChangePass,
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
                    name: "Home",
                    component: Home
                },
                {
                    path: "/about",
                    name: "About",
                    component: About
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            next({
                path: "/login",
                params: {
                    nextUrl: to.fullPath
                }
            });
            return;
        }
    }
    next();
});

export default router;