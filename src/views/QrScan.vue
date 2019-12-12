<template>
  <div class="qrwin">
    <div class="qrwin-close">
      <p @click="back">关闭</p>
    </div>
    <div class="qrwin-scan">
      <div class="qrwin-scan-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  mounted() {
    this.bottombar = this.$store.state.bottombar;
    this.$store.commit("setBottombar", false);
    this.scan();
  },

  props: {
    backUrl: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      bottombar: true
    };
  },

  methods: {
    displayContents: function(err, text) {
      if (err) {
        this.$toast("扫描错误：" + JSON.stringify(err));
      } else {
        console.log("qrcode:" + text);
        this.$store.commit("setQrcode", text);
        this.back();
      }
    },

    scan: function() {
      if (!this.$store.state.deviceready) {
        this.$toast("设备没有准备好");
        return;
      }

      if (typeof this.$QRScanner == "undefined") {
        this.$toast("扫描没有准备好");
        return;
      }

      //开始扫描，需要将页面的背景设置成透明
      this.$QRScanner.show(
        function() {
          // Start a scan. Scanning will continue until something is detected or
          // `QRScanner.cancelScan()` is called.
          this.$QRScanner.scan(this.displayContents.bind(this));
        }.bind(this)
      );
    },

    back: function() {
      if (typeof this.$QRScanner != "undefined") {
        this.$QRScanner.cancelScan();
      }
      this.$store.commit("setBottombar", this.bottombar);
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.qrwin {
  background: transparent;
}

.qrwin-close {
  left: 10%;
  position: absolute;
  color: white;
}

.qrwin-scan {
  width: 60%;
  height: 60vw;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto; /*自动居中*/
  border: 1px solid blue;
}

.qrwin-scan-line {
  left: 1%;
  width: 98%;
  height: 1px;
  position: relative;
  animation: myfirst 2500ms linear infinite normal;
  background: green;
}

@keyframes myfirst {
  0% {
    top: 0%;
  }
  25% {
    top: 25%;
  }
  50% {
    top: 50%;
  }
  75% {
    top: 75%;
  }
  100% {
    top: 100%;
  }
}
</style>