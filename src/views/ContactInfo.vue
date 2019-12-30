<template>
  <div>
    <top-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :click-right="onClickTopRight"
    />
    <van-cell-group>
      <van-field
        v-model="item.name"
        label="姓名"
        placeholder="请输入姓名"
        left-icon="contact"
        :readonly="!editState"
      />
      <van-field
        v-model="item.phone"
        type="number"
        label="电话"
        placeholder="请输入电话号码"
        left-icon="phone"
        :readonly="!editState"
      />
      <van-field
        v-model="item.phone2"
        type="number"
        label="电话2"
        left-icon="phone"
        :readonly="!editState"
      />
      <van-field
        v-model="item.phone3"
        type="number"
        label="电话3"
        left-icon="phone"
        :readonly="!editState"
      />
      <van-field v-model="item.notes" label="备注" rows="3" :readonly="!editState" />
      <form-error :response="formResponse" />
    </van-cell-group>
  </div>
</template>

<script>
import TopBar from "@/views/TopBar";
import { CellGroup, Field, Dialog } from "vant";
import FormError from "@/views/FormError";

export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [FormError.name]: FormError
  },

  mounted() {
    this.editState = this.$store.state.urlData.id == 0;
    this.updateState();
  },

  data() {
    return {
      id: this.$store.state.urlData.id,
      item: this.$store.state.urlData.item,
      editState: false,
      title: "",
      leftText: "",
      rightText: "",
      formResponse:{}
    };
  },
  methods: {
    onClickTopRight() {
      if (this.editState) {
        this.saveRecord();
      } else {
        this.editState = true;
        this.updateState();
      }
    },

    updateState() {
      if (this.editState) {
        this.title = this.$store.state.urlData.id == 0 ? "新增联系人" : "编辑联系人";
        this.leftText = "取消";
        this.rightText = "保存";
      } else {
        this.title = "联系人";
        this.leftText = "返回";
        this.rightText = "修改";
      }
    },

    saveRecord() {
      this.getCsrfToken()
        .then(
          function(token) {
            this.httpSave(token);
          }.bind(this)
        )
        .catch(() => {});
    },

    httpSave(token) {
      let url = "maillist/editmaillist/";
      let id = this.id;
      if (this.id == 0) {
        id = this.$store.state.currUser;
        url = "maillist/addmaillist/";
      }
      this.$axios
        .post(
          url,
          {
            id: id,
            name: this.item.name,
            phone: this.item.phone,
            phone2: this.item.phone2,
            phone3: this.item.phone3,
            notes: this.item.notes
          },
          {
            headers: { "X-CSRFToken": token }
          }
        )
        .then(
          function(response) {
            let retcode = response.retcode;
            if (retcode == 0) {
              //成功
              this.$toast(response.retmsg);
              this.$store.commit("setContactRefresh", true);
              this.$router.go(-1);
            } else if (retcode == 1) {
              //错误
              this.$toast(response.retmsg);
            } else if (retcode == 2) {
              //提交后端Form输入校验错误
              this.formResponse = response;
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log("请求失败" + error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.function-bar {
  top: 80%;
  position: absolute;
}
</style>
