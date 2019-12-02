String.prototype.format = function() {
  var values = arguments;
  return this.replace(/\{(\d+)\}/g, function(match, index) {
    if (values.length > index) {
      return values[index];
    } else {
      return "";
    }
  });
};

function getCookie(name) {
  //获取cookie函数
  name = name + "=";
  let start = document.cookie.indexOf(name),
    value = null;
  if (start > -1) {
    let end = document.cookie.indexOf(";", start);
    if (end === -1) {
      end = document.cookie.length;
    }
    value = document.cookie.substring(start + name.length, end);
  }
  return value;
}

function routeto(url) {
  if (this.$route.path != url) {
    this.$route.push({ path: url });
  }
}

function getCsrfToken(that) {
  let p = new Promise(function(resolve, reject) {
    that.$axios
      .get("/mytoken/")
      .then(function(response) {
        let retcode = response.retcode;
        if (retcode == 0) {
          let token = response.data.token;
          localStorage.setItem("csrftoken", token);
          resolve(token);
        }
      })
      .catch(function(error) {
        error = "请求CsrfToken失败:" + error;
        console.log(error);
        reject(error);
      });
  });
  return p;
}

const utils = {
  install: function(Vue) {
    Vue.prototype.getCookie = getCookie;
    Vue.prototype.routeto = routeto;
    Vue.prototype.getCsrfToken = getCsrfToken;
  }
};

export default utils;
