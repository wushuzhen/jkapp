import Vue from "vue";
import "./plugins/axios";
import "./plugins/bluetooth";
import "amfe-flexible";
import utils from "./common/utils";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Toast } from "vant";
import qs from "qs";

Vue.use(Toast);
Vue.use(utils);
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  Vue.prototype.$toast.clear();
  const CancelToken = Vue.axios.CancelToken;
  store.state.source.cancel && store.state.source.cancel();
  store.commit("setSource", CancelToken.source());
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log("deviceready");
  store.commit("setDeviceReady", true);
}
