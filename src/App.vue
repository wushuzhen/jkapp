<template>
  <div id="app">
    <van-loading v-show="loading" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <bottom-bar v-show="show" />
  </div>
</template>
<script src="">
</script>
<script>
import { mapState } from "vuex";
import BottomBar from "@/views/BottomBar";
import { Loading } from "vant";
export default {
  components: {
    [BottomBar.name]: BottomBar,
    [Loading.name]: Loading
  },

  data() {
    return {
      show: false
    };
  },

  computed: {
    ...mapState(["loading"])
  },

  watch: {
    "$store.state.bottombar"() {
      this.show = this.$store.state.bottombar;
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
  width: 100%;
  height: 100%;
  // position: fixed;
  z-index: 999;
  margin-bottom: 52px;
}
</style>
