<template>
  <div class="editpassword">
    <top-bar v-show="true" />
    <van-cell-group>
      <van-field v-model="oldpw" placeholder="请输入原密码" type="password" />
      <van-field v-model="newpw" placeholder="请输入新密码" type="password" />
      <van-field
        v-model="confirmpw"
        placeholder="请确认新密码"
        type="password"
      />
      <van-button plain type="primary" size="small" @click="submit"
        >提交</van-button
      >
    </van-cell-group>
  </div>
</template>
<script>
import TopBar from "@/views/TopBar";
import { CellGroup, Cell, Field, Button } from "vant";
export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      oldpw: "",
      newpw: "",
      confirmpw: ""
    };
  },
  methods: {
    submit() {
      var obj = {};
      obj.oldpw = this.oldpw;
      obj.newpw = this.newpw;
      obj.confirmpw = this.confirmpw;
      console.log(11111111);
      console.log(obj);
    }
  }
};
</script>
<style lang="less" scoped></style>
