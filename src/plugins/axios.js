"use strict";

import Vue from "vue";
import axios from "axios";
import router from "../router";
import qs from "qs";

// Full config:  https://github.com/axios/axios#request-config
let baseUrl =
  process.env.NODE_ENV === "production" ? "http://192.168.31.150:8000" : "/api";
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = function(data) {
  data = qs.stringify(data); //**转换Django能收取的数据格式**
  return data;
};

let config = {
  baseURL: baseUrl,
  timeout: 15 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
};

const _axios = axios.create(config);
_axios.CancelToken = axios.CancelToken;
_axios.isCancel = axios.isCancel;
_axios.all = axios.all;

let pageAxiosList = new Set(); // 用于解决同时请求多个 service 接口时，必须等最慢的接口返回数据之后再关闭 loading
let axiosSource; // 需要最新的链接的保存参数的地方

_axios.interceptors.request.use(
  function(config) {
    console.log("_axios.interceptors.request:" + config.url);
    let authInfo = {};
    let sessionid = localStorage.getItem("sessionid");
    if (sessionid) {
      authInfo["sessionid"] = sessionid;
    }
    config.headers["Authorization"] = JSON.stringify(authInfo);
    return config;
  },
  function(error) {
    Vue.prototype.$toast("网络发送错误，请重试");
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    console.log("_axios.interceptors.response data:" + response.data);
    let resp = JSON.parse(response.data);
    if (resp.data && resp.data.sessionid)
      localStorage.setItem("sessionid", resp.data.sessionid);
    return resp;
  },
  function(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          console.log("session过期");
          router.replace({
            path: "/login"
          });
          location.reload();
      }
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
