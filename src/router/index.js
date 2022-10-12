import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../pages/login.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: "/",
        name: "Home",
        component: Home,
    }, {
        path: "/Login",
        name: "Login",
        component: Login
    }],
});
export default router;