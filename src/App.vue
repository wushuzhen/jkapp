<template>
  <div id="app">
    <router-view />
    <bottom-bar v-show="true" />
  </div>
</template>

<script>
import BottomBar from "@/views/BottomBar";
export default {
  components: {
    [BottomBar.name]: BottomBar
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
  position: fixed;
  z-index: 999;
}
</style>
