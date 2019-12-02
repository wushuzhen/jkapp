<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { Toast, NavBar } from "vant";
export default {
  name: "top-bar",
  components: {
    [NavBar.name]: NavBar
  },

  data() {
    return {
      title:"标题"
    }
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>

<style scoped lang="less">
</style>
