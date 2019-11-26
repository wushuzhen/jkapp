<template>
  <div class="admin">
    <van-cell-group class="menu-title" title="管理员功能">
      <van-cell title="管理员信息" to="/adminUserInfo" is-link/>
    </van-cell-group>
    <van-cell-group class="menu-title" :title="currUser">
      <van-cell-group title="健康管理">
        <van-cell title="健康数据" to="/home" is-link/>
        <van-cell title="健康预警" to="/home" is-link/>
      </van-cell-group>
      <van-cell-group title="瘦身管理">
        <van-cell title="瘦身数据" to="/message" is-link/>
        <van-cell title="瘦身计划" to="/message" is-link/>
      </van-cell-group>
    </van-cell-group>
  </div>
</template>

<script>
import { CellGroup, Cell } from 'vant'
import { mapState } from 'vuex'
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },

  data() {
    return {
    }
  },

  computed: {
    currUser(){ 
      return "当前保健用户 : " + this.$store.state.healthUser
    }
  }
}
</script>

<style lang="less" scoped>
.menu-title {
  
}
</style>