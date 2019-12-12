<template>
  <div class="admin">
    <van-cell-group class="menu-title" title="管理员功能">
      <van-cell title="管理员信息" to="/adminUserInfo" is-link />
      <van-cell title="保健用户管理" to="/healthmanger" is-link />
    </van-cell-group>
    <van-cell-group class="menu-title" :title="currUser">
      <van-cell-group title="健康管理">
        <van-cell title="健康数据" to="/healthinfo" is-link />
        <van-cell title="健康预警" to="/healthwarn" is-link />
      </van-cell-group>
      <van-cell-group title="瘦身管理">
        <van-cell title="瘦身数据" to="/message" is-link />
        <van-cell title="瘦身计划" to="/message" is-link />
      </van-cell-group>
      <van-cell-group title="手表功能">
        <van-cell title="通讯录" to="/contact" is-link />
        <van-cell title="定时提醒" to="/alarm" is-link />
        <van-cell title="定位" to="/location" is-link />
      </van-cell-group>
    </van-cell-group>
  </div>
</template>

<script>
import { CellGroup, Cell } from "vant";
import { mapState } from "vuex";
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },

  data() {
    return {};
  },

  computed: {
    currUser() {
      return "当前保健用户" + this.$store.state.currUser;
    }
  }
};
</script>

<style lang="less" scoped>
</style>