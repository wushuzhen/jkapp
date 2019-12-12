module.exports = {
  publicPath: "",
  pluginOptions: {
    cordovaPath: "src-cordova"
  },
  devServer: {
    //port: 6013,
    //host: '127.0.0.1',
    port: 7020,
    https: false,
    proxy: {
      "/api": {
        //target: "http://192.168.31.150:6013",
        target: "http://192.168.31.150:7020",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    //public:"index.html"
  }
};
