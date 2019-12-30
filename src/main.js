/* eslint-disable no-undef */
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
import echarts from 'echarts';
import { Dialog } from 'vant';
import VueAMap from 'vue-amap';

Vue.prototype.$echarts = echarts;

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'a8c1d4e6a73d80b7857ff4fe85474f61',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

Vue.use(Toast);
Vue.use(utils);
Vue.use(Dialog);
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  Vue.prototype.$toast.clear();
  const CancelToken = Vue.axios.CancelToken;
  store.state.source.cancel && store.state.source.cancel();
  store.commit("setSource", CancelToken.source());
  next();
});

/*
  增加事件对象this.$eventHub
  this.$eventHub.$emit('YOUR_EVENT_NAME', yourData)
  this.$eventHub.$on('YOUR_EVENT_NAME', (yourData)=>{
    handle(yourData)
  })
*/
Vue.prototype.$eventHub= Vue.prototype.$eventHub ||  new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log("deviceready");
  store.commit("setDeviceReady", true);

  if (typeof QRScanner != "undefined") {
    //初始化检测，申请摄像头等权限
    Vue.prototype.$QRScanner = QRScanner
    QRScanner.prepare(onDone); // show the prompt
  } else {
    console.error("二维码插件加载失败");
  }

  function onDone(err, status) {
    if (err) {
      console.error(err);
    }
    if (status.authorized) {
      console.log("二维码插件初始化成功");
      //QRScanner.destroy(function(status){
      //  console.log(status);
      //});
      //Runs hide, cancelScan, stops video capture, removes the video preview, and deallocates as much as possible. Basically reverts the plugin to it's startup-state.      
    } else if (status.denied) {
      // The video preview will remain black, and scanning is disabled. We can
      // try to ask the user to change their mind, but we'll have to send them
      // to their device settings with `QRScanner.openSettings()`.
      console.log("用户拒绝访问摄像头");
    } else {
      // we didn't get permission, but we didn't get permanently denied. (On
      // Android, a denial isn't permanent unless the user checks the "Don't
      // ask again" box.) We can ask again at the next relevant opportunity.
    }
  }
}
