<template>
  <div class="home">
    <div class="dbkb"></div>
    <div class="top">
      <p class="hy">
        <router-link to="/chouse">{{ this.$store.state.currUser }}</router-link
        >,欢迎您的到来
      </p>
      <router-link to="/news" class="news"></router-link>
      <router-link to="/setUp" class="setUp"></router-link>
      <div class="deviceuse">
        <div class="user active">
          <img src="../assets/png/矢量智能对象拷贝16.png" />
          bingo
        </div>
        <div class="user">
          <img src="../assets/png/手表.png" />
          ddas
        </div>
        <router-link to="/more" class="more">
          <img src="../assets/png/更多.png" />
        </router-link>
        <router-link to="/add" class="add">
          <img src="../assets/png/添加用户.png" />
        </router-link>
      </div>
      <div class="userinfo">
        <div class="target">
          <div class="picture">bingo</div>
          <router-link to="/position" class="position">定位</router-link>
          <div class="aim">减脂</div>
        </div>
        <div class="info">
          <div class="height">
            身高(CM) <br />
            176
          </div>
          <div class="weight">
            体重(KG)<br />
            60
          </div>
          <div class="fat">
            体脂(BMI)<br />
            27.1
          </div>
          <em class="eyeone"></em>
          <em class="eyetwo"></em>
          <em class="lineone"></em>
          <em class="linetwo"></em>
        </div>
      </div>
    </div>
    <div class="healthinfo">
      <h2>
        健康数据
      </h2>
      <div class="param">
        <div class="hr">
          <h4>心率</h4>
          <p>12月15日</p>
          <img src="../assets/png/心率.png" />
          <h6><em>70</em> 次/分</h6>
        </div>
        <div class="bo">
          <h4>血氧</h4>
          <p>12月15日</p>
          <img src="../assets/png/血氧.png" />
          <h6><em>70</em> %</h6>
        </div>
        <div class="bp">
          <h4>血压</h4>
          <p>12月15日</p>
          <img src="../assets/png/血压.png" />
          <h6><em>115</em> /102 ...</h6>
        </div>
        <div class="bs">
          <h4>血糖</h4>
          <p>12月15日</p>
          <img src="../assets/png/血糖.png" />
          <h6><em>3.5</em> MMOI/L</h6>
        </div>
        <div class="ua">
          <h4>尿酸</h4>
          <p>12月15日</p>
          <img src="../assets/png/尿酸.png" />
          <h6><em>70</em> MMOI/L</h6>
        </div>
        <div class="Cholesterol">
          <h4>胆固醇</h4>
          <p>12月15日</p>
          <img src="../assets/png/胆固醇.png" />
          <h6><em>3.5</em> MMOI/L</h6>
        </div>
      </div>
      <div class="ecg">
        <h2>心电图</h2>
      </div>
    </div>
    <p class="close">收起 <img src="../assets/png/向上箭头.png" /></p>
    <div class="eat">
      <div class="left">
        <h2>饮食干预</h2>
        <p>
          您还可以吃 <br />
          <em>1980</em>千卡
        </p>
        <div class="goal">
          营养目标
        </div>
      </div>
      <div class="right">
        <div>
          <img src="../assets/png/碳水.png">
          <span>碳水</span>
        </div>
        <div>
          <img src="../assets/png/脂肪.png">
          <span>脂肪</span>
        </div>
        <div>
          <img src="../assets/png/蛋白质.png">
          <span>蛋白质</span>
        </div>
      </div>
      <router-link to="/addplan"></router-link>
    </div>
    <div class="sport">
      <h2>运动数据</h2>
      <div class="title">
        <em>运动建议</em><em>今日运动</em>
      </div>
      <div class="work bgc">
        <img src="../assets/png/步行1.png">
        <span class="need"><em>10100</em>步</span>
        <span class="done"><em>10100</em>步</span>
      </div>
      <div class="run">
        <img src="../assets/png/跑步2.png">
        <span class="need"><em>3.0</em>公里</span>
        <span class="done"><em>3.0</em>公里</span>
      </div>
      <div class="swim bgc">
        <img src="../assets/png/游泳3.png">
        <span class="need"><em>800</em>米</span>
        <span class="done"><em>800</em>米</span>
      </div>
      <div class="ride">
        <img src="../assets/png/自行车4.png">
        <span class="need"><em>5.0</em>公里</span>
        <span class="done"><em>5.0</em>公里</span>
      </div>
    </div>
    <div class="addcolor"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";
import Vue from "vue";
export default {
  components: {
    [HelloWorld.name]: HelloWorld
  },

  mounted() {
    this.$store.commit("setBottombar", true);
    this.httpSelect(null);
  },

  methods: {
    /* 
    不需要提交修改信息，可以使用get，不用检查csrftoken安全验证
    使用post提交修改的，用参照下面的代码getCsrfToken先获取csrftoken，然后在then回调中post提交，并设置X-CSRFToken
    this.getCsrfToken(this).then(function(token) {
      this.httpSelect(token);
    }.bind(this));
    然后在post中设置headers token
      this.$axios
        .post(
          "/select/",
          {},
          {
            headers: { "X-CSRFToken": token }
          }
        )
    */

    //请求保健用户列表，并设置
    httpSelect: function(token) {
      this.$axios
        .get("/select/", {})
        .then(
          function(response) {
            //0:成功 1:错误 2:Form校验错误，form_error校验信息
            let retcode = response.retcode;
            if (retcode == 0) {
              //成功
              let redirect = response.redirect;
              if (redirect != undefined) {
                //如果跳转则跳转
                this.$router.replace({ path: redirect });
              } else {
                this.number = response.data.number;
                this.list_userid = response.data.list_userid;
                let len = this.list_userid.length;
                this.$store.commit("setUserList", this.list_userid);
                if (len == 0) {
                  this.$store.commit("setCurrUser", { val: 0, save: true });
                  this.routeto("/home");
                } else if (len >= 1) {
                  let currUser = Number(localStorage.getItem("currUser"));
                  let found = false;
                  for (let i = 0; i < this.list_userid.length; ++i) {
                    if (currUser == this.list_userid[i].id) {
                      found = true;
                      break;
                    }
                  }
                  if (found) {
                    this.$store.commit("setCurrUser", {
                      val: currUser,
                      save: false
                    });
                  } else {
                    currUser = this.list_userid[0].id;
                    this.$store.commit("setCurrUser", {
                      val: currUser,
                      save: true
                    });
                  }
                  this.routeto("/home");
                }
              }
            } else if (retcode == 1) {
              this.$toast(response.retmsg);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$store.commit("setBottombar", true);
          }.bind(this)
        );
    }
  }
};
</script>

<style scoped lang="less">
.home {
  background-color: #f0eff5;
  a {
    color: #000;
  }
  .dbkb {
    margin: 0px;
    width: 100%;
    height: 22px;
  }
  .top {
    width: 100%;
    height: 136px;
    background-image: url(../assets/png/背景图片.png);
    background-size: 100%;
    position: relative;
    .hy {
      position: absolute;
      margin: 0px;
      top: 14px;
      left: 15px;
      color: #fff;
      text-align: left;
      font-size: 18px;
      a {
        color: #fff;
      }
    }
    .news {
      width: 22px;
      height: 17px;
      position: absolute;
      top: 18px;
      right: 50px;
      background-image: url(../assets/png/信息.png);
      background-size: 100% 100%;
    }
    .setUp {
      width: 22px;
      height: 20px;
      position: absolute;
      top: 16px;
      right: 15px;
      background-image: url(../assets/png/设置.png);
      background-size: 100% 100%;
    }
    .deviceuse {
      width: 200px;
      height: 29px;
      overflow: hidden;
      position: absolute;
      top: 53px;
      left: 51px;
      div {
        float: left;
      }
      a {
        float: left;
      }
      .user {
        position: relative;
        width: 47px;
        height: 29px;
        text-align: left;
        line-height: 29px;
        font-size: 14px;
        font-weight: 400;
        padding-left: 20px;
        border-radius: 5px;
        color: #fff;
        background: rgba(51, 51, 51, 0.3);
        img {
          position: absolute;
          width: 10px;
          height: 15px;
          top: 5px;
          left: 6px;
        }
      }
      .active {
        color: #4ac3ed;
        background-color: #fff;
        box-shadow: 0px 0px 10px 1px rgba(102, 102, 102, 0.6);
      }
      .more {
        width: 33px;
        height: 29px;
        text-align: center;
        background: rgba(51, 51, 51, 0.3);
        border-radius: 5px;
        img {
          margin-top: 4px;
          width: 20px;
          height: 20px;
        }
      }
      .add {
        width: 33px;
        height: 29px;
        text-align: center;
        background: rgba(51, 51, 51, 0.3);
        border-radius: 5px;
        img {
          margin-top: 5px;
          width: 18px;
          height: 18px;
        }
      }
    }
    .userinfo {
      position: absolute;
      top: 80px;
      left: 15px;
      width: 345px;
      height: 115px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0px 0px 10px 1px rgba(102, 102, 102, 0.6);
      .target {
        height: 55px;
        .picture {
          float: left;
          height: 38px;
          margin: 13px 0px 0px 18px;
          background-image: url(../assets/png/图像.png);
          background-repeat: no-repeat;
          background-size: 38px 38px;
          padding-left: 50px;
          line-height: 38px;
          font-size: 18px;
          font-weight: 400;
        }
        .position {
          float: left;
          height: 17px;
          margin: 24px 0px 0px 26px;
          background-image: url(../assets/png/定位.png);
          background-repeat: no-repeat;
          background-size: 15px 16px;
          line-height: 17px;
          padding-left: 20px;
          font-size: 14px;
        }
        .aim {
          float: right;
          margin: 20px 10px 0px 0px;
          width: 36px;
          height: 20px;
          border: 1px solid rgba(102, 102, 102, 1);
          border-radius: 4px;
        }
      }
      .info {
        position: relative;
        height: 60px;
        div {
          float: left;
          padding-top: 5px;
          height: 55px;
          width: 115px;
          font-size: 14px;
          line-height: 25px;
        }
        .eyeone,
        .eyetwo {
          position: absolute;
          width: 25px;
          height: 25px;
          top: 7px;
          background-image: url(../assets/png/眼睛.png);
          background-size: 15px 8px;
          background-repeat: no-repeat;
          background-position: center;
        }
        .eyeone {
          left: 87px;
        }
        .eyetwo {
          left: 202px;
        }
        .lineone,
        .linetwo {
          position: absolute;
          top: 28px;
          width: 1px;
          height: 18px;
          background-image: url(../assets/png/线段.png);
        }
        .lineone {
          left: 118px;
        }
        .linetwo {
          left: 233px;
        }
      }
    }
  }
  .healthinfo {
    margin-top: 68px;
    width: 100%;
    height: 439px;
    overflow: hidden;
    h2 {
      height: 37px;
      margin: 0px 0px 0px 15px;
      text-align: left;
    }
    .param {
      margin-left: 15px;
      height: 220px;
      div {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        width: 108px;
        height: 105px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        h4 {
          margin: 8px 0px 0px 10px;
          text-align: left;
        }
        p {
          margin: 8px 0px 0px 10px;
          text-align: left;
        }
      }
      .hr,
      .bo,
      .bp,
      .bs,
      .ua,
      .Cholesterol {
        h6 {
          margin: 0px 0px 0px 10px;
          text-align: left;
          font-size: 14px;
          font-weight: normal;
          em {
            font-size: 18px;
            font-style: normal;
          }
        }
      }
      .hr {
        img {
          margin-left: 65px;
          width: 26px;
          height: 21px;
        }
      }
      .bo {
        img {
          margin-left: 65px;
          width: 19px;
          height: 26px;
        }
        h6 {
          margin-top: -5px;
        }
      }
      .bp {
        img {
          margin-left: 65px;
          width: 18px;
          height: 31px;
        }
        h6 {
          margin-top: -10px;
        }
      }
      .bs {
        img {
          margin-left: 65px;
          width: 27px;
          height: 30px;
        }
        h6 {
          margin-top: -6px;
        }
      }
      .ua {
        img {
          margin-left: 65px;
          width: 27px;
          height: 26px;
        }
        h6 {
          margin-top: -5px;
        }
      }
      .Cholesterol {
        img {
          margin-left: 65px;
          width: 20px;
          height: 26px;
        }
        h6 {
          margin-top: -5px;
        }
      }
    }
    .ecg {
      width: 345px;
      margin: 10px 0px 0px 15px;
      height: 170px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
    }
  }
  .close {
    position: relative;
    margin: 0px;
    height: 36px;
    line-height: 36px;
    img {
      position: absolute;
      top: 15px;
      left: 210px;
      width: 10px;
      height: 5px;
    }
  }
  .eat {
    position: relative;
    width: 345px;
    margin: 0 auto;
    height: 132px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    .left {
      float: left;
      width: 100px;
      height: 100%;
      h2 {
        margin: 13px 0px 0px 10px;
      }
      p {
        margin: 10px 0px 0px 13px;
        font-size: 14px;
        line-height: 24px;
        em {
          font-style: normal;
          font-size: 18px;
        }
      }
      .goal {
        margin: 2px 0px 0px 20px;
        width: 58px;
        height: 20px;
        border: 1px solid rgba(213, 211, 211, 1);
        border-radius: 4px;
        font-size: 12px;
        line-height: 20px;
      }
    }
    .right{
      margin-left: 150px;
      width: 150px;
      height: 100%;
      div{
        float: left;
        width: 50px;
        height: 100%;
        text-align: center;
        img{
          display: block;
          margin-top: 20px;
          margin-left: 20px;
          height: 75px;
        }
        span{
          display: block;
          margin-top: 10px;
          font-size: 14px;
          font-weight: 300;
        }
      }
    }
    a{    
      position: absolute;
      top:20px;
      right: 0px;
      width: 33px;
      height: 25px;
      background-image: url(../assets/png/添加饮食.png);
      background-size: 100% 100%;
    }
  }
  .sport{
    overflow: hidden;
    margin-top: 15px;
    margin-left: 15px;
    width: 345px;
    height: 213px;
    background-color: #fff;
    border-radius: 5px;
    h2{
      text-align: left;
      margin: 15px 0px 0px 11px;
    }
    div{
      height: 34px;
      img{
        float: left;
        width: 25px;
        height: 25px;
        margin-top: 4px;
        margin-left: 13px;
      }
      .need{
        text-align: left;
        width: 100px;
        margin-left: 50px;
        float: left;
        line-height: 34px;
        em{
          margin-right: 5px;
          font-style: normal;
          font-size: 18px;
          line-height: 20px;
        }
      }
      .done{
        text-align: left;
        width: 100px;
        margin-left: 45px;
        float: left;
        line-height: 34px;
        em{
          margin-right: 5px;
          font-style: normal;
          font-size: 18px;
          line-height: 20px;
        }
      }
    }
    .bgc{
      background-color: #F2F2F2;
    }
    .title{
      height: 34px;
      line-height: 34px;
      em{
        float: left;
        margin-left: 88px;
        font-style: normal;
        font-size: 14px;
      }
    }
  }
  .addcolor{
    width: 100%;
    height: 15px;
  }
}
</style>
