import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
Vue.use(VueRouter);
const main = "main";
const routes = [
    {
        path: "/login",
        name: "login",
        meta: { layout: "empty" },
        component: () => import("../views/Login"),

    },
    {
        path: "/register",
        name: "register",
        meta: { layout: "empty" },
        component: () => import("../views/Register")
    },
    {
        path: '/',
        name: 'home',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Home')
    },
    {
        path: "/categories",
        name: "categories",
        meta: { layout: main, auth: true },
        component: () => import("../views/Categories")
    },
    {
        path: "/history",
        name: "history",
        meta: { layout: main, auth: true },
        component: () => import("../views/History")
    },
    {
        path: "/planning",
        name: "planning",
        meta: { layout: main, auth: true },
        component: () => import("../views/Planning")
    },
    {
        path: "/profile",
        name: "profile",
        meta: { layout: main, auth: true },
        component: () => import("../views/Profile")
    },
    {
        path: "/record",
        name: "record",
        meta: { layout: main, auth: true },
        component: () => import("../views/Record")
    },
    {
        path: "/detail/:id",
        name: "detail",
        meta: { layout: main, auth: true },
        component: () => import("../views/Detail")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.auth);
    if(!currentUser && requireAuth)
    {
        next('/login?message=login');
    }
    else {
        // if(routes.some(r => r.path === to.path))
        //     next();
        // else {
        //     next(from.path);
        // }
        next();
    }

})
export default router;
