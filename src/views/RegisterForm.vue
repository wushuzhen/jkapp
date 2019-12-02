<template>
  <van-cell-group>
    <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名" />
    <van-field v-model="mobilephone" required clearable label="手机号码" placeholder="请输入手机号码" />
    <van-field v-model="pwd" type="password" label="密码" placeholder="请输入密码" required />
    <div class="register-submit">
      <van-button type="primary" size="large" @click="onRegister">注册</van-button>
    </div>
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      mobilephone: "",
      pwd: ""
    };
  },

  methods: {
    onRegister: function(e, mobilephone, pwd) {
       if (this.username == "") {
        this.$toast("用户名不能为空");
        return false;
      }
      if (this.mobilephone == "") {
        this.$toast("手机号码不能为空");
        return false;
      }
      if (this.pwd == "") {
        this.$toast("密码不能为空");
        return false;
      } else {
        // this.$toast('token='+token);
        var that = this; // 放置指针，便于then操作的获取
        this.$axios
          .post("/register/", { mobilephone: this.mobilephone, pwd: this.pwd })
          .then(
            function(response) {
              //0:成功 1:错误 2:Form校验错误，form_error校验信息
              console.log(response);
              if (response.retcode == 0) {
                //成功
                let redirect = response.data.redirect;
                if (redirect != undefined) {
                  //如果跳转则跳转
                  this.$router.push({ path: redirect });
                }
              } else if (response.retcode == 1) {
                this.$toast(response.retmsg);
              } else if (response.retcode == 2) {
                this.$toast("输入错误");
              }
            }.bind(this)
          )
          .catch(function(error) {
            console.log("请求失败" + error);
          });
        e.preventDefault();
      }
    }
  }
};
</script>