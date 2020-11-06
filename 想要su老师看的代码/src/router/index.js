import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    id: "/",
    path: "/",
    name: "Home",
    component: () => import("@/view/home/index.vue"),
  },
  {
    id: "/menu1",
    path: "menu1",
    name: "menu1",
    component: () => import("@/view/menu1/index.vue"),
  },
  {
    id: "/menu2",
    path: "menu2",
    component: () => import("@/view/menu2/index.vue"),
  },
  {
    id: "/applicationAdmin",
    path: "applicationAdmin",
    name: "applicationAdmin",
    component: () => import("@/view/applicationAdmin/index.vue"),

  },
  {
    id: "/login",
    path: "/login",
    name: "Login",
    component: () => import("@/view/login/index.vue"),
  },
  {
    id: "*",
    path: "*",
    name: "404",
    component: () => import("@/view/404/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
