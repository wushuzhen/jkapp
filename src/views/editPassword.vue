<template>
  <div class="editpassword">
    <top-bar title="修改密码" />
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
      confirmpw: "",
      msg: ""
    };
  },
  methods: {
    submit() {
      if (this.newpw == this.confirmpw) {
        let that = this;
        this.getCsrfToken(this).then(function(token) {
          that.submitpd(token);
        });
      } else {
        this.$dialog.alert({
          message: "新密码前后不一致，请重新确认！"
        });
      }
    },
    submitpd(token) {
      this.$axios
        .post(
          "/changepassword/",
          {
            old_psd: this.oldpw,
            new_psd: this.newpw,
            re_psd: this.confirmpw
          },
          { headers: { "X-CSRFToken": token } }
        )
        .then(function(res) {
          if (res.retcode === 0) {
            this.$dialog.alert({
              message: res.retmsg
            });
          } else if (res.retcode === 1) {
            this.$dialog.alert({
              message: res.retmsg
            });
            this.$router.push({ path:res.redirect })
          } else {
            this.$dialog.alert({
              message: res.retmsg
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped></style>
