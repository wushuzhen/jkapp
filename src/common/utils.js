import Vue from "vue";

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

//from vuex
function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

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

function getCsrfToken() {
  let p = new Promise(function(resolve, reject) {
    Vue.prototype.$axios
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
        console.log("请求CsrfToken失败:" + error);
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
    Vue.prototype.deepCopy = deepCopy;
  }
};

export default utils;
