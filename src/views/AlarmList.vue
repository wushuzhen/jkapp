<template>
  <div>
    <top-bar title="事务提醒" :click-right="onClickTopRight" />
    <van-search
      class="search-input"
      placeholder="请输入搜索关键词"
      v-model="searchText"
      @search="onSearch"
    />
    <van-list
      class="alarm-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadList"
    >
      <van-swipe-cell :on-close="onCellClose" v-for="item in list" :name="item.id" :key="item.id">
        <van-cell :title="item.title" clickable :id="item.id" @click="onClickList" />
          <template slot="left">
            <van-button square type="primary" :text="item.status==1?'停用':'启用'" />
          </template>
          <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-list>
    <van-tabbar class="function-bar" v-model="active">
      <van-tabbar-item icon="plus" @click="onNewRecord">新增</van-tabbar-item>
      <van-tabbar-item icon="upgrade" @click="onSyncRecords">同步事务提醒</van-tabbar-item>
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
    //缓存页面激活
    if (this.$store.state.alarmRefresh) {
      this.onRefreshList();
      this.$store.commit("setAlarmRefresh", false);
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
        .post("warn/plane/planesearch/", {
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
          path: "/alarmInfo"
        });
      }
    },

    onNewRecord() {
      console.log("onNewRecord");
      this.$store.commit("setUrlData", { id: 0, item: {} });
      this.$router.push({
        path: "/alarmInfo"
      });
    },

    onCellClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
          this.startOrStopAlarm(instance.name);
          instance.close();
          break;
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
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

    startOrStopAlarm(id){
      let item = this.getItem(id);
      let url;
      if(item.status == 1){
        url ="warn/plane/stopping/";
      }else{
        url ="warn/plane/opening/";
      }
      this.getCsrfToken()
        .then(
          function(token) {
            this.httpStartOrStop(token, url, id);
          }.bind(this)
        )
        .catch(() => {});  
    },

    httpStartOrStop(token, url, id){
      this.$axios
        .post(
          url,
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
          "warn/plane/delplane/",
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
          "warn/plane/synplane/",
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
