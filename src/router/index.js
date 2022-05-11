import { createRouter, createWebHistory } from "vue-router";
import middlewarePipeline from './middleware/middlewarePipeline'

import store from "@/store"
import authentication from "./middleware/authentication";


const routes = [
    {
        path: "/signIn",
        name: "signIn",
        component: () => import("@/views/v-signIn.vue"),
    },
    {
        path: "/users",
        meta: {middleware: [authentication]},
        name: "users",
        component: () => import("@/views/v-users.vue"),
    },
    {
        path: "/roles",
        meta: {middleware: [authentication]},
        name: "roles",
        component: () => import("@/views/v-roles.vue"),
    },
    {
        path: "/",
        meta: {middleware: [authentication]},
        name: "home",
        component: () => import("@/views/v-home.vue"),
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        router,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router;