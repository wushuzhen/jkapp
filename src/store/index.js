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
    userList: [],
    bottombar: false, //是否显示底部按钮条
    qrcode:"",
    contactRefresh:false //是否刷新联系人列表
  },
  mutations: {
    setBottombar(state, arg) {
      state.bottombar = arg;
    },
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
    },
    setQrcode(state, arg){
      state.qrcode = arg;
    },
    setContactRefresh(state, arg){
      state.contactRefresh = arg;
    }
  },
  actions: {},
  modules: {}
});
