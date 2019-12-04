import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { ENGINE_METHOD_NONE } from "constants";

Vue.use(Vuex);
const CancelToken = axios.CancelToken;

export default new Vuex.Store({
  state: {
    deviceready: false,
    source: CancelToken.source(),
    currUser: 0,
    userList: []
  },
  mutations: {
    setDeviceReady(state, arg) {
      state.deviceready = arg;
    },
    setSource(state, arg) {
      // 路由切换新建新建取消令牌，并写入store
      state.source = arg;
    },
    setCurrUser(state, arg) {
      state.currUser = Number(arg.val);
      if (arg.val == 0) {
        if (localStorage.getItem("currUser"))
          localStorage.removeItem("currUser");
      } else {
        if (arg.save) localStorage.setItem("currUser", arg.val);
      }
    },
    setUserList(state, arg) {
      state.userList = arg;
    }
  },
  actions: {},
  modules: {}
});
