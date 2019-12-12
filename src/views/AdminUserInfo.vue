<template>
  <div>
    <top-bar title ="管理员信息"/>
    <van-cell-group>
      <van-cell title="修改资料" to="/editUserInfo" is-link />
      <van-cell title="修改密码" to="/editPassword" is-link />
      <van-cell title="修改手机号" to="/editPhone" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { CellGroup, Cell } from "vant";
import TopBar from "@/views/TopBar";
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [TopBar.name]: TopBar
  }
};
</script>
