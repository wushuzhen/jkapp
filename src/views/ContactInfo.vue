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
    </van-cell-group>
  </div>
</template>

<script>
import TopBar from "@/views/TopBar";
import { CellGroup, Field, Dialog } from "vant";
export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field
  },

  mounted() {
    this.editState = this.$route.query.id == 0;
    this.updateState();
  },

  data() {
    return {
      id: this.$route.query.id,
      item: JSON.parse(this.$route.query.item),
      active: 0,
      editState: false,
      title: "",
      leftText: "",
      rightText: ""
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
        this.title = this.$route.query.id == 0 ? "新增联系人" : "编辑联系人";
        this.leftText = "取消";
        this.rightText = "保存";
      } else {
        this.title = "联系人";
        this.leftText = "返回";
        this.rightText = "修改";
      }
    },

    saveRecord() {
      let that = this;
      this.getCsrfToken(this)
        .then(function(token) {
          that.httpSave(token);
        })
        .catch(() => {});
    },

    onDeleteRecord() {
      if (this.id == 0) {
        //新增记录，直接返回
        this.$router.replace({ path: "/contact", meta: { keepAlive: true } });
        return;
      }
      Dialog.confirm({
        message: "确认删除联系人" + this.item.name + "吗?"
      })
        .then(
          function() {
            let that = this;
            this.getCsrfToken(this)
              .then(function(token) {
                that.httpDelete(token);
              })
              .catch(() => {});
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
            } else if (retcode == 1)
              //错误
              this.$toast(response.retmsg);
          }.bind(this)
        )
        .catch(function(error) {
          console.log("请求失败" + error);
        });
    },

    httpDelete(token) {
      this.$axios
        .post(
          "maillist/delmaillist/",
          {
            id: this.id
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
            } else if (retcode == 1)
              //错误
              this.$toast(response.retmsg);
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
