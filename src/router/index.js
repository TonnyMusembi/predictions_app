import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../pages/login.vue"
import Register from "../pages/register.vue";

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
    }, {
        path: "/Register",
        name: "Register",
        component: Register
    }],
});
export default router;