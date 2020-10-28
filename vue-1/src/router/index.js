import Vue from "vue";
import VueRouter from "vue-router";
// 定义 (路由) 组件
// 可以从其他文件 import 进来
// 如果使用模块化机制编程 导入Vue和VueRouter 要调用 Vue.use(VueRouter)
Vue.use(VueRouter);

// 定义路由
// 每个路由应该映射一个组件 其中"component" 可以成为 Vue.extend() 创建的组件构造器 or只是一个组件配置对象。
// name跳转的时候用
const routes = [
  {
    id: "/",
    path: "/",
    name: "Home",
    component: () => import("@/view/home/index.vue"),
    children: [
      {
        // menu1 匹配成功，被渲染在 Home 
        id: "/menu1",
        path: "menu1",
        name: "menu1",
        component: () => import("@/view/menu1/index.vue"),
      },
      {
        // menu2 匹配成功，被渲染在 Home
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
    ],
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

// 创建 router 实例 然后传 `routes` 配置
const router = new VueRouter({
  mode: "history",
  routes, // === routes: routes
});

export default router;
