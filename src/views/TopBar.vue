<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      left-arrow
      @click-left="onClickLeft"
      @click-right="clickRight"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, NavBar } from "vant";
export default {
  name: "top-bar",
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    leftText: {
      type: String,
      default: "返回"
    },
    rightText: {
      type: String,
      default: "更多"
    },
    clickRight: {
      type: Function,
      default: function() {
        Vue.prototype.$toast("顶部导航右键点击了");
      }
    }
  },

  data() {
    return {};
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less"></style>
