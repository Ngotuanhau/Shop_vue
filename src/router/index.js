import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";
import VueCookies from "vue-cookies";

import Home from "@/views/Home";
import Login from "@/views/Auth/Login";
import SignUp from "@/views/Auth/SignUp";
import ResetPass from "@/views/Auth/ResetPass";
import ChangePass from "@/views/Auth/ChangePass";

import Me from "@/views/GuestLayouts/Me";
import About from "@/views/GuestLayouts/About";

import Manage from "@/views/AdminLayouts/Manage";

Vue.use(Router);

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/sign_up",
            name: "sign_up",
            component: SignUp
        },
        {
            path: "/reset_pass",
            name: "reset_pass",
            component: ResetPass
        },
        {
            path: "/change_pass/:token/:email",
            name: "change_pass",
            component: ChangePass
        },
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/admin",
            component: {
                render: h => h("router-view")
            },
            meta: {
                requiresAuth: true,
                roles: ["admin"]
            },
            children: [{
                path: "/manage",
                name: "Manage",
                component: Manage
            }]
        },
        {
            path: "/guest",
            component: {
                render: h => h("router-view")
            },
            meta: {
                requiresAuth: true,
                roles: ["user"]
            },
            children: [{
                    path: "/about",
                    name: "About",
                    component: About
                },
                {
                    path: "/me",
                    name: "Me",
                    component: Me
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const authUser = store.state.Auth.user;
        if (store.getters.isAuthenticated) {
            if (!to.meta.roles) {
                return next();
            }
            if (to.meta.roles.includes(authUser.role)) {
                switch (authUser.role) {
                    case "user":
                        next({ path: "/guest" });
                        break;
                    case "admin":
                        next({ path: "/admin" });
                        break;
                    default:
                        next({ path: "/" });
                }
            }
        }
    }
    return next();
});

export default router;