<template>
  <div class="message">
    <h1>Message</h1>
    <van-button type="primary" size="large" @click="recvData">上传数据</van-button>
    <van-button type="primary" size="large" @click="resetDevice">断开连接</van-button>
    <p>deviceListStr</p>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  components: {
    [Button.name]: Button
  },

  data() {
    return {
      deviceList: null,
      deviceListStr: ""
    };
  },

  methods: {
    recvData: function(e) {
      this.$bluetooth.addEventListener(
        "onScanComplete",
        this.onScanComplete.bind(this)
      );
      this.$bluetooth.addEventListener("onConnect", this.onConnect.bind(this));
      this.$bluetooth.addEventListener(
        "onDisconnect",
        this.onDisconnect.bind(this)
      );
      this.$bluetooth.scan();
    },

    resetDevice: function() {
      this.$bluetooth
        .reset()
        .then(function() {
          console.log("bluetooth reset success");
        })
        .catch(function() {
          console.log("bluetooth reset failure");
        });
    },

    onScanComplete: function(deviceList) {
      this.deviceList = deviceList;
      this.deviceListStr = JSON.stringify(deviceList);
      console.log("onScanComplete:" + this.deviceListStr);
      if (this.deviceList.length == 1) {
        let device = this.deviceList[0];
        this.$bluetooth.connect(device);
      }
    },

    onConnect: function(device) {
      console.log("onConnect:" + device.id);
    },

    onDisconnect: function(device) {
      console.log("onDisconnect:" + device.id);
    }
  }
};
</script>
