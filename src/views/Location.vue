<template>
  <div class="location">
    <top-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :click-right="onClickTopRight"
    />
    <div id="amap"></div>
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
  data() {
    return {
      title: "手表定位",
      leftText: "返回",
      rightText: "更多"
    };
  },
  mounted() {
    this.initmap();
  },
  methods: {
    onClickTopRight() {},
    initmap() {
      var map = new AMap.Map("amap", {
        zoom: 17, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      console.log(11111);
      this.$store.state.urlData.map = map;
      console.log(2222222);
      this.$axios
        .get("/myposition/" + localStorage.getItem("currUser") + "/", {})
        .then(function(res) {
          let marker = new AMap.Marker({
            position: new AMap.LngLat(res.data.lng, res.data.lat),
            title: "shoubiao1"
          });
          map.add(marker)
          map.setCenter([res.data.lng, res.data.lat])
        });
    }
  }
};
</script>
<style lang="less" scoped>
#amap {
  width: 100%;
  height: 700px;
}
</style>
