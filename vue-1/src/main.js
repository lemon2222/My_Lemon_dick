import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "@/permission";

Vue.use(ElementUI);
Vue.config.productionTip = false;

// 创建和挂载根实例。
// 通过 router 配置参数注入路由，
// 让整个应用都有路由功能
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
