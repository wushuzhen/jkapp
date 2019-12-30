<template>
  <div class="editphone">
    <top-bar title="修改手机号" />
    <van-cell-group>
      <van-field v-model="phone" placeholder="请输入手机号码" />
      <van-field v-model="code" placeholder="请输入验证码" />
      <van-button
        plain
        type="primary"
        size="normal"
        @click="getcodeor"
        class="code"
        >获取验证码</van-button
      >
      <van-button plain type="primary" size="small" @click="submit"
        >提交</van-button
      >
    </van-cell-group>
  </div>
</template>
<script>
import { CellGroup, Cell, Field, Button } from "vant";
import TopBar from "@/views/TopBar";
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [TopBar.name]: TopBar,
    [Button.name]: Button
  },
  data() {
    return {
      phone: "",
      code: ""
    };
  },
  methods: {
    getcodeor() {
      this.getCsrfToken().then(function(token) {
        this.getcode(token);
      }.bind(this));
    },
    getcode(token) {
      let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
      if (reg.test(this.phone)) {
        this.$axios
          .post(
            "/crm/sendSmsCode/",
            {
              mobile: this.phone
            },
            { headers: { "X-CSRFToken": token } }
          )
          .then(res => {
            if (res.retcode == 1) {
              this.$dialog.alert({
                message: res.retmsg
              });
            } else {
              this.$dialog.alert({
                message: res.retmsg
              });
            }
          });
      } else {
        this.$dialog.alert({
          message: "请输入正确的手机号码！"
        });
      }
    },
    submit() {
      this.getCsrfToken().then(function(token) {
        this.$axios
          .post(
            "/changephone/",
            {
              mobilephone: this.phone,
              validatecode: this.code
            },
            {
              headers: { "X-CSRFToken": token }
            }
          )
          .then(function(res) {
            if (res.retcode === 0) {
              this.$dialog.alert({
                message: res.retmsg
              });
            } else {
              this.$dialog.alert({
                message: "出现了一个错误！"
              });
            }
          });
      }.bind(this));
    }
  }
};
</script>
<style lang="less" scoped>
.editphone {
  position: relative;
  .code {
    position: absolute;
    right: 0px;
    top: 44px;
  }
}
</style>
