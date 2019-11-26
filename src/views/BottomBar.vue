<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/message">消息</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/admin">管理中心</van-tabbar-item>
      <van-dropdown-menu id="user" direction="up">
        <van-dropdown-item v-model="currUser" :options="userList" />
      </van-dropdown-menu>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import { DropdownMenu, DropdownItem } from 'vant';
import Vue from 'vue';
Vue.use(DropdownMenu).use(DropdownItem);
export default {
  name: 'bottom-bar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  data() {
    return {
      active: 0,
      currUser: '保健用户1',
      userList: [
        { text: '保健用户1', value: '保健用户1'},
        { text: '保健用户2', value: '保健用户2'},
        { text: '保健用户3', value: '保健用户3'},
      ]
    }
  },

  watch: {
    $route(to, from) {
      switch (to.fullPath) {
        case '/home':
          this.active = 0;
          break;
        case '/message':
          this.active = 1;
          break;
        case '/admin':
          this.active = 2;
          break;
        default:
          this.active = 0;
      }
    }
  }
}
</script>

<style scoped lang="less">
#user{
  right: 10px;
  position: relative;
}
</style>
