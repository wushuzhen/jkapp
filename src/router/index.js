import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: () => import("../views/Error.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/register",
    component: () => import("../views/RegisterForm.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/registerSuccess",
    component: () => import("../views/RegisterSuccess.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/login",
    component: () => import("../views/LoginForm.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/select",
    component: () => import("../views/SelectUserForm.vue")
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/message",
    component: () => import("../views/Message.vue")
  },
  {
    path: "/admin",
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/adminUserInfo",
    component: () => import("../views/AdminUserInfo.vue")
  },
  {
    path: "/healthmanger",
    component: () => import("../views/HealthManager.vue")
  },
  {
    path: "/editUserInfo",
    component: () => import("../views/EditUserInfo.vue")
  },
  {
    path: "/editPassword",
    component: () => import("../views/EditPassword.vue")
  },
  {
    path: "/editPhone",
    component: () => import("../views/EditPhone.vue")
  },
  {
    path: "/qrscan",
    component: () => import("../views/QrScan.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/editdeviceuser",
    component: () => import("../views/Editdeviceuser.vue")
  },
  {
    path: "/binddevice",
    component: () => import("../views/Binddevice.vue")
  },
  {
    path: "/devicetransfer",
    component: () => import("../views/Devicetransfer.vue")
  },
  {
    path: "/datatransfer",
    component: () => import("../views/Datatransfer.vue")
  },
  {
    path: "/healthinfo",
    component: () => import("../views/Healthinfo.vue")
  },
  {
    path: "/heartRate",
    component: () => import("../views/Heartrate.vue")
  },
  {
    path: "/bloodPressure",
    component: () => import("../views/HeartPressure.vue")
  },
  {
    path: "/bloodSugar",
    component: () => import("../views/BloodSugar.vue")
  },
  {
    path: "/healthwarn",
    component: () => import("../views/Healthwarn.vue")
  },
  {
    path: "/plane",
    component: () => import("../views/Plane.vue")
  },
  {
    path: "/contact",
    component: () => import("../views/ContactList.vue"),
    meta: { keepAlive: true }
  },
  {
    path: "/contactInfo",
    component: () => import("../views/ContactInfo.vue")
  },
  {
    path: "/alarm",
    component: () => import("../views/AlarmList.vue"),
    meta: { keepAlive: true }
  },
  {
    path: "/alarmInfo",
    component: () => import("../views/AlarmInfo.vue")
  },
  {
    path: "/location",
    component: () => import("../views/Location.vue")
  }   
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let requireAuth = true;
  if (to.meta.requireAuth != undefined) requireAuth = to.meta.requireAuth;

  if (to.meta.keepAlive == undefined) to.meta.keepAlive = false;

  console.log(
    "router.beforeEach to:{0} from:{1} requireAuth:{2} keepAlive:{3}".format(
      to.path,
      from.path,
      requireAuth,
      to.meta.keepAlive
    )
  );
  if (requireAuth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem("sessionid")) {
      //判断本地是否存在access_token
      next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/login") {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

export default router;
