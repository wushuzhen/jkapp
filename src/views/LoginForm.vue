<template>
  <van-cell-group title="用户登录">
    <van-field v-model="mobilephone" required clearable label="手机号码" placeholder="请输入手机号码" />
    <van-field v-model="pwd" type="password" label="密码" placeholder="请输入密码" required />
    <div class="login-submit">
      <van-button type="primary" size="large" @click="onLogin">登录</van-button>
    </div>
  </van-cell-group>
</template>

<script>
import { CellGroup, Field, Button } from "vant";
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      mobilephone: "",
      pwd: ""
    };
  },

  methods: {
    onLogin: function(e) {
      if (this.mobilephone == "") {
        this.$toast("手机号码不能为空");
        return false;
      }
      if (this.pwd == "") {
        this.$toast("密码不能为空");
        return false;
      } else {
        this.doPost(e);
      }
    },
    doPost: function(e) {
      this.$axios
        .post(
          "/login/",
          { mobilephone: this.mobilephone, pwd: this.pwd }
        )
        .then(
          function(response) {
            //0:成功 1:错误 2:Form校验错误，form_error校验信息
            let retcode = response.retcode;
            if (retcode == 0) {
              //成功
              let redirect = response.data.redirect;
              if (redirect != undefined) {
                //如果跳转则跳转
                this.$router.push({ path: redirect });
              }
            } else if (retcode == 1) {
              this.$toast(response.retmsg);
            } else if (retcode == 2) {
              let form_error = JSON.parse(response.data.form_error);
              for (let key in form_error) {
                console.log(key + ":" + form_error[key][0].message);
              }
              this.$toast("输入错误");
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log("请求失败" + error);
          this.$toast("登录服务器失败");
        });
      e.preventDefault();
    }
  }
};
</script>