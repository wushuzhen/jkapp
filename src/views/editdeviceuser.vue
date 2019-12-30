<template>
  <div class="editdeviceuser">
    <top-bar title="修改保健用户资料" />
    <van-cell-group>
      <van-field v-model="item.userName" label="使用者名称 : " />
      <van-field v-model="item.mobilephone" label="关联手机号 : " />
      <van-button plain type="primary" size="small" @click="submit"
        >提交</van-button
      >
      <form-error :response="formResponse" />
    </van-cell-group>
  </div>
</template>
<script>
import { CellGroup, Cell, Field, Button } from "vant";
import TopBar from "@/views/TopBar";
import FormError from "@/views/FormError";
export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button,
    [FormError.name]: FormError
  },
  data() {
    return {
      id: this.$route.query.id,
      item: JSON.parse(this.$route.query.item),
      formResponse:{}
    };
  },
  methods: {
    submit() {
      this.getCsrfToken().then(
        function(token) {
          this.$axios
            .post(
              "/device/editdeviceUse/",
              {
                id: this.id,
                userName: this.item.userName,
                mobilephone: this.item.mobilephone,
                dev: this.item.dev
              },
              {
                headers: { "X-CSRFToken": token }
              }
            )
            .then(
              function(res) {
                let retcode = res.retcode;
                if (retcode == 0) {
                  //成功
                  this.$dialog.alert({
                    message: res.retmsg
                  });
                  this.$router.go(-1);
                } else if (retcode == 1) {
                  //错误
                  this.$dialog.alert({
                    message: res.retmsg
                  });
                } else if (retcode == 2) {
                  //提交后端Form输入校验错误
                  this.formResponse = res;
                }
              }.bind(this)
            );
        }.bind(this)
      );
    }
  }
};
</script>
