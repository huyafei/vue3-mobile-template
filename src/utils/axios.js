import axios from "axios";
import Cookies from "./cookie";
import { Dialog, Toast } from "vant";
import router from "../router/index";
import login from "@/views/login";

axios.defaults.baseURL = process.env.VUE_APP_baseUrl;

// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// 超时时间
axios.defaults.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    //全局加token
    let token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code === 99999) {
      let msg = "身份过期，请从新登录"
      Toast.fail(msg);
      setTimeout(() => {
        router.push({
          name: "Login",
          query: {
            redirect: router.currentRoute.value.fullPath
          }
        });
      }, 1500);
      return Promise.reject(msg);
    } else {
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    console.log("err" + error);
    let msg = "服务器响应错误";
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      msg = "服务器请求超时";
    }
    Dialog.alert({
      title: "提示",
      message: msg
    });
    return Promise.reject(error);
  }
);
export default axios;
