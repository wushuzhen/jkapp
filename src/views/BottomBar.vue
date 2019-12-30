<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/message">提醒</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/admin">告警</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/admin">商城</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/admin">我</van-tabbar-item>
      <van-dropdown-menu id="user" direction="up">
        <van-dropdown-item v-model="currUser" :options="userOptions" />
      </van-dropdown-menu>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import { DropdownMenu, DropdownItem } from "vant";
import Vue from "vue";
Vue.use(DropdownMenu).use(DropdownItem);
export default {
  name: "bottom-bar",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  data() {
    return {
      active: 0
    };
  },

  computed: {
    currUser: {
      get: function() {
        return this.$store.state.currUser;
      },
      set: function(val) {
        this.$store.commit("setCurrUser", { val: val, save: true });
      }
    },
    userOptions() {
      let options = [];
      let userList = this.$store.state.userList;
      if (userList.length == 0) {
        options = [{ text: "无保健用户", value: 0 }];
      } else {
        for (let i = 0; i < userList.length; i++) {
          options.push({
            text: userList[i].userName,
            value: userList[i].id
          });
        }
      }
      return options;
    }
  },

  watch: {
    $route(to, from) {
      switch (to.fullPath) {
        case "/home":
          this.active = 0;
          break;
        case "/message":
          this.active = 1;
          break;
        case "/admin":
          this.active = 2;
          break;
        default:
          this.active = 0;
      }
    }
  }
};
</script>

<style scoped lang="less">
#user {
  right: 10px;
  position: relative;
}
</style>
