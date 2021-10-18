import axios from "axios";
import cookies from "./cookie";
import { Dialog, Toast } from "vant";
import router from "../router/index";

axios.defaults.baseURL = process.env.VUE_APP_baseUrl;

// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// 超时时间
axios.defaults.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    //全局加token
    let token = cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const res = response.data;
    if (res.status === 99999) {
      Toast.fail("请登录");
      setTimeout(() => {
        router.push({
          name: "Login",
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        });
      }, 1500);
      return Promise.reject("error");
    } else {
      return response;
    }
  },
  function (error) {
    // 对响应错误做点什么
    console.log("err" + error);
    Dialog.alert({
      title: "警告",
      message: "登录连接超时",
    });
    return Promise.reject(error);
  }
);
export default axios;
