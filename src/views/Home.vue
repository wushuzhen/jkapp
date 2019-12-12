<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";
import Vue from "vue";
export default {
  components: {
    [HelloWorld.name]: HelloWorld
  },

  mounted() {
    this.$store.commit("setBottombar", true);
    this.httpSelect(null);
  },

  methods: {
    /* 
    不需要提交修改信息，可以使用get，不用检查csrftoken安全验证
    使用post提交修改的，用参照下面的代码getCsrfToken先获取csrftoken，然后在then回调中post提交，并设置X-CSRFToken
    let that = this;
    this.getCsrfToken(this).then(function(token) {
      that.httpSelect(token);
    });
    然后在post中设置headers token
      this.$axios
        .post(
          "/select/",
          {},
          {
            headers: { "X-CSRFToken": token }
          }
        )
    */

    //请求保健用户列表，并设置
    httpSelect: function(token) {
      this.$axios
        .get("/select/", {})
        .then(
          function(response) {
            //0:成功 1:错误 2:Form校验错误，form_error校验信息
            let retcode = response.retcode;
            if (retcode == 0) {
              //成功
              let redirect = response.redirect;
              if (redirect != undefined) {
                //如果跳转则跳转
                this.$router.replace({ path: redirect });
              } else {
                this.number = response.data.number;
                this.list_userid = response.data.list_userid;
                let len = this.list_userid.length;
                this.$store.commit("setUserList", this.list_userid);
                if (len == 0) {
                  this.$store.commit("setCurrUser", { val: 0, save: true });
                  this.routeto("/home");
                } else if (len >= 1) {
                  let currUser = Number(localStorage.getItem("currUser"));
                  let found = false;
                  for (let i = 0; i < this.list_userid.length; ++i) {
                    if (currUser == this.list_userid[i].id) {
                      found = true;
                      break;
                    }
                  }
                  if (found) {
                    this.$store.commit("setCurrUser", {
                      val: currUser,
                      save: false
                    });
                  } else {
                    currUser = this.list_userid[0].id;
                    this.$store.commit("setCurrUser", {
                      val: currUser,
                      save: true
                    });
                  }
                  this.routeto("/home");
                }
              }
            } else if (retcode == 1) {
              this.$toast(response.retmsg);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$store.commit("setBottombar", true);
          }.bind(this)
        );
    }
  }
};
</script>

<style scoped lang="less">
</style>
