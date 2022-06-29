import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
// import axios from "./utils/axios";
// import Cookies from "@/utils/cookie";
// import momment from "moment";
import vConsole from "vconsole";

// import * as echarts from "echarts";
import * as filters from "./filters"; // global filters
import * as componetns from "./components";

/**
 * css
 */
import "./assets/styles/css/common.css";
import "./assets/styles/css/reset.css";
/**
 * less
 */
import "./assets/styles/less/index.less";

/**
 * vant
 */
import { Button, Search, Tabbar, TabbarItem } from "vant";

const app = createApp(App);

app.use(Button)
  .use(Search)
  .use(Tabbar)
  .use(TabbarItem);

// 调接口可以去掉
if (process.env.NODE_ENV === "development") {
  require("../mock");
}

if (["dev", "uat"].includes(process.env.VUE_APP_env)) {
  app.config.globalProperties.$vConsole = new vConsole();
}

app.config.globalProperties = {
  // $axios: axios,
  // $cookies: Cookies,
  // $momment: momment,
  // $echarts: echarts
};

// 注册全局过滤器
let newsFilters = {};
Object.keys(filters).forEach((key) => {
  newsFilters[key] = filters[key];
});
app.config.globalProperties.$filters = Object.assign({}, newsFilters);

// 注册全局组件
Object.keys(componetns).forEach((key) => {
  app.component(componetns[key].name, componetns[key]);
});

app.use(store).use(router).mount("#app");
