<template>
  <div>
    <top-bar title="联系人" :click-right="onClickTopRight" />
    <van-search
      class="search-input"
      placeholder="请输入搜索关键词"
      v-model="searchText"
      @search="onSearch"
    />
    <van-list
      class="contact-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadList"
    >
      <van-swipe-cell :on-close="onCellClose" v-for="item in list" :name="item.id" :key="item.id">
        <van-cell :title="item.name" clickable :id="item.id" @click="onClickList" />
        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-list>
    <van-tabbar class="function-bar" v-model="active">
      <van-tabbar-item icon="plus" @click="onNewRecord">新增</van-tabbar-item>
      <van-tabbar-item icon="upgrade" @click="onSyncRecords">同步通讯录</van-tabbar-item>
      <van-tabbar-item icon="replay" @click="onRefreshList">刷新</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import TopBar from "@/views/TopBar";
import {
  Search,
  List,
  SwipeCell,
  Button,
  Cell,
  Dialog,
  Tabbar,
  TabbarItem
} from "vant";
export default {
  components: {
    [TopBar.name]: TopBar,
    [Search.name]: Search,
    [List.name]: List,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      searchText: "",
      list: [],
      loading: false,
      finished: false,
      offset: 0,
      limit: 10,
      active: 0
    };
  },

  activated() {
    console.log(
      "contactlist activated refresh:" + this.$store.state.contactRefresh
    );
    //缓存页面激活
    if (this.$store.state.contactRefresh) {
      this.onRefreshList();
      this.$store.commit("setContactRefresh", false);
    }
  },

  methods: {
    onClickTopRight() {},

    onSearch() {
      console.log("onSearch");
      this.list = [];
      this.loading = false;
      this.finished = false;
      this.offset = 0;
    },

    onRefreshList() {
      console.log("onRefreshList");
      //this.searchText = "";
      this.onSearch();
    },

    onLoadList() {
      console.log("onLoadList");
      let curUser = this.$store.state.currUser;
      if (curUser == 0) return;

      this.$axios
        .post("maillist/maillistsearch/", {
          id: curUser,
          name: this.searchText,
          query_params: '{ "offset": {0}, "limit": {1} }'.format(
            this.offset,
            this.limit
          )
        })
        .then(
          function(response) {
            let retcode = response.retcode;
            if (retcode == 0) {
              //成功
              let results = response.data["results"];
              for (let i = 0; i < results.length; i++) {
                this.list.push(results[i]);
              }
              this.offset += results.length;
              this.loading = false; //清除加载状态

              if (results.length < this.limit) {
                this.finished = true; //数据全部加载完成
              }
            } else if (retcode == 1)
              //错误
              this.$toast(response.retmsg);
          }.bind(this)
        )
        .catch(function(error) {
          this.loading = false;
          console.log("请求失败" + error);
        });
    },

    getItem(id) {
      for (let i = 0; i < this.list.length; ++i) {
        let item = this.list[i];
        if (item.id == id) return item;
      }
      return;
    },

    onClickList(e) {
      let id = e.currentTarget.id;
      let item = this.getItem(id);
      if (item) {
        this.$store.commit("setUrlData", { id: id, item: item });
        this.$router.push({
          path: "/contactInfo"
        });
      }
    },

    onNewRecord() {
      console.log("onNewRecord");
      this.$store.commit("setUrlData", { id: 0, item: {} });
      this.$router.push({
        path: "/contactInfo"
      });
    },

    onCellClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          console.log(instance.name);
          Dialog.confirm({
            message: "确定删除吗？"
          })
            .then(() => {
              this.deleteRecord(instance.name);
            })
            .catch(() => {});
          instance.close();
          break;
      }
    },

    deleteRecord(id) {
      this.getCsrfToken()
        .then(
          function(token) {
            this.httpDelete(id, token);
          }.bind(this)
        )
        .catch(() => {});
    },

    httpDelete(id, token) {
      this.$axios
        .post(
          "maillist/delmaillist/",
          {
            id: id
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
              this.onRefreshList();
            } else if (retcode == 1)
              //错误
              this.$toast(response.retmsg);
          }.bind(this)
        )
        .catch(function(error) {
          console.log("请求失败" + error);
        });
    },

    onSyncRecords() {
      let id = this.$store.state.currUser;
      if (id == 0) return;

      this.getCsrfToken()
        .then(
          function(token) {
            this.httpSyncRecords(token);
          }.bind(this)
        )
        .catch(error => {
          console.log("获取csrf错误:" + error);
        });
    },

    httpSyncRecords(token) {
      console.log("httpSyncReords");
      let id = this.$store.state.currUser;
      if (id == 0) return;

      this.$axios
        .post(
          "maillist/synmaillist/",
          {
            id: id
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
